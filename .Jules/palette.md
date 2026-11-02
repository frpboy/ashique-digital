# Palette's Journal

## 2025-05-15 - Icon-only Submit Buttons in Form Layouts
**Learning:** Icon-only submit buttons (e.g. newsletter subscribe with an arrow) often omit accessible names (`aria-label`) and visual loading indicators (`aria-busy`, spinning loader icon), leaving screen reader and keyboard users without feedback during async mutations.
**Action:** Always provide an explicit `aria-label`, `aria-busy`, visible focus ring (`focus-visible:ring-2`), and replace the static icon with a spinner during `status === "loading"` on async submit buttons.
