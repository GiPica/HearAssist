import { useNavigate, useLocation } from 'react-router-dom'
import GlassCard from '../components/GlassCard'
import { exportSessionPDF } from '../utils/pdfExport'

export default function Summary() {
  const navigate = useNavigate()
  const location = useLocation()
  const session = location.state?.session

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-5">
        <GlassCard className="text-center">
          <p className="text-[#1B2A6B] font-semibold mb-4">No session data found.</p>
          <button onClick={() => navigate('/home')} className="text-[#7B5EA7] font-bold">← Back to Home</button>
        </GlassCard>
      </div>
    )
  }

  const highlightCount = session.highlights?.length ?? 0

  return (
    <div className="flex flex-col min-h-screen px-5" style={{ backgroundImage: 'url(/bg-login.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Header */}
      <div className="flex items-center gap-3 pt-5 pb-1">
        <button onClick={() => navigate('/home')} className="text-[#1B2A6B] font-bold text-2xl leading-none">‹</button>
        <h1 className="text-2xl font-extrabold">
          <span className="text-[#1B2A6B]">SUMM</span><span className="text-[#7B5EA7]">ARY</span>
        </h1>
      </div>

      <p className="text-[#1B2A6B]/70 text-sm mb-0.5">
        {session.mode === 'lecture' ? 'Lecture' : 'Conversation'} Mode Session
      </p>
      <p className="text-[#1B2A6B] font-bold text-sm mb-5">{session.date}</p>

      <GlassCard className="mb-6">
        <h2 className="text-center font-bold text-base mb-4">
          <span className="text-[#1B2A6B]">Key </span>
          <span className="text-[#7B5EA7]">Metrics</span>
        </h2>

        {/* Checkmark */}
        <div className="flex justify-center mb-3">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="28" fill="rgba(45,58,140,0.1)" stroke="#2D3A8C" strokeWidth="2"/>
            <polyline points="16,30 26,42 44,20" stroke="#2D3A8C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <p className="text-center font-bold text-base mb-5">
          <span className="text-[#1B2A6B]">Transcript </span>
          <span className="text-[#7B5EA7]">Saved!</span>
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="glass-dark rounded-2xl p-4 flex flex-col items-center gap-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#1B2A6B" strokeWidth="2"/>
              <polyline points="12,6 12,12 16,14" stroke="#1B2A6B" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-[#1B2A6B] text-xs font-bold tracking-wide">DURATION:</span>
            <span className="text-[#1B2A6B] font-bold text-sm">{session.duration}</span>
          </div>
          <div className="glass-dark rounded-2xl p-4 flex flex-col items-center gap-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="#1B2A6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[#1B2A6B] text-xs font-bold tracking-wide">HIGHLIGHTS:</span>
            <span className="text-[#1B2A6B] font-bold text-sm">{highlightCount}</span>
          </div>
        </div>
      </GlassCard>

      {/* Transcript preview */}
      {session.transcript?.length > 0 && (
        <GlassCard className="mb-5 max-h-48 overflow-y-auto">
          <h3 className="text-[#1B2A6B] font-bold text-sm mb-2">Transcript Preview</h3>
          {session.transcript.slice(0, 6).map((t, i) => (
            <p key={i} className="text-[#1B2A6B]/80 text-xs mb-1">
              <span className="font-semibold">Speaker {t.speaker}:</span> {t.text}
            </p>
          ))}
          {session.transcript.length > 6 && (
            <p className="text-[#7B5EA7] text-xs mt-1">...and {session.transcript.length - 6} more</p>
          )}
        </GlassCard>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 pb-8">
        <button
          onClick={() => navigate('/analysis', { state: { session } })}
          className="flex-1 py-4 rounded-xl font-bold text-white text-sm active:scale-95 transition-transform"
          style={{ background: 'linear-gradient(135deg, #7B5EA7, #5c4a8a)' }}
        >
          Generate AI Notes
        </button>
        <button
          onClick={() => exportSessionPDF(session)}
          className="flex-1 py-4 rounded-xl bg-[#2D3A8C] font-bold text-white text-sm active:scale-95 transition-transform"
        >
          Export as PDF
        </button>
      </div>
    </div>
  )
}
