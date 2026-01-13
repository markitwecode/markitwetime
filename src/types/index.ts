export type Area = {
  id: string
  name: string
  goalPomodoros: number
  completedPomodoros: number
}

export type TimerPhase = 'idle' | 'working' | 'resting'

export type TimerState = {
  phase: TimerPhase
  timeRemaining: number // in seconds
  isRunning: boolean
}

export type AppState = {
  areas: Area[]
  selectedAreaId: string | null
  timer: TimerState
}

export type AppActions = {
  // Area actions
  addArea: (name: string, goalPomodoros: number) => void
  updateArea: (id: string, updates: Partial<Omit<Area, 'id'>>) => void
  deleteArea: (id: string) => void
  selectArea: (id: string | null) => void
  incrementPomodoro: (id: string) => void
  resetProgress: () => void
  // Timer actions
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  tick: () => void
}

export type AppStore = AppState & AppActions

// Constants
export const WORK_DURATION = 25 * 60 // 25 minutes in seconds
export const REST_DURATION = 5 * 60  // 5 minutes in seconds
