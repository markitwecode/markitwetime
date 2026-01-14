import { useEffect } from 'react'
import { useStore } from '../store/useStore'

export function useTimer() {
  const { timer, tick } = useStore()

  // Regular tick interval
  useEffect(() => {
    if (!timer.isRunning) return

    const interval = setInterval(() => {
      tick()
    }, 1000)

    return () => clearInterval(interval)
  }, [timer.isRunning, tick])

  // Force tick when tab becomes visible (catches up after background throttling)
  useEffect(() => {
    if (!timer.isRunning) return

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        tick()
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [timer.isRunning, tick])

  return timer
}
