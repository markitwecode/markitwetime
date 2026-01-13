# Tasks: Add Timer Logic

## 1. Implementation

- [x] 1.1 Add TimerPhase type (idle, working, resting)
- [x] 1.2 Add timer state to store (phase, timeRemaining, isRunning)
- [x] 1.3 Implement startTimer action
- [x] 1.4 Implement pauseTimer action
- [x] 1.5 Implement resetTimer action
- [x] 1.6 Implement tick action (decrement timeRemaining)
- [x] 1.7 Create useTimer hook with setInterval logic
- [x] 1.8 Handle work phase completion (increment pomodoro, transition to rest)
- [x] 1.9 Handle rest phase completion (transition to idle)

## 2. Verification

- [x] 2.1 Test starting timer (use short duration for testing)
- [x] 2.2 Test pausing and resuming
- [x] 2.3 Test work phase completion triggers pomodoro increment
- [x] 2.4 Test phase transitions
