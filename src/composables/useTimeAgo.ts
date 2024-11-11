export function useTimeAgo() {
  const timeAgo = (timestamp: string): string => {
    const now = new Date()
    const past = new Date(timestamp)
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

    const timeUnits = [
      { unit: 'year', seconds: 60 * 60 * 24 * 365 },
      { unit: 'month', seconds: 60 * 60 * 24 * 30 },
      { unit: 'day', seconds: 60 * 60 * 24 },
      { unit: 'hour', seconds: 60 * 60 },
      { unit: 'minute', seconds: 60 },
      { unit: 'second', seconds: 1 },
    ]

    for (const { unit, seconds } of timeUnits) {
      const count = Math.floor(diffInSeconds / seconds)
      if (count > 0) {
        return `${count} ${unit}${count > 1 ? 's' : ''} ago`
      }
    }

    return 'just now'
  }

  return { timeAgo }
}
