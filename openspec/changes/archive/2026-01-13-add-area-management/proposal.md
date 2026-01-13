# Change: Add Area Management

## Why
Users need to be able to create, edit, and delete areas through the UI. Currently areas can only be managed via console.

## What Changes
- Add "Add Area" button in sidebar
- Create AddAreaModal component
- Create EditAreaModal component
- Add edit/delete buttons to area cards
- Implement reset progress functionality

## Impact
- Affected specs: area-management (new capability)
- Affected code: src/components/AddAreaModal.tsx, src/components/AreaCard.tsx, src/App.tsx
