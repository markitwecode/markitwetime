import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppStore, Area } from '../types'
import { WORK_DURATION, REST_DURATION } from '../types'

const generateId = () => Math.random().toString(36).substring(2, 9)

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // State
      areas: [],
      selectedAreaId: null,
      timer: {
        phase: 'idle',
        timeRemaining: WORK_DURATION,
        isRunning: false,
      },

      // Area Actions
      addArea: (name: string, goalPomodoros: number) => {
        const newArea: Area = {
          id: generateId(),
          name,
          goalPomodoros,
          completedPomodoros: 0,
        }
        set((state) => ({ areas: [...state.areas, newArea] }))
      },

      updateArea: (id: string, updates: Partial<Omit<Area, 'id'>>) => {
        set((state) => ({
          areas: state.areas.map((area) =>
            area.id === id ? { ...area, ...updates } : area
          ),
        }))
      },

      deleteArea: (id: string) => {
        set((state) => ({
          areas: state.areas.filter((area) => area.id !== id),
          selectedAreaId: state.selectedAreaId === id ? null : state.selectedAreaId,
        }))
      },

      selectArea: (id: string | null) => {
        set({ selectedAreaId: id })
      },

      incrementPomodoro: (id: string) => {
        set((state) => ({
          areas: state.areas.map((area) =>
            area.id === id
              ? { ...area, completedPomodoros: area.completedPomodoros + 1 }
              : area
          ),
        }))
      },

      resetProgress: () => {
        set((state) => ({
          areas: state.areas.map((area) => ({
            ...area,
            completedPomodoros: 0,
          })),
        }))
      },

      // Timer Actions
      startTimer: () => {
        const { selectedAreaId, timer } = get()
        if (!selectedAreaId) return

        if (timer.phase === 'idle') {
          set({
            timer: {
              phase: 'working',
              timeRemaining: WORK_DURATION,
              isRunning: true,
            },
          })
        } else {
          set({
            timer: {
              ...timer,
              isRunning: true,
            },
          })
        }
      },

      pauseTimer: () => {
        set((state) => ({
          timer: {
            ...state.timer,
            isRunning: false,
          },
        }))
      },

      resetTimer: () => {
        set({
          timer: {
            phase: 'idle',
            timeRemaining: WORK_DURATION,
            isRunning: false,
          },
        })
      },

      tick: () => {
        const { timer, selectedAreaId, incrementPomodoro } = get()
        if (!timer.isRunning || timer.timeRemaining <= 0) return

        const newTimeRemaining = timer.timeRemaining - 1

        if (newTimeRemaining <= 0) {
          // Phase completed
          if (timer.phase === 'working') {
            // Work phase done - increment pomodoro and transition to rest
            if (selectedAreaId) {
              incrementPomodoro(selectedAreaId)
            }
            set({
              timer: {
                phase: 'resting',
                timeRemaining: REST_DURATION,
                isRunning: false,
              },
            })
          } else if (timer.phase === 'resting') {
            // Rest phase done - transition to idle
            set({
              timer: {
                phase: 'idle',
                timeRemaining: WORK_DURATION,
                isRunning: false,
              },
            })
          }
        } else {
          set({
            timer: {
              ...timer,
              timeRemaining: newTimeRemaining,
            },
          })
        }
      },
    }),
    {
      name: 'markitwetime-storage',
      partialize: (state) => ({
        areas: state.areas,
        selectedAreaId: state.selectedAreaId,
        // Don't persist timer state - always start fresh
      }),
    }
  )
)
