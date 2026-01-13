# sidebar Specification

## Purpose
TBD - created by archiving change enhance-sidebar-ui. Update Purpose after archive.
## Requirements
### Requirement: Time Progress Display
The sidebar SHALL display time-based progress for each area.

#### Scenario: Showing time progress
- **WHEN** an area has 2 completed pomodoros with a goal of 4
- **THEN** time progress SHALL display as "1h 0m / 2h 0m"

### Requirement: Pomodoro Progress Display
The sidebar SHALL display pomodoro-based progress for each area.

#### Scenario: Showing pomodoro progress
- **WHEN** an area has 2 completed pomodoros with a goal of 4
- **THEN** pomodoro progress SHALL display as "2 / 4 pomodoros"

### Requirement: Goal Completion Indicator
The sidebar SHALL visually indicate when an area's goal is complete.

#### Scenario: Goal reached
- **WHEN** completedPomodoros equals or exceeds goalPomodoros
- **THEN** the area card SHALL display a visual completion indicator

### Requirement: Extra Progress Display
The sidebar SHALL display extra progress when exceeding goals.

#### Scenario: Exceeding goal
- **WHEN** an area has 7 completed pomodoros with a goal of 4
- **THEN** the display SHALL show "7 / 4 pomodoros" with indication of extra progress

### Requirement: Area Selection
The sidebar SHALL indicate which area is currently selected.

#### Scenario: Selecting an area
- **WHEN** an area is selected
- **THEN** the area card SHALL be visually highlighted

#### Scenario: Hovering over area card
- **WHEN** user hovers anywhere on an area card
- **THEN** edit and delete buttons SHALL appear in the top-right corner

