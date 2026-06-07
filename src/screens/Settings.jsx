import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import GlassCard from '../components/GlassCard'
import Toggle from '../components/Toggle'

export default function Settings() {
  const navigate = useNavigate()
  const { textSize, setTextSize, highContrast, setHighContrast, speakerID, setSpeakerID, showPreview, setShowPreview } = useApp()

  const sizes = [
    { id: 'sm', label: 'A', style: 'text-sm' },
    { id: 'md', label: 'A', style: 'text-base' },
    { id: 'lg', label: 'A', style: 'text-lg' },
  ]

  return (
    <div className="flex flex-col min-h-screen px-5" style={{ backgroundImage: 'url(/bg-login.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Header */}
      <div className="flex items-center gap-3 pt-5 pb-4">
        <button onClick={() => navigate(-1)} className="text-[#1B2A6B] font-bold text-2xl leading-none">‹</button>
        <h1 className="text-2xl font-extrabold">
          <span className="text-[#1B2A6B]">SETT</span><span className="text-[#7B5EA7]">INGS</span>
        </h1>
      </div>

      <h2 className="text-white/80 font-semibold text-base mb-4">Accessibility</h2>

      <GlassCard className="mb-4">
        {/* Text Size */}
        <div className="mb-4">
          <div className="font-bold text-sm mb-3">
            <span className="text-[#1B2A6B]">Text </span>
            <span className="text-[#7B5EA7]">Size</span>
          </div>
          <div className="flex gap-2 bg-white/20 rounded-xl p-1">
            {sizes.map(s => (
              <button
                key={s.id}
                onClick={() => setTextSize(s.id)}
                className={`flex-1 py-2 rounded-lg transition-all font-bold ${s.style} ${
                  textSize === s.id
                    ? 'bg-white text-[#1B2A6B] shadow-sm'
                    : 'text-[#1B2A6B]/60'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Toggle
            label="High Contrast Mode"
            checked={highContrast}
            onChange={setHighContrast}
          />
          <Toggle
            label="Speaker ID"
            checked={speakerID}
            onChange={setSpeakerID}
          />
        </div>
      </GlassCard>

      <GlassCard>
        <Toggle
          label="Show Preview"
          checked={showPreview}
          onChange={setShowPreview}
        />
      </GlassCard>
    </div>
  )
}
