# Palette's Journal - Critical UX & Accessibility Learnings

## 2026-03-15 - Floating Chat Widget Accessibility Pattern
**Learning:** Floating overlay dialogs (like AI assistant bots) that load asynchronously need explicit focus management upon opening (e.g. focusing the input after opening transition), `Escape` key listening to dismiss the dialog, `aria-expanded`/`aria-haspopup` on the launcher button, and `role="log"` with `aria-live="polite"` on message threads so streaming responses are announced to screen readers.
**Action:** Always pair floating modal overlays with auto-focus, keyboard Escape listeners, ARIA dialog roles, and accessible labels on icon-only action buttons.
