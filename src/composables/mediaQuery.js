export function mediaQuery(query) {
  if (typeof window === 'undefined') return { matches: false }
  return window.matchMedia(query)
}
