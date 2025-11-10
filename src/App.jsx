import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Resume from './components/Resume'

const SESSION_KEY = 'interactive_resume_session'

function ProtectedRoute({ session, children }) {
  if (!session) return <Navigate to="/" replace />
  return children
}

const App = () => {
  const [session, setSession] = useState(() =>
    JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (session) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    } else {
      localStorage.removeItem(SESSION_KEY)
    }
  }, [session])

  // automatically redirect based on session state
  useEffect(() => {
    if (session) navigate('/resume')
    else navigate('/login')
  }, [session, navigate])

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/login" element={<Login onLogin={setSession} />} />

        {/* Protected routes */}
        <Route
          path="/resume"
          element={
            <ProtectedRoute session={session}>
              <Resume user={session} onLogout={() => setSession(null)} />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

export default App
