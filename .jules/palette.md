# Palette UX Journal

## 2026-11-07 - Form Input Association & Async Loading State Pattern
**Learning:** In marketing lead capture forms (like the contact page and audit request), inputs frequently lacked explicit `id` and `htmlFor` pairings, leaving screen reader users without label context and breaking standard touch-to-focus behavior. Additionally, async submission buttons often swapped text to "Sending..." without visual spinners (`Loader2`), `aria-busy` feedback, or live announcements for error states.
**Action:** When creating or polishing interactive forms:
1. Always pair `<label htmlFor="field-id">` with `<input id="field-id">` (or `<textarea id="field-id">`).
2. Mark mandatory fields with both visual indicators and `aria-required="true"`.
3. Provide immediate tactile loading feedback on submit buttons using `Loader2` from `lucide-react` with `animate-spin` and `disabled={loading}`.
4. Set `aria-busy="true"` on the parent `<form>` while submitting, and ensure errors use `role="alert"` and `aria-live="polite"`.
