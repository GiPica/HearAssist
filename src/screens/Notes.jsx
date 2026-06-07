import { useNavigate, useLocation } from 'react-router-dom'
import GlassCard from '../components/GlassCard'
import { exportNotesPDF } from '../utils/pdfExport'

function NoteCard({ icon, title, children }) {
  return (
    <GlassCard className="mb-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#1B2A6B] font-bold text-sm">{title}</span>
      </div>
      {children}
    </GlassCard>
  )
}

export default function Notes() {
  const navigate = useNavigate()
  const location = useLocation()
  const session = location.state?.session

  if (!session?.notes) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-5">
        <GlassCard className="text-center">
          <p className="text-[#1B2A6B] font-semibold mb-4">No notes available.</p>
          <button onClick={() => navigate('/home')} className="text-[#7B5EA7] font-bold">← Back to Home</button>
        </GlassCard>
      </div>
    )
  }

  const { notes } = session
  const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundImage: 'url(/bg-login.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-1">
        <button onClick={() => navigate('/summary', { state: { session } })} className="text-[#1B2A6B] font-bold text-2xl leading-none">‹</button>
        <h1 className="text-2xl font-extrabold">
          <span className="text-[#1B2A6B]">YOUR </span><span className="text-[#7B5EA7]">NOTES</span>
        </h1>
      </div>

      <p className="text-white/70 text-sm px-5 mb-1">Lecture: {session.title || 'Session'}</p>

      <div className="flex-1 px-5 overflow-y-auto pb-4">
        <h2 className="font-extrabold text-xl text-center my-4 leading-tight">
          <span className="text-[#1B2A6B]">{session.title || 'Session Notes'}</span>
        </h2>

        <NoteCard icon="📋" title="Lecture Overview">
          <p className="text-[#1B2A6B]/80 text-sm leading-relaxed">{notes.overview}</p>
          <p className="text-[#7B5EA7]/60 text-xs mt-1">({timestamp})</p>
        </NoteCard>

        <NoteCard icon="⭐" title="Key Points">
          {(notes.keyPoints || []).map((point, i) => (
            <p key={i} className="text-[#1B2A6B]/80 text-sm mb-1">• {point}</p>
          ))}
          <p className="text-[#7B5EA7]/60 text-xs mt-1">({timestamp})</p>
        </NoteCard>

        <NoteCard icon="📎" title="Keywords">
          <div className="flex flex-wrap gap-2 mt-1">
            {(notes.keywords || []).map((kw, i) => (
              <span key={i} className="bg-[#2D3A8C]/10 text-[#2D3A8C] text-xs px-3 py-1 rounded-full font-medium border border-[#2D3A8C]/20">
                {kw}
              </span>
            ))}
          </div>
          <p className="text-[#7B5EA7]/60 text-xs mt-2">({timestamp})</p>
        </NoteCard>
      </div>

      {/* Bottom bar */}
      <div className="px-5 pb-6 pt-2 flex gap-3">
        <button className="glass flex-none px-4 py-3 rounded-xl flex items-center gap-2 text-[#1B2A6B] font-semibold text-sm">
          <span>✏️</span> Edit
        </button>
        <button className="glass flex-none px-4 py-3 rounded-xl flex items-center gap-2 text-[#1B2A6B] font-semibold text-sm">
          <span>🔍</span> Search
        </button>
        <button
          onClick={() => exportNotesPDF(session)}
          className="flex-1 py-3 rounded-xl bg-[#2D3A8C] text-white font-bold text-sm active:scale-95 transition-transform"
        >
          Export as PDF
        </button>
      </div>
    </div>
  )
}
