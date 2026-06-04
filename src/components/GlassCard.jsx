export default function GlassCard({ children, className = '', onClick }) {
  return (
    <div
      className={`glass p-4 ${onClick ? 'cursor-pointer active:scale-95 transition-transform' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
