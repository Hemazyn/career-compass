"use client";

import { useServerInsertedHTML } from "next/navigation";

/**
 * Injects the anti-FOUC theme script into the server-rendered HTML stream
 * OUTSIDE the React component tree.
 *
 * Rendering a raw `<script>` inside a component triggers React 19's
 * "Encountered a script tag while rendering React component" warning, and
 * inline scripts rendered by React are never executed on the client.
 * `useServerInsertedHTML` emits the script as part of the SSR HTML — where the
 * browser runs it before hydration — without React ever rendering it on the
 * client, so the warning disappears and the theme still applies pre-paint.
 */
const THEME_SCRIPT = `(function () {
  document.documentElement.classList.remove('no-js');
  try {
    var stored = localStorage.getItem('cc-theme');
    var dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();`;

export function ThemeScript() {
  useServerInsertedHTML(() => (
    <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
  ));
  return null;
}
