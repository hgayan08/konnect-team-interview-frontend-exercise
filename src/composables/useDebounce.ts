export function useDebounce(func: (...args: any[]) => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout>
  return function(...args: any[]): void {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
