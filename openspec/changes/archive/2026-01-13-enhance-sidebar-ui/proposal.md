# Change: Enhance Sidebar UI

## Why
Users need to see both time-based and pomodoro-based progress in the sidebar. The sidebar should clearly indicate when goals are complete and handle exceeding goals gracefully.

## What Changes
- Display time progress (e.g., "30 min / 2 hours")
- Display pomodoro progress (e.g., "1 / 4 pomodoros")
- Add visual indicator when goal is complete
- Show "extra" progress when exceeding goal (e.g., "7 / 4")
- Create dedicated AreaCard component

## Impact
- Affected specs: sidebar (new capability)
- Affected code: src/components/AreaCard.tsx, src/App.tsx
