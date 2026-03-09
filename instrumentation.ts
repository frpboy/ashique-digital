export async function register() {
  if (process.env.NEXT_RUNTIME === 'edge' || process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side initialization if needed
  }

  if (typeof window !== 'undefined') {
    const { register: registerClient } = await import('./instrumentation-client')
    registerClient()
  }
}
