'use client';

import { useEffect, useState } from 'react';
import { Bell, BellRing } from 'lucide-react';
import { cn } from '@/lib/utils';

const SUBSCRIPTION_KEY = 'career-compass-push-subscription';

type ToggleState = 'idle' | 'enabled' | 'denied' | 'unsupported';

function urlBase64ToUint8Array(base64: string): Uint8Array<ArrayBuffer> {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const base64Url = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64Url);
  const output = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) output[i] = rawData.charCodeAt(i);
  return output;
}

export function NotificationToggle() {
  const [state, setState] = useState<ToggleState>('idle');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!('Notification' in window) || !('PushManager' in window) || !('serviceWorker' in navigator)) {
        if (!cancelled) setState('unsupported');
        return;
      }
      if (Notification.permission === 'denied') {
        if (!cancelled) setState('denied');
        return;
      }
      try {
        const reg = await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.getSubscription();
        if (!cancelled) setState(sub ? 'enabled' : 'idle');
      } catch {
        if (!cancelled) setState('idle');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function enable() {
    setLoading(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setState(permission === 'denied' ? 'denied' : 'idle');
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      let subscription = await reg.pushManager.getSubscription();
      if (!subscription) {
        const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
        subscription = await reg.pushManager.subscribe(publicKey ? { userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(publicKey) } : { userVisibleOnly: true });
      }
      localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(subscription.toJSON()));
      setState('enabled');
    } catch {
      setState('idle');
    } finally {
      setLoading(false);
    }
  }

  async function disable() {
    setLoading(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const subscription = await reg.pushManager.getSubscription();
      if (subscription) await subscription.unsubscribe();
      localStorage.removeItem(SUBSCRIPTION_KEY);
    } finally {
      setState('idle');
      setLoading(false);
    }
  }

  if (state === 'unsupported') return null;

  if (state === 'denied') {
    return (
      <p className="text-brand-300/60 flex items-center gap-1.5 text-xs">
        <Bell className="h-3.5 w-3.5" /> Notifications are blocked — enable them in your browser settings to hear about new careers.
      </p>
    );
  }

  return (
    <button type="button" onClick={state === 'enabled' ? disable : enable} disabled={loading} className={cn('inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold ring-1 transition-all', state === 'enabled' ? 'bg-brand-600 ring-brand-600 text-white shadow-(--shadow-soft-brand)' : 'bg-white/8 text-white ring-white/10 hover:bg-white/12 hover:ring-white/20')}>
      {state === 'enabled' ? <BellRing className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
      {state === 'enabled' ? 'Notifications on — tap to stop' : 'Get notified about new careers'}
    </button>
  );
}
