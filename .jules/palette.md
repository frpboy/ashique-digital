# Palette's Journal - Critical UX & Accessibility Learnings

## 2026-03-31 - Floating Conversational Widgets & Screen Reader Accessibility
**Learning:** Floating AI chat widgets often trigger via icon/animation buttons and render streamable message logs without accessible metadata. For screen readers, omitting `aria-expanded`, dynamic `aria-label` (Open vs Close), `role="log"`, and `aria-live="polite"` prevents assistive technology users from knowing the widget state or hearing streamed conversational responses. Additionally, icon-only action triggers inside custom chat bars require dynamic loading ARIA labels ("Sending message..." vs "Send message") and explicit `focus-visible` rings matching brand tokens.
**Action:** When working with modal or conversational floating triggers, always ensure:
1. Trigger button has `aria-haspopup="dialog"`, `aria-expanded={open}`, and dynamic `aria-label`.
2. Message container has `role="log"`, `aria-live="polite"`, and `aria-label`.
3. Input elements have explicit `aria-label` and `focus-visible` ring styling.
4. Action buttons have state-aware `aria-label` and `focus-visible` styles.
