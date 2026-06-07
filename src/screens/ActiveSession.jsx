import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import CaptionBubble from '../components/CaptionBubble'
import GlassCard from '../components/GlassCard'
import { createRecognition, getNoiseLevel, isSupported } from '../utils/speechRecognition'

export default function ActiveSession() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') || 'lecture'
  const { addSession } = useApp()

  const [captions, setCaptions] = useState([])
  const [interimText, setInterimText] = useState('')
  const [currentSpeaker, setCurrentSpeaker] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const [noiseLevel, setNoiseLevel] = useState('Low')
  const [startTime] = useState(Date.now())

  const recognitionRef = useRef(null)
  const captionsEndRef = useRef(null)
  const captionIdRef = useRef(0)

  useEffect(() => {
    if (!isSupported()) return

    const recognition = createRecognition()
    recognitionRef.current = recognition

    recognition.onresult = (event) => {
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          const text = result[0].transcript.trim()
          if (!text) continue
          const confidence = result[0].confidence
          setNoiseLevel(getNoiseLevel(confidence))

          const now = new Date()
          const timestamp = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

          setCaptions(prev => {
            const id = ++captionIdRef.current
            const spk = prev.length === 0 ? 1 : prev[prev.length - 1].speaker === 1 ? 2 : 1
            return [...prev, { id, speaker: spk, text, timestamp, highlighted: false }]
          })
          setCurrentSpeaker(s => s === 1 ? 2 : 1)
          setInterimText('')
        } else {
          interim += result[0].transcript
        }
      }
      setInterimText(interim)
    }

    recognition.onerror = (e) => {
      if (e.error !== 'aborted' && e.error !== 'no-speech') console.warn('SR error', e.error)
    }

    recognition.start()

    return () => {
      try { recognition.stop() } catch {}
    }
  }, [])

  useEffect(() => {
    captionsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [captions, interimText])

  function toggleHighlight(id) {
    setCaptions(prev => prev.map(c => c.id === id ? { ...c, highlighted: !c.highlighted } : c))
  }

  function handlePause() {
    if (isPaused) {
      try { recognitionRef.current?.start() } catch {}
    } else {
      try { recognitionRef.current?.stop() } catch {}
    }
    setIsPaused(v => !v)
  }

  function handleDone() {
    try { recognitionRef.current?.stop() } catch {}

    const elapsedMin = Math.round((Date.now() - startTime) / 60000)
    const duration = elapsedMin < 1 ? '< 1 min' : `${elapsedMin} min`
    const highlights = captions.filter(c => c.highlighted)
    const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    const firstWords = captions[0]?.text?.split(' ').slice(0, 4).join(' ') || 'Untitled'

    const session = {
      id: Date.now().toString(),
      title: firstWords,
      mode,
      date,
      duration,
      highlights,
      transcript: captions,
      notes: null,
    }

    addSession(session)
    navigate('/summary', { state: { session } })
  }

  const noiseLevelColor = {
    Low: 'text-green-600',
    Medium: 'text-yellow-600',
    High: 'text-red-600',
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundImage: 'url(/bg-login.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-2">
        <button onClick={() => navigate(-1)} className="text-[#1B2A6B] font-bold text-2xl leading-none">‹</button>
        <h1 className="text-2xl font-extrabold">
          <span className="text-[#1B2A6B]">ACTIVE </span>
          <span className="text-[#7B5EA7]">SESSION</span>
        </h1>
      </div>

      {/* Noise level */}
      <div className="px-5 mb-3">
        <div className="glass text-center py-2 px-4 rounded-full inline-block">
          <span className="text-[#1B2A6B] font-semibold text-sm">
            Noise Level: <span className={noiseLevelColor[noiseLevel]}>{noiseLevel}</span>
          </span>
        </div>
      </div>

      {/* Captions */}
      <div className="flex-1 px-5 overflow-y-auto pb-4">
        <GlassCard className="min-h-[300px] p-4">
          {!isSupported() && (
            <p className="text-[#1B2A6B] text-sm text-center py-4">
              Speech recognition requires Chrome. Please open in Chrome.
            </p>
          )}
          {captions.length === 0 && isSupported() && (
            <p className="text-white/60 text-sm text-center py-4">
              {isPaused ? 'Recognition paused...' : 'Listening... start speaking'}
            </p>
          )}
          {captions.map(caption => (
            <CaptionBubble
              key={caption.id}
              speaker={caption.speaker}
              text={caption.text}
              timestamp={caption.timestamp}
              highlighted={caption.highlighted}
              onToggleHighlight={() => toggleHighlight(caption.id)}
            />
          ))}
          {interimText && (
            <div className="caption-bubble p-3 opacity-60 mb-3">
              <p className="text-white text-base italic">{interimText}</p>
            </div>
          )}
          <div ref={captionsEndRef} />
        </GlassCard>
      </div>

      {/* Bottom bar */}
      <div className="px-5 pb-6 pt-2 flex gap-4">
        <button
          onClick={handlePause}
          className="flex-1 py-4 rounded-xl font-bold text-white text-base active:scale-95 transition-transform"
          style={{ background: isPaused ? '#22c55e' : '#ef4444' }}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={handleDone}
          className="flex-1 py-4 rounded-xl bg-[#2D3A8C] font-bold text-white text-base active:scale-95 transition-transform"
        >
          Done
        </button>
      </div>
    </div>
  )
}
