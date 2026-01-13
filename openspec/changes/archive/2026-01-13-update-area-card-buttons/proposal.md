# Change: Update Area Card Button Positioning

## Why
Edit/delete buttons currently only appear when hovering directly over them (bottom-right), making them hard to discover. Users expect buttons to appear when hovering anywhere on the card.

## What Changes
- Move edit/delete buttons from bottom-right to top-right
- Add `group` class to parent div so `group-hover` works
- Buttons become visible when hovering anywhere on the card

## Impact
- Affected specs: sidebar (modify existing requirement)
- Affected code: src/components/AreaCard.tsx (2 lines)
