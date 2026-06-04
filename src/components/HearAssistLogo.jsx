export default function HearAssistLogo({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ear shape */}
      <ellipse cx="28" cy="32" rx="16" ry="22" stroke="#1B2A6B" strokeWidth="3" fill="none"/>
      <path d="M28 16 C36 16, 42 22, 42 32 C42 40, 38 44, 34 46" stroke="#1B2A6B" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M28 22 C33 22, 36 26, 36 32 C36 37, 33 40, 30 42" stroke="#1B2A6B" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Microphone circle overlay */}
      <circle cx="44" cy="44" r="14" fill="#1B2A6B"/>
      {/* Mic body */}
      <rect x="40" y="36" width="8" height="11" rx="4" fill="white"/>
      {/* Mic stand */}
      <path d="M37 47 Q37 53 44 53 Q51 53 51 47" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <line x1="44" y1="53" x2="44" y2="56" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="41" y1="56" x2="47" y2="56" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}
