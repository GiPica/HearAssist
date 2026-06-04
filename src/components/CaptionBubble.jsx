import { useApp } from '../context/AppContext'

export default function CaptionBubble({ speaker, text, timestamp, highlighted, onToggleHighlight }) {
  const { textSize } = useApp()

  const sizeClass = textSize === 'sm' ? 'text-sm' : textSize === 'lg' ? 'text-lg' : 'text-base'

  return (
    <div className="mb-4">
      <div className={`font-bold mb-1 text-sm ${speaker === 1 ? 'text-[#1B2A6B]' : 'text-[#7B5EA7]'}`}>
        Speaker {speaker}
      </div>
      <div className="caption-bubble p-3 relative">
        <button
          onClick={onToggleHighlight}
          className="absolute top-2 right-2 text-lg leading-none focus:outline-none"
          aria-label="Toggle highlight"
        >
          {highlighted ? '⭐' : '☆'}
        </button>
        <p className={`text-white pr-6 ${sizeClass} leading-relaxed`}>{text}</p>
        <div className="text-white/60 text-xs text-right mt-1">{timestamp}</div>
      </div>
    </div>
  )
}
