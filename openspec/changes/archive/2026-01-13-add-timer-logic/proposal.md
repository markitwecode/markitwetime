# Change: Add Timer Logic

## Why
The core functionality of the app is the pomodoro timer. Users need to be able to start a 25-minute work session, followed by a 5-minute rest, with the timer tracking their progress.

## What Changes
- Add timer state to the store (phase, timeRemaining, isRunning)
- Implement startTimer, pauseTimer, resetTimer actions
- Create useTimer hook for timer countdown logic
- Auto-increment pomodoro count when work phase completes
- Handle phase transitions (work → rest → idle)

## Impact
- Affected specs: timer (new capability)
- Affected code: src/store/useStore.ts, src/hooks/useTimer.ts, src/types/index.ts
