# Change: Add Notifications

## Why
Users need to be alerted when work and rest phases complete, especially if the browser is in the background. Web Notifications API provides native-feeling alerts on macOS with system sounds.

## What Changes
- Request notification permission on first use
- Show notification when work phase completes ("Pomodoro complete!")
- Show notification when rest phase completes ("Break over!")
- Play system sound with notifications
- Create useNotification hook

## Impact
- Affected specs: notifications (new capability)
- Affected code: src/hooks/useNotification.ts, src/store/useStore.ts
