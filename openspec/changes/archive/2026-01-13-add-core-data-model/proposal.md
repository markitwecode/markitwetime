# Change: Add Core Data Model

## Why
The application needs a data layer to store and manage areas (work categories) with their pomodoro goals and progress. This is the foundation for all other features.

## What Changes
- Define Area type with id, name, goalPomodoros, completedPomodoros
- Create Zustand store with localStorage persistence
- Implement CRUD operations for areas
- Add selectedAreaId to track current selection

## Impact
- Affected specs: data-model (new capability)
- Affected code: src/store/useStore.ts, src/types/index.ts
