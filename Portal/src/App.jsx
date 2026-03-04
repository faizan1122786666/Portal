






import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Slidebar from './components/layout/Slidebar'
import Header from './components/layout/Header'
import Login from './pages/Auth/Login.jsx'
import  { AuthContextProvider } from './context/index.js'
import { AdminDashboard, UserDashboard } from './pages/Dashboard/index'
import { AdminAttendance, UserAttendance } from './pages/Attendance/index'
import { AdminLeave, UserLeave } from './pages/Leave/index'
import { AdminTasks, UserTasks } from './pages/Tasks/index'
import ManageEmployees from './components/layout/ManageEmployees'
import Profile from './components/layout/Profile'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('Dashboard')
  const [user, setUser] = useState(null)
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('darkMode') === 'true'
  )

  const handleSlidebar = () => setIsOpen(prev => !prev)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  // ── Sync updated name back into user state + localStorage ─────────────────
  const handleNameUpdate = (newName) => {
    setUser(prev => {
      const updated = { ...prev, name: newName }
      localStorage.setItem('user', JSON.stringify(updated))
      return updated
    })
  }

  const toggleDarkMode = () => setDarkMode(prev => !prev)

  useEffect(() => {
    const html = document.documentElement
    if (darkMode) {
      html.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      html.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [darkMode])

  return (
    <AuthContextProvider value={{ user, handleLogin, handleLogout }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme={darkMode ? 'dark' : 'light'}
      />

      <div className="flex h-screen overflow-hidden">
        {user ? (
          <>
            <Slidebar
              isOpen={isOpen}
              handleSlidebar={handleSlidebar}
              userEmail={user.email || ''}
              userName={user.name || ''}
              userShift={user.shift || ''}
              userRole={user.role}
              onLogout={handleLogout}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
              <Header
                title={title}
                handleSlidebar={handleSlidebar}
                isAdmin={user.role === 'admin'}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />

              <main className="pt-16 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900 flex-1 overflow-y-auto">
                <Routes>
                  {/* Dashboard */}
                  <Route
                    path="/"
                    element={
                      user.role === 'admin'
                        ? <AdminDashboard setTitle={setTitle} darkMode={darkMode} />
                        : <UserDashboard setTitle={setTitle} darkMode={darkMode} />
                    }
                  />

                  {/* Attendance */}
                  <Route
                    path="/attendance"
                    element={
                      user.role === 'admin'
                        ? <AdminAttendance setTitle={setTitle} />
                        : <UserAttendance setTitle={setTitle} />
                    }
                  />

                  {/* Leave */}
                  <Route
                    path="/leave"
                    element={
                      user.role === 'admin'
                        ? <AdminLeave setTitle={setTitle} />
                        : <UserLeave setTitle={setTitle} />
                    }
                  />

                  {/* Manage Employees — admin only */}
                  {user.role === 'admin' && (
                    <Route
                      path="/employees"
                      element={<ManageEmployees setTitle={setTitle} />}
                    />
                  )}

                  {/* Tasks */}
                  <Route
                    path="/tasks"
                    element={
                      user.role === 'admin'
                        ? <AdminTasks setTitle={setTitle} />
                        : <UserTasks setTitle={setTitle} />
                    }
                  />

                  {/* Profile */}
                  <Route
                    path="/profile"
                    element={
                      <Profile
                        setTitle={setTitle}
                        userName={user.name || ''}
                        userEmail={user.email || ''}
                        userRole={user.role}
                        userShift={user.shift || ''}
                        onNameUpdate={handleNameUpdate}
                      />
                    }
                  />

                  {/* Auth redirects */}
                  <Route path="/login" element={<Navigate to="/" replace />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </div>
    </AuthContextProvider>
  )
}

export default App