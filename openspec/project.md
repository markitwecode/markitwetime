# Project Context

## Purpose
MarkItWeTime is a pomodoro-based time management system where users work on "areas" (categories like study, work, arts) rather than individual tasks. Each area has a daily goal measured in pomodoros (25 min work + 5 min rest = 30 min). Users can freely switch between areas throughout the day, completing pomodoros to reach their goals.

## Tech Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand with localStorage persistence
- **Notifications**: Web Notifications API
- **Data Storage**: localStorage (no backend)

## Project Conventions

### Code Style
- TypeScript strict mode enabled
- Functional components with hooks
- Named exports preferred over default exports
- File naming: PascalCase for components, camelCase for utilities/hooks
- Use `type` over `interface` for consistency

### Architecture Patterns
- Single Zustand store for global state
- Custom hooks for reusable logic (useTimer, useNotification)
- Components in `src/components/`
- Hooks in `src/hooks/`
- Types in `src/types/`
- Store in `src/store/`

### Testing Strategy
- Manual testing via browser automation
- Visual verification of UI states
- Functional testing of timer logic

### Git Workflow
- Main branch for stable code
- Feature branches for proposals
- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`

## Domain Context

### Pomodoro Technique
- One pomodoro = 25 minutes focused work + 5 minutes rest
- Pomodoro counts only after 25-minute work phase completes
- No auto-play between phases (user manually starts next phase)
- Time equivalent: 1 pomodoro = 30 minutes

### Areas
- Categories of work (study, work, arts, etc.)
- Each area has a name and goal (number of pomodoros)
- Progress shown as both time (30 min / 2 hours) and pomodoros (1 / 4)
- Goals can be exceeded (shows as "extra": 7 / 4)
- Visual indication when goal is complete

### UI Layout
- Left sidebar: List of areas with progress
- Right main area: Large pomodoro timer
- Dark mode theme

## Important Constraints
- No backend/database - all data in localStorage
- Must work offline
- Manual reset only (no auto-reset at midnight)
- Web Notifications API for alerts (requires user permission)

## External Dependencies
- None (fully client-side)
