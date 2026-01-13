# Data Model Specification

## ADDED Requirements

### Requirement: Area Entity
The system SHALL define an Area entity with the following properties:
- id: unique identifier (string)
- name: display name (string)
- goalPomodoros: target number of pomodoros (number)
- completedPomodoros: current completed count (number)

#### Scenario: Area creation with default values
- **WHEN** a new area is created with name "Study" and goal 4
- **THEN** the area SHALL have completedPomodoros set to 0

### Requirement: Area Store
The system SHALL provide a centralized store for managing areas using Zustand.

#### Scenario: Store initialization
- **WHEN** the application loads
- **THEN** the store SHALL be initialized with an empty areas array and null selectedAreaId

### Requirement: Area Persistence
The system SHALL persist area data to localStorage.

#### Scenario: Data persists across sessions
- **WHEN** areas are modified and the page is refreshed
- **THEN** the areas SHALL be restored from localStorage

### Requirement: Add Area
The system SHALL allow adding new areas.

#### Scenario: Adding a new area
- **WHEN** addArea is called with name "Work" and goalPomodoros 8
- **THEN** a new area SHALL be added to the store with a unique id

### Requirement: Update Area
The system SHALL allow updating existing areas.

#### Scenario: Updating area name
- **WHEN** updateArea is called with an area id and new name
- **THEN** the area's name SHALL be updated

### Requirement: Delete Area
The system SHALL allow deleting areas.

#### Scenario: Deleting an area
- **WHEN** deleteArea is called with an area id
- **THEN** the area SHALL be removed from the store

### Requirement: Select Area
The system SHALL track the currently selected area.

#### Scenario: Selecting an area
- **WHEN** selectArea is called with an area id
- **THEN** selectedAreaId SHALL be set to that id

### Requirement: Increment Pomodoro
The system SHALL allow incrementing the completed pomodoro count for an area.

#### Scenario: Completing a pomodoro
- **WHEN** incrementPomodoro is called with an area id
- **THEN** that area's completedPomodoros SHALL increase by 1

### Requirement: Reset Progress
The system SHALL allow resetting progress for all areas.

#### Scenario: Manual reset
- **WHEN** resetProgress is called
- **THEN** all areas SHALL have completedPomodoros set to 0
