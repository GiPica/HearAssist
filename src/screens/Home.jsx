import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import GlassCard from '../components/GlassCard'
import HearAssistLogo from '../components/HearAssistLogo'

function SessionCard({ session, onClick }) {
  return (
    <GlassCard onClick={onClick} className="flex items-center gap-3 mb-3">
      <span className="text-2xl">🎓</span>
      <div className="flex-1 min-w-0">
        <div className="text-[#1B2A6B] font-bold text-sm truncate">{session.title}</div>
        <div className="text-[#7B5EA7]/80 text-xs mt-0.5">
          {session.duration} · {session.highlights?.length || 0} Highlights · {session.date}
        </div>
      </div>
    </GlassCard>
  )
}

export default function Home() {
  const { userName, sessions } = useApp()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <HearAssistLogo size={34} />
          <span className="font-extrabold tracking-widest text-base">
            <span className="text-[#1B2A6B]">HEAR</span>
            <span className="text-[#7B5EA7]">ASSIST</span>
          </span>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="w-9 h-9 flex flex-col justify-center items-center gap-1.5 glass rounded-xl"
          >
            <span className="block w-5 h-0.5 bg-[#1B2A6B]" />
            <span className="block w-5 h-0.5 bg-[#1B2A6B]" />
            <span className="block w-5 h-0.5 bg-[#1B2A6B]" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-11 z-20 glass rounded-2xl p-2 min-w-[140px] shadow-lg">
              <button
                onClick={() => { setMenuOpen(false); navigate('/settings') }}
                className="w-full text-left px-3 py-2 text-[#1B2A6B] font-medium text-sm rounded-xl hover:bg-white/30"
              >
                ⚙️ Settings
              </button>
              <button
                onClick={() => { setMenuOpen(false); navigate('/') }}
                className="w-full text-left px-3 py-2 text-[#1B2A6B] font-medium text-sm rounded-xl hover:bg-white/30"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 px-5 pb-8 overflow-y-auto">
        {/* Welcome card */}
        <GlassCard className="flex items-center justify-between mb-5">
          <div>
            <div className="text-[#1B2A6B] text-xl font-bold">Welcome,</div>
            <div className="text-[#1B2A6B] text-xl font-bold">{userName}!</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#2D3A8C]/20 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="10" r="5" fill="#1B2A6B"/>
              <path d="M4 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#1B2A6B" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </GlassCard>

        {/* Mode cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <GlassCard
            onClick={() => navigate('/lecture-mode')}
            className="flex flex-col items-center justify-center py-6 gap-2"
          >
            <span className="text-4xl">🎓</span>
            <span className="text-[#1B2A6B] font-bold text-sm text-center leading-tight">LECTURE<br/>MODE</span>
          </GlassCard>
          <GlassCard
            onClick={() => navigate('/conversation-mode')}
            className="flex flex-col items-center justify-center py-6 gap-2"
          >
            <span className="text-4xl">💬</span>
            <span className="text-[#1B2A6B] font-bold text-sm text-center leading-tight">CONVERSATION<br/>MODE</span>
          </GlassCard>
        </div>

        {/* Recent Sessions */}
        <div className="mb-4">
          <h2 className="text-xl font-extrabold mb-3">
            <span className="text-[#1B2A6B]">Recent </span>
            <span className="text-[#7B5EA7]">Sessions</span>
          </h2>
          {sessions.length === 0 ? (
            <GlassCard>
              <p className="text-[#1B2A6B]/60 text-sm text-center py-2">No sessions yet. Start a new one!</p>
            </GlassCard>
          ) : (
            sessions.slice(0, 5).map(session => (
              <SessionCard
                key={session.id}
                session={session}
                onClick={() => navigate('/summary', { state: { session } })}
              />
            ))
          )}
        </div>

        <button
          onClick={() => navigate('/summary', { state: { sessions } })}
          className="w-full glass py-3 text-[#1B2A6B] font-semibold text-sm rounded-full text-center"
        >
          Saved Transcripts
        </button>
      </div>
    </div>
  )
}
