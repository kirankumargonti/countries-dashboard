export function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait: number
): (...args: Parameters<F>) => void {
  let timeoutId: NodeJS.Timeout | null = null

  return function (...args: Parameters<F>): void {
    const later = () => {
      timeoutId = null
      func(...args)
    }

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(later, wait)
  }
}
