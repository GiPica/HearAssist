import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { generateNotes } from '../utils/claudeApi'

export default function Analysis() {
  const navigate = useNavigate()
  const location = useLocation()
  const { updateSession } = useApp()
  const session = location.state?.session

  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const progressRef = useRef(null)
  const doneRef = useRef(false)

  useEffect(() => {
    // Animate progress to ~90% while waiting
    progressRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 88) {
          clearInterval(progressRef.current)
          return 88
        }
        return prev + Math.random() * 4
      })
    }, 180)

    async function run() {
      try {
        const notes = await generateNotes(session?.transcript || [])
        clearInterval(progressRef.current)
        setProgress(100)
        if (!doneRef.current) {
          doneRef.current = true
          if (session?.id) updateSession(session.id, { notes })
          setTimeout(() => navigate('/notes', { state: { session: { ...session, notes } } }), 600)
        }
      } catch (err) {
        clearInterval(progressRef.current)
        setError(err.message || 'Failed to generate notes. Check your API key.')
        setProgress(0)
      }
    }

    run()

    return () => clearInterval(progressRef.current)
  }, [])

  return (
    <div className="flex flex-col min-h-screen px-5" style={{ backgroundImage: 'url(/bg-login.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="pt-5 pb-4">
        <h1 className="text-2xl font-extrabold text-center">
          <span className="text-[#1B2A6B]">ANALYSIS IN </span>
          <span className="text-[#7B5EA7]">PROGRESS</span>
        </h1>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="glass p-8 w-full flex flex-col items-center gap-6">
          {/* Brain illustration */}
          <div className="animate-pulse-scale text-7xl">🧠</div>

          <p className="text-center font-medium text-sm">
            <span className="text-[#1B2A6B]">AI is analyzing your session transcript</span>
            <br />
            <span className="text-[#7B5EA7]">and key points</span>
          </p>

          {error ? (
            <div className="w-full">
              <p className="text-red-600 text-sm text-center mb-4">{error}</p>
              <button
                onClick={() => navigate('/summary', { state: { session } })}
                className="w-full py-3 rounded-xl bg-[#2D3A8C] text-white font-bold text-sm"
              >
                ← Back to Summary
              </button>
            </div>
          ) : (
            <div className="w-full">
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-[#2D3A8C] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[#1B2A6B]/70 text-xs text-center mt-2">
                Processing.. ({Math.round(progress)}% done)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
