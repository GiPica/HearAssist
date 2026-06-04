import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'

import Login from './screens/Login'
import Home from './screens/Home'
import Settings from './screens/Settings'
import LectureMode from './screens/LectureMode'
import ConversationMode from './screens/ConversationMode'
import ActiveSession from './screens/ActiveSession'
import Summary from './screens/Summary'
import Analysis from './screens/Analysis'
import Notes from './screens/Notes'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/lecture-mode" element={<LectureMode />} />
            <Route path="/conversation-mode" element={<ConversationMode />} />
            <Route path="/active-session" element={<ActiveSession />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  )
}
