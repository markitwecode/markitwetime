import type { Area } from '../types'

type AreaCardProps = {
  area: Area
  isSelected: boolean
  onSelect: () => void
  onEdit: () => void
  onDelete: () => void
}

function formatTime(pomodoros: number): string {
  const totalMinutes = pomodoros * 30
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) {
    return `${minutes}m`
  }
  if (minutes === 0) {
    return `${hours}h`
  }
  return `${hours}h ${minutes}m`
}

export function AreaCard({ area, isSelected, onSelect, onEdit, onDelete }: AreaCardProps) {
  const isComplete = area.completedPomodoros >= area.goalPomodoros
  const isExtra = area.completedPomodoros > area.goalPomodoros

  return (
    <div
      className={`group relative p-3 rounded-lg transition-colors ${
        isSelected
          ? 'bg-blue-600/20 border border-blue-500/50'
          : isComplete
          ? 'bg-green-900/20 border border-green-700/50'
          : 'bg-[#252525] border border-transparent hover:bg-[#2a2a2a]'
      }`}
    >
      {/* Main clickable area */}
      <button onClick={onSelect} className="w-full text-left">
        <div className="font-medium mb-1 pr-12 flex items-center gap-2">
          {area.name}
          {isComplete && (
            <span className="text-green-400 text-xs font-normal">
              {isExtra ? '+' + (area.completedPomodoros - area.goalPomodoros) : '✓'}
            </span>
          )}
        </div>

        {/* Time progress */}
        <div className="text-sm text-gray-400">
          {formatTime(area.completedPomodoros)} / {formatTime(area.goalPomodoros)}
        </div>

        {/* Pomodoro progress */}
        <div className={`text-xs mt-1 ${isExtra ? 'text-green-400' : 'text-gray-500'}`}>
          {area.completedPomodoros} / {area.goalPomodoros} pomodoros
          {isExtra && ' (extra!)'}
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              isComplete ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{
              width: `${Math.min(100, (area.completedPomodoros / area.goalPomodoros) * 100)}%`,
            }}
          />
        </div>
      </button>

      {/* Edit/Delete buttons - show on hover */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 hover:opacity-100 transition-opacity group-hover:opacity-100">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
          }}
          className="p-1 text-gray-500 hover:text-gray-300 transition-colors"
          title="Edit"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="p-1 text-gray-500 hover:text-red-400 transition-colors"
          title="Delete"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}
