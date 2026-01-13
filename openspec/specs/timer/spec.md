# timer Specification

## Purpose
TBD - created by archiving change add-timer-logic. Update Purpose after archive.
## Requirements
### Requirement: Timer Phases
The system SHALL support three timer phases: idle, working, and resting.

#### Scenario: Initial phase
- **WHEN** the application loads
- **THEN** the timer phase SHALL be idle

### Requirement: Timer State
The system SHALL track timer state including phase, timeRemaining (in seconds), and isRunning flag.

#### Scenario: Timer state initialization
- **WHEN** the timer is in idle phase
- **THEN** timeRemaining SHALL be 1500 (25 minutes) and isRunning SHALL be false

### Requirement: Start Timer
The system SHALL allow starting the timer for the selected area.

#### Scenario: Starting work phase
- **WHEN** startTimer is called with a selected area
- **THEN** phase SHALL be set to working and isRunning SHALL be true

### Requirement: Pause Timer
The system SHALL allow pausing an active timer.

#### Scenario: Pausing the timer
- **WHEN** pauseTimer is called while timer is running
- **THEN** isRunning SHALL be set to false and timeRemaining SHALL be preserved

### Requirement: Resume Timer
The system SHALL allow resuming a paused timer.

#### Scenario: Resuming from pause
- **WHEN** startTimer is called while paused
- **THEN** isRunning SHALL be set to true and countdown SHALL resume from timeRemaining

### Requirement: Reset Timer
The system SHALL allow resetting the timer to idle state.

#### Scenario: Resetting the timer
- **WHEN** resetTimer is called
- **THEN** phase SHALL be idle, timeRemaining SHALL be 1500, and isRunning SHALL be false

### Requirement: Timer Countdown
The system SHALL decrement timeRemaining every second while running.

#### Scenario: Countdown tick
- **WHEN** the timer is running and one second passes
- **THEN** timeRemaining SHALL decrease by 1

### Requirement: Work Phase Completion
The system SHALL increment the area's pomodoro count when work phase completes.

#### Scenario: Completing work phase
- **WHEN** timeRemaining reaches 0 during working phase
- **THEN** the selected area's completedPomodoros SHALL increment by 1
- **AND** phase SHALL transition to resting
- **AND** timeRemaining SHALL be set to 300 (5 minutes)
- **AND** isRunning SHALL be set to false

### Requirement: Rest Phase Completion
The system SHALL transition to idle when rest phase completes.

#### Scenario: Completing rest phase
- **WHEN** timeRemaining reaches 0 during resting phase
- **THEN** phase SHALL transition to idle
- **AND** timeRemaining SHALL be set to 1500 (25 minutes)
- **AND** isRunning SHALL be set to false

