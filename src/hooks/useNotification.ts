import { useEffect, useCallback, useState } from 'react'

export function useNotification() {
  const [permission, setPermission] = useState<NotificationPermission>(
    'Notification' in window ? Notification.permission : 'denied'
  )

  // Request permission on mount (will be blocked by browser, but we track state)
  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = useCallback(async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission()
      setPermission(result)
      return result
    }
    return 'denied' as NotificationPermission
  }, [])

  const showNotification = useCallback((title: string, body?: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title, {
        body,
        icon: '/vite.svg',
        silent: false, // Allows system sound
      })

      // Auto-close after 5 seconds
      setTimeout(() => notification.close(), 5000)
    }
  }, [])

  const notifyWorkComplete = useCallback(() => {
    showNotification('Pomodoro Complete!', 'Great work! Time for a break.')
  }, [showNotification])

  const notifyRestComplete = useCallback(() => {
    showNotification('Break Over!', 'Ready for another pomodoro?')
  }, [showNotification])

  return {
    permission,
    requestPermission,
    showNotification,
    notifyWorkComplete,
    notifyRestComplete,
  }
}
