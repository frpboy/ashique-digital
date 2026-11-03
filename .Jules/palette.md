# Palette's Journal - Critical UX & Accessibility Learnings

## 2026-05-18 - Newsletter Footer Form Accessibility and Async Feedback
**Learning:** In brutalist/minimalist designs, icon-only submit buttons (e.g. `<ArrowRight />`) in footer newsletter forms are frequently left without `aria-label` or accessible names, causing screen readers to announce an ambiguous button. Furthermore, silent fetch failures without visible error messages or loading spinners leave users unsure if their input was registered.
**Action:** Always provide explicit `aria-label` on icon-only form actions, pair inputs with accessible names, reflect `aria-busy` along with a spinner (`Loader2`) when requests are in flight, and display inline `role="alert"` messages alongside toasts for immediate feedback.
