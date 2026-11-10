# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Floating Assistant Widgets Require Dialog Semantics and Keyboard Escape Handling
**Learning:** Floating conversational widgets that overlay page content create keyboard traps or dead ends for screen reader and keyboard-only users if they lack standard dialog accessibility semantics. They require `aria-expanded` and `aria-haspopup="dialog"` on the trigger, `role="dialog"`, `aria-modal="true"`, and `aria-label` on the popup panel, as well as an Escape key listener to dismiss the overlay.
**Action:** When creating or maintaining floating interactive widgets (chatbots, drawers, modals), always wire the trigger's `aria-expanded`/`aria-controls` to the container ID, assign `role="dialog"` with descriptive labeling, add focus-visible rings to interactive elements, and attach a global `Escape` key event listener while open.
