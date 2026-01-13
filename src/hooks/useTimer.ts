import { useEffect } from 'react'
import { useStore } from '../store/useStore'

export function useTimer() {
  const { timer, tick } = useStore()

  useEffect(() => {
    if (!timer.isRunning) return

    const interval = setInterval(() => {
      tick()
    }, 1000)

    return () => clearInterval(interval)
  }, [timer.isRunning, tick])

  return timer
}
