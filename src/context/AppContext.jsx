import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [userName, setUserName] = useState('User')
  const [textSize, setTextSize] = useState('md')
  const [highContrast, setHighContrast] = useState(false)
  const [speakerID, setSpeakerID] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem('hearassist_sessions')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('hearassist_sessions', JSON.stringify(sessions))
  }, [sessions])

  function addSession(session) {
    setSessions(prev => [session, ...prev])
  }

  function updateSession(id, updates) {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
  }

  return (
    <AppContext.Provider value={{
      userName, setUserName,
      textSize, setTextSize,
      highContrast, setHighContrast,
      speakerID, setSpeakerID,
      showPreview, setShowPreview,
      sessions, addSession, updateSession,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
