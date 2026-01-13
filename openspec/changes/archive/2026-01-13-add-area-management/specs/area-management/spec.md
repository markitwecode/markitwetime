# Area Management Specification

## ADDED Requirements

### Requirement: Add Area UI
The system SHALL provide a UI for adding new areas.

#### Scenario: Adding a new area
- **WHEN** user clicks "Add Area" button
- **THEN** a modal SHALL appear with name and goal inputs
- **AND** submitting SHALL create a new area

### Requirement: Edit Area UI
The system SHALL provide a UI for editing existing areas.

#### Scenario: Editing an area
- **WHEN** user clicks edit button on an area card
- **THEN** a modal SHALL appear with current values
- **AND** submitting SHALL update the area

### Requirement: Delete Area UI
The system SHALL provide a UI for deleting areas.

#### Scenario: Deleting an area
- **WHEN** user clicks delete button on an area card
- **THEN** the area SHALL be removed from the list

### Requirement: Reset Progress UI
The system SHALL provide a UI for resetting all progress.

#### Scenario: Resetting progress
- **WHEN** user clicks reset progress button
- **THEN** all areas SHALL have their completedPomodoros set to 0
