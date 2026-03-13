import posthog from 'posthog-js'

export function register() {
  if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: "https://ingest.ashique.digital",
      ui_host: "https://us.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: false,
      capture_heatmaps: true,
      autocapture: true,
      session_recording: {
        maskAllInputs: false,
        maskTextSelector: ".sensitive-data",
      },
    })
  }
}
