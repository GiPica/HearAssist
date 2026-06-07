import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/GlassCard'

export default function LectureMode() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen px-5" style={{ backgroundImage: 'url(/bg-login.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="flex items-center gap-3 pt-5 pb-4">
        <button onClick={() => navigate(-1)} className="text-[#1B2A6B] font-bold text-2xl leading-none">‹</button>
        <h1 className="text-2xl font-extrabold">
          <span className="text-[#1B2A6B]">LECTURE </span>
          <span className="text-[#7B5EA7]">MODE</span>
        </h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <GlassCard className="w-full flex flex-col items-center py-10 gap-8">
          <p className="text-white text-2xl font-semibold text-center">
            Ready to start<br />session?
          </p>
          <button
            onClick={() => navigate('/active-session?mode=lecture')}
            className="neumorphic w-20 h-20 flex items-center justify-center active:scale-95 transition-transform"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <polygon points="10,6 28,16 10,26" fill="#2D3A8C"/>
            </svg>
          </button>
        </GlassCard>

        <div className="flex gap-4 w-full">
          <GlassCard className="flex-1 flex items-center justify-center py-4">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="10" y="2" width="8" height="14" rx="4" fill="#2D3A8C"/>
              <path d="M5 14 Q5 22 14 22 Q23 22 23 14" stroke="#2D3A8C" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <line x1="14" y1="22" x2="14" y2="26" stroke="#2D3A8C" strokeWidth="2" strokeLinecap="round"/>
              <line x1="10" y1="26" x2="18" y2="26" stroke="#2D3A8C" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </GlassCard>
          <GlassCard className="flex-1 flex items-center justify-center py-4">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 4L14 20" stroke="#2D3A8C" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8 14L14 20L20 14" stroke="#2D3A8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 22H24" stroke="#2D3A8C" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
