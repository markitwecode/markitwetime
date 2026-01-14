import { useEffect, useRef, useState } from 'react'
import { useStore } from './store/useStore'
import { useTimer } from './hooks/useTimer'
import { useNotification } from './hooks/useNotification'
import { AreaCard } from './components/AreaCard'
import { AddAreaModal } from './components/AddAreaModal'
import type { Area } from './types'

// Expose store to window for testing
if (typeof window !== 'undefined') {
  ;(window as unknown as { store: typeof useStore }).store = useStore
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function App() {
  const {
    areas,
    selectedAreaId,
    selectArea,
    startTimer,
    pauseTimer,
    resetTimer,
    addArea,
    updateArea,
    deleteArea,
    resetProgress,
  } = useStore()
  const timer = useTimer()
  const { permission, requestPermission, notifyWorkComplete, notifyRestComplete } = useNotification()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingArea, setEditingArea] = useState<Area | null>(null)

  // Track previous phase to detect transitions
  const prevPhaseRef = useRef(timer.phase)

  useEffect(() => {
    const prevPhase = prevPhaseRef.current
    const currentPhase = timer.phase

    // Detect phase transitions
    if (prevPhase === 'working' && currentPhase === 'resting') {
      notifyWorkComplete()
    } else if (prevPhase === 'resting' && currentPhase === 'idle') {
      notifyRestComplete()
    }

    prevPhaseRef.current = currentPhase
  }, [timer.phase, notifyWorkComplete, notifyRestComplete])

  const selectedArea = areas.find((a) => a.id === selectedAreaId)

  const handleAddArea = (name: string, goalPomodoros: number) => {
    addArea(name, goalPomodoros)
  }

  const handleUpdateArea = (id: string, name: string, goalPomodoros: number) => {
    updateArea(id, { name, goalPomodoros })
  }

  const handleEditArea = (area: Area) => {
    setEditingArea(area)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingArea(null)
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#1a1a1a] border-r border-gray-800 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Areas</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            title="Add Area"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {areas.length === 0 ? (
          <p className="text-gray-500 text-sm">No areas yet. Add one to get started!</p>
        ) : (
          <div className="space-y-2 flex-1 overflow-y-auto">
            {areas.map((area) => (
              <AreaCard
                key={area.id}
                area={area}
                isSelected={selectedAreaId === area.id}
                onSelect={() => selectArea(area.id)}
                onEdit={() => handleEditArea(area)}
                onDelete={() => deleteArea(area.id)}
              />
            ))}
          </div>
        )}

        {/* Bottom buttons */}
        <div className="mt-4 space-y-2">
          {areas.length > 0 && (
            <button
              onClick={resetProgress}
              className="w-full py-2 px-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-gray-400"
            >
              Reset all progress
            </button>
          )}
          {permission !== 'granted' && (
            <button
              onClick={requestPermission}
              className="w-full py-2 px-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Enable notifications
            </button>
          )}
        </div>
      </aside>

      {/* Main timer area */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          {selectedArea ? (
            <>
              <h1 className="text-2xl font-semibold mb-2 text-gray-400">
                {selectedArea.name}
              </h1>
              <div className="text-8xl font-mono font-bold mb-4">
                {formatTime(timer.timeRemaining)}
              </div>
              <div className="text-lg mb-6 capitalize">
                {timer.phase === 'idle' && 'Ready to start'}
                {timer.phase === 'working' && (
                  <span className="text-orange-400">Working</span>
                )}
                {timer.phase === 'resting' && (
                  <span className="text-green-400">Resting</span>
                )}
              </div>
              <div className="flex gap-4 justify-center">
                {!timer.isRunning ? (
                  <button
                    onClick={startTimer}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                  >
                    {timer.phase === 'idle' ? 'Start' : 'Resume'}
                  </button>
                ) : (
                  <button
                    onClick={pauseTimer}
                    className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-medium transition-colors"
                  >
                    Pause
                  </button>
                )}
                <button
                  onClick={resetTimer}
                  className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
                >
                  Reset
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-4">TimeSeverance</h1>
              <p className="text-gray-500">
                {areas.length === 0
                  ? 'Add an area to get started'
                  : 'Select an area to start'}
              </p>
            </>
          )}
        </div>
      </main>

      {/* Add/Edit Area Modal */}
      <AddAreaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddArea}
        editingArea={editingArea}
        onUpdate={handleUpdateArea}
      />
    </div>
  )
}

export default App
