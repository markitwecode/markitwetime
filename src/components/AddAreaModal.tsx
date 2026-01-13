import { useState } from 'react'
import type { Area } from '../types'

type AddAreaModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (name: string, goalPomodoros: number) => void
  editingArea?: Area | null
  onUpdate?: (id: string, name: string, goalPomodoros: number) => void
}

export function AddAreaModal({ isOpen, onClose, onSubmit, editingArea, onUpdate }: AddAreaModalProps) {
  const [name, setName] = useState(editingArea?.name ?? '')
  const [goal, setGoal] = useState(editingArea?.goalPomodoros?.toString() ?? '4')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const goalNum = parseInt(goal, 10)
    if (!name.trim() || isNaN(goalNum) || goalNum < 1) return

    if (editingArea && onUpdate) {
      onUpdate(editingArea.id, name.trim(), goalNum)
    } else {
      onSubmit(name.trim(), goalNum)
    }
    setName('')
    setGoal('4')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-xl p-6 w-80 border border-gray-700">
        <h2 className="text-lg font-semibold mb-4">
          {editingArea ? 'Edit Area' : 'Add New Area'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#252525] border border-gray-700 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-blue-500"
              placeholder="e.g., Study, Work, Arts"
              autoFocus
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-1">Goal (pomodoros)</label>
            <input
              type="number"
              min="1"
              max="20"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-[#252525] border border-gray-700 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              {goal && !isNaN(parseInt(goal)) && parseInt(goal) > 0
                ? `= ${parseInt(goal) * 30} minutes / ${(parseInt(goal) * 30 / 60).toFixed(1)} hours`
                : ''}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {editingArea ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
