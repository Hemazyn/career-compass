#!/usr/bin/env node
/**
 * Send a web push notification to every stored subscription.
 *
 * ── One-time setup ─────────────────────────────────────────────────────────
 * 1. Generate VAPID keys (public + private):
 *      npx web-push generate-vapid-keys
 * 2. Put the PUBLIC key in your deploy env as NEXT_PUBLIC_VAPID_PUBLIC_KEY
 *    (the site embeds it when users subscribe). Keep the PRIVATE key secret.
 * 3. Export subscriptions from a browser where a user opted in:
 *      localStorage.getItem("career-compass-push-subscription")
 *    Collect the JSON objects into a file (one per line or an array).
 *
 * ── Usage ──────────────────────────────────────────────────────────────────
 *   VAPID_PUBLIC_KEY=<key> VAPID_PRIVATE_KEY=<key> \
 *     node scripts/send-push.mjs --title "New careers are live" \
 *       --body "Check the 10 newest ranked careers." --url "/careers"
 *
 * Env vars:
 *   VAPID_PUBLIC_KEY   required — the VAPID public key
 *   VAPID_PRIVATE_KEY  required — the VAPID private key
 *   VAPID_SUBJECT      optional — "mailto:you@example.com" contact
 *   PUSH_SUBSCRIPTIONS_FILE — path to subscriptions JSON (default push-subscriptions.json)
 */
import { readFileSync, existsSync } from "node:fs";
import webpush from "web-push";

const args = process.argv.slice(2);
const opts = {};
for (let i = 0; i < args.length; i += 2) {
  if (args[i].startsWith("--")) opts[args[i].slice(2)] = args[i + 1];
}

const VAPID_PUBLIC = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT ?? "mailto:hello@careercompass.ng";
const SUBSCRIPTIONS_FILE = process.env.PUSH_SUBSCRIPTIONS_FILE ?? "push-subscriptions.json";

if (!VAPID_PUBLIC || !VAPID_PRIVATE) {
  console.error("Missing VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY env vars.");
  console.error("Generate them with:  npx web-push generate-vapid-keys");
  process.exit(1);
}
if (!existsSync(SUBSCRIPTIONS_FILE)) {
  console.error(
    `No ${SUBSCRIPTIONS_FILE} found. Export subscriptions from the site's\n` +
      "localStorage ('career-compass-push-subscription') into this file first."
  );
  process.exit(1);
}

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE);

const raw = readFileSync(SUBSCRIPTIONS_FILE, "utf8").trim();
const parsed = JSON.parse(raw);
const subscriptions = Array.isArray(parsed) ? parsed : [parsed];

if (subscriptions.length === 0) {
  console.error("No subscriptions in file.");
  process.exit(1);
}

const payload = JSON.stringify({
  title: opts.title ?? "Career Compass",
  body: opts.body ?? "New careers and JAMB deadlines are live.",
  url: opts.url ?? "/",
});

let ok = 0;
let failed = 0;
for (const sub of subscriptions) {
  try {
    await webpush.sendNotification(sub, payload, { TTL: 86400 });
    ok++;
  } catch (err) {
    failed++;
    console.error("Failed for", sub.endpoint, "→", err.message);
    if (err.statusCode === 404 || err.statusCode === 410) {
      console.error("  (subscription is gone — remove it from the file)");
    }
  }
}
console.log(`Sent to ${ok} of ${subscriptions.length} subscriptions${failed ? ` (${failed} failed)` : ""}.`);
process.exit(failed ? 1 : 0);
