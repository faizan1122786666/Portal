





// import { useEffect, useState } from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import Slidebar from './components/layout/Slidebar'
// import Header from './components/layout/Header'
// import Login from './pages/Auth/Login.jsx'
// import { AuthContextProvider} from './context'
// import {AdminDashboard,UserDashboard} from './pages/Dashboard/index'
// import {AdminAttendance,UserAttendance} from './pages/Attendance/index'
// import { AdminLeave,UserLeave } from './pages/Leave/index'
// // import EmployeeAttendanceModal from './pages/Attendance/EmployeeAttendanceModal'

// function App () {
//   const [isOpen, setIsOpen] = useState(false)
//   const [title, setTitle] = useState('Dashboard')
//   const [user, setUser] = useState(null)
//   const [darkMode, setDarkMode] = useState(false)
  
//   const handleSlidebar = () => {
//     setIsOpen(!isOpen)
//   }

//   useEffect (() => {
//     const stored = localStorage.getItem('user')
//     if(stored)
//     {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       setUser(JSON.parse(stored))
//     }
//   },[]) 

//   const handleLogin = (userData) => {
//   localStorage.setItem('user',JSON.stringify(userData))
//   setUser(userData)
//   }
  
//   const handleLogout = () => {
//     localStorage.removeItem('user')
//     setUser(null)
//   }

//   const toggleDarkMode = () => {
//     setDarkMode(prev => !prev);
//   }


//   useEffect(() => {
//     const html  = document.documentElement
//     darkMode ? html.classList.add('dark')
//     : html.classList.remove('dark')
//   }, [darkMode])
  


//   return (
   
//     <AuthContextProvider value={{user, handleLogin, handleLogout}}>
//       <div className="flex h-screen overflow-hidden">
//       { user ? (
//         <>
//        <Slidebar 
//          isOpen={isOpen} 
//          handleSlidebar={handleSlidebar} 
//          userEmail={user.email || '' }
//          userName={user.name || ''}
//          onLogout={handleLogout}/>

//            <div className="flex-1 flex flex-col">

//    <Header title={title} handleSlidebar={handleSlidebar} 
//    darkMode={darkMode}  toggleDarkMode={toggleDarkMode}
//    />

//    {/* <main className="pt-16 px-6 bg-gray-50 flex-1 overflow-y-auto"> */}
//    <main className="pt-16 px-6 bg-gray-50 dark:bg-gray-900 flex-1 overflow-y-auto">
//        <Routes>
//            <Route path="/" element={ 
//             user.role === 'admin' ? (
//                <AdminDashboard setTitle={setTitle} darkMode={darkMode} />
//             ) : (
//               <UserDashboard setTitle={setTitle} darkMode={darkMode}/>
//             )
//             } 
//             />
//            <Route path="/attendance" element={
//             user.role === 'admin' ? (

//             <AdminAttendance setTitle={setTitle}  />)
//             : (
//             <UserAttendance setTitle={setTitle} />
//             )
//             } />
           
//            {/* Employee Detail Route - Only for Admin
//            {user.role === 'admin' && ( */}
   
   
           
//            <Route path="/leave" element={
//             user.role === 'admin' ? (
//               <AdminLeave setTitle={setTitle} />
//             ) : (
//               <UserLeave setTitle={setTitle} />
//             )
//            } />
           
//            {/* Redirect to dashboard if already logged in */}
//            <Route path='/login' element={<Navigate to="/" replace/>} />
           
//            {/* Catch all - redirect to dashboard */}
//            <Route path='*' element={<Navigate to="/" replace />} />
//        </Routes>
//    </main>
//       </div>
//        </> ) : (
//         <Login/>
//         )}

//         </div>
//     </AuthContextProvider>
   
//   )
// }

// export default App

























// import { useEffect, useState } from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import Slidebar from './components/layout/Slidebar'
// import Header from './components/layout/Header'
// import Login from './pages/Auth/Login.jsx'
// import ChangePassword from "./pages/Auth/ChangePassword";
// import ManageEmployees from "./components/layout/ManageEmployees";
// import { AuthContextProvider } from './context'
// import { AdminDashboard, UserDashboard } from './pages/Dashboard/index'
// import { AdminAttendance, UserAttendance } from './pages/Attendance/index'
// import { AdminLeave, UserLeave } from './pages/Leave/index'

// function App () {
//   const [isOpen, setIsOpen] = useState(false)
//   const [title, setTitle] = useState('Dashboard')
//   const [user, setUser] = useState(null)
//   const [darkMode, setDarkMode] = useState(false)
//   const [showChangePassword, setShowChangePassword] = useState(false)
  
//   const handleSlidebar = () => {
//     setIsOpen(!isOpen)
//   }

//   useEffect(() => {
//     const stored = localStorage.getItem('user')
//     if (stored) {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       setUser(JSON.parse(stored))
//     }
//   }, []) 

//   const handleLogin = (userData) => {
//     localStorage.setItem('user', JSON.stringify(userData))
//     setUser(userData)
//   }
  
//   const handleLogout = () => {
//     localStorage.removeItem('user')
//     setUser(null)
//   }

//   const toggleDarkMode = () => {
//     setDarkMode(prev => !prev)
//   }

//   useEffect(() => {
//     const html = document.documentElement
//     darkMode ? html.classList.add('dark') : html.classList.remove('dark')
//   }, [darkMode])

//   return (
//     <AuthContextProvider value={{ user, handleLogin, handleLogout }}>
//       <div className="flex h-screen overflow-hidden">
//         {user ? (
//           <>
//             <Slidebar 
//               isOpen={isOpen} 
//               handleSlidebar={handleSlidebar} 
//               userEmail={user.email || ''}
//               userName={user.name || ''}
//               onLogout={handleLogout}
//               userRole={user.role}
//               onChangePassword={() => setShowChangePassword(true)}
//             />

//             <div className="flex-1 flex flex-col">
//               <Header 
//                 title={title} 
//                 handleSlidebar={handleSlidebar} 
//                 darkMode={darkMode}  
//                 toggleDarkMode={toggleDarkMode}
//               />

//               <main className="pt-16 px-6 bg-gray-50 dark:bg-gray-900 flex-1 overflow-y-auto">
//                 <Routes>
//                   {/* Dashboard Routes */}
//                   <Route 
//                     path="/" 
//                     element={
//                       user.role === 'admin' ? (
//                         <AdminDashboard setTitle={setTitle} darkMode={darkMode} />
//                       ) : (
//                         <UserDashboard setTitle={setTitle} darkMode={darkMode} />
//                       )
//                     } 
//                   />

//                   {/* Attendance Routes */}
//                   <Route 
//                     path="/attendance" 
//                     element={
//                       user.role === 'admin' ? (
//                         <AdminAttendance setTitle={setTitle} />
//                       ) : (
//                         <UserAttendance setTitle={setTitle} />
//                       )
//                     } 
//                   />

//                   {/* Leave Routes */}
//                   <Route 
//                     path="/leave" 
//                     element={
//                       user.role === 'admin' ? (
//                         <AdminLeave setTitle={setTitle} />
//                       ) : (
//                         <UserLeave setTitle={setTitle} />
//                       )
//                     } 
//                   />

//                   {/* Manage Employees Route - Admin Only */}
//                   {user.role === 'admin' && (
//                     <Route 
//                       path="/employees" 
//                       element={<ManageEmployees setTitle={setTitle} />} 
//                     />
//                   )}

//                   {/* Redirect to dashboard if already logged in */}
//                   <Route path="/login" element={<Navigate to="/" replace />} />
                  
//                   {/* Catch all - redirect to dashboard */}
//                   <Route path="*" element={<Navigate to="/" replace />} />
//                 </Routes>
//               </main>
//             </div>

//             {/* Change Password Modal */}
//             {showChangePassword && (
//               <ChangePassword onClose={() => setShowChangePassword(false)} />
//             )}
//           </>
//         ) : (
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="*" element={<Navigate to="/login" replace />} />
//           </Routes>
//         )}
//       </div>
//     </AuthContextProvider>
//   )
// }

// export default App














// import { useEffect, useState } from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import Slidebar from './components/layout/Slidebar'
// import Header from './components/layout/Header'
// import Login from './pages/Auth/Login.jsx'
// import { AuthContextProvider } from './context'
// import { AdminDashboard, UserDashboard } from './pages/Dashboard/index'
// import { AdminAttendance, UserAttendance } from './pages/Attendance/index'
// import { AdminLeave, UserLeave } from './pages/Leave/index'
// import ManageEmployees from './components/layout/ManageEmployees.jsx'

// function App() {
//   const [isOpen, setIsOpen]   = useState(false)
//   const [title, setTitle]     = useState('Dashboard')
//   const [user, setUser]       = useState(null)
//   const [darkMode, setDarkMode] = useState(false)

//   const handleSlidebar = () => setIsOpen(prev => !prev)

//   useEffect(() => {
//     const stored = localStorage.getItem('user')
//     if (stored) 
//       {
//         setUser(JSON.parse(stored))
//       }
//   }, [])

//   const handleLogin = (userData) => {
//     localStorage.setItem('user', JSON.stringify(userData))
//     setUser(userData)
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('user')
//     setUser(null)
//   }

//   const toggleDarkMode = () => setDarkMode(prev => !prev)

//   useEffect(() => {
//     const html = document.documentElement
//     darkMode ? html.classList.add('dark') : html.classList.remove('dark')
//   }, [darkMode])

//   return (
//     <AuthContextProvider value={{ user, handleLogin, handleLogout }}>
//       <div className="flex h-screen overflow-hidden">
//         {user ? (
//           <>
//             {/* Sidebar — shows Manage Employees link only for admin */}
//             <Slidebar
//               isOpen={isOpen}
//               handleSlidebar={handleSlidebar}
//               userEmail={user.email  || ''}
//               userName={user.name    || ''}
//               userRole={user.role}
//               onLogout={handleLogout}
//             />

//             <div className="flex-1 flex flex-col overflow-hidden">
//               <Header
//                 title={title}
//                 handleSlidebar={handleSlidebar}
//                 darkMode={darkMode}
//                 toggleDarkMode={toggleDarkMode}
//               />

//               <main className="pt-16 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900 flex-1 overflow-y-auto">
//                 <Routes>
//                   {/* Dashboard */}
//                   <Route
//                     path="/"
//                     element={
//                       user.role === 'admin'
//                         ? <AdminDashboard setTitle={setTitle} darkMode={darkMode} />
//                         : <UserDashboard  setTitle={setTitle} darkMode={darkMode} />
//                     }
//                   />

//                   {/* Attendance */}
//                   <Route
//                     path="/attendance"
//                     element={
//                       user.role === 'admin'
//                         ? <AdminAttendance setTitle={setTitle} />
//                         : <UserAttendance  setTitle={setTitle} />
//                     }
//                   />

//                   {/* Leave */}
//                   <Route
//                     path="/leave"
//                     element={
//                       user.role === 'admin'
//                         ? <AdminLeave setTitle={setTitle} />
//                         : <UserLeave  setTitle={setTitle} />
//                     }
//                   />

//                   {/* Manage Employees — admin only */}
//                   {user.role === 'admin' && (
//                     <Route
//                       path="/employees"
//                       element={<ManageEmployees setTitle={setTitle} />}
//                     />
//                   )}

//                   {/* Auth redirects */}
//                   <Route path="/login" element={<Navigate to="/"      replace />} />
//                   <Route path="*"      element={<Navigate to="/"      replace />} />
//                 </Routes>
//               </main>
//             </div>
//           </>
//         ) : (
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="*"     element={<Navigate to="/login" replace />} />
//           </Routes>
//         )}
//       </div>
//     </AuthContextProvider>
//   )
// }

// export default App












// import { useEffect, useState } from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import Slidebar from './components/layout/Slidebar'
// import Header from './components/layout/Header'
// import Login from './pages/Auth/Login.jsx'
// import { AuthContextProvider } from './context'
// import { AdminDashboard, UserDashboard } from './pages/Dashboard/index'
// import { AdminAttendance, UserAttendance } from './pages/Attendance/index'
// import { AdminLeave, UserLeave } from './pages/Leave/index'
// import ManageEmployees from './components/layout/ManageEmployees'

// function App() {
//   const [isOpen, setIsOpen]   = useState(false)
//   const [title, setTitle]     = useState('Dashboard')
//   const [user, setUser]       = useState(null)
//   const [darkMode, setDarkMode] = useState(false)

//   const handleSlidebar = () => setIsOpen(prev => !prev)

//   useEffect(() => {
//     const stored = localStorage.getItem('user')
//     if (stored) setUser(JSON.parse(stored))
//   }, [])

//   const handleLogin = (userData) => {
//     localStorage.setItem('user', JSON.stringify(userData))
//     setUser(userData)
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('user')
//     setUser(null)
//   }

//   const toggleDarkMode = () => setDarkMode(prev => !prev)

//   useEffect(() => {
//     const html = document.documentElement
//     darkMode ? html.classList.add('dark') : html.classList.remove('dark')
//   }, [darkMode])

//   return (
//     <AuthContextProvider value={{ user, handleLogin, handleLogout }}>
//       <div className="flex h-screen overflow-hidden ">
//         {user ? (
//           <>
//             {/* Sidebar — shows Manage Employees link only for admin */}
//             <Slidebar
//               isOpen={isOpen}
//               handleSlidebar={handleSlidebar}
//               userEmail={user.email  || ''}
//               userName={user.name    || ''}
//               userRole={user.role}
//               onLogout={handleLogout}
//             />

//             <div className="flex-1 flex flex-col overflow-hidden">
//               <Header
//                 title={title}
//                 handleSlidebar={handleSlidebar}
//                 isAdmin={user.role === 'admin'}
//                 darkMode={darkMode}
//                 toggleDarkMode={toggleDarkMode}
//               />

//               <main className="pt-16 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900 flex-1 overflow-y-auto">
//                 <Routes>
//                   {/* Dashboard */}
//                   <Route
//                     path="/"
//                     element={
//                       user.role === 'admin'
//                         ? <AdminDashboard setTitle={setTitle} darkMode={darkMode} />
//                         : <UserDashboard  setTitle={setTitle} darkMode={darkMode} />
//                     }
//                   />

//                   {/* Attendance */}
//                   <Route
//                     path="/attendance"
//                     element={
//                       user.role === 'admin'
//                         ? <AdminAttendance setTitle={setTitle} />
//                         : <UserAttendance  setTitle={setTitle} />
//                     }
//                   />

//                   {/* Leave */}
//                   <Route
//                     path="/leave"
//                     element={
//                       user.role === 'admin'
//                         ? <AdminLeave setTitle={setTitle} />
//                         : <UserLeave  setTitle={setTitle} />
//                     }
//                   />

//                   {/* Manage Employees — admin only */}
//                   {user.role === 'admin' && (
//                     <Route
//                       path="/employees"
//                       element={<ManageEmployees setTitle={setTitle} />}
//                     />
//                   )}

//                   {/* Auth redirects */}
//                   <Route path="/login" element={<Navigate to="/"      replace />} />
//                   <Route path="*"      element={<Navigate to="/"      replace />} />
//                 </Routes>
//               </main>
//             </div>
//           </>
//         ) : (
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="*"     element={<Navigate to="/login" replace />} />
//           </Routes>
//         )}
//       </div>
//     </AuthContextProvider>
//   )
// }

// export default App














// import { useEffect, useState } from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// import Slidebar from './components/layout/Slidebar'
// import Header from './components/layout/Header'
// import Login from './pages/Auth/Login.jsx'
// import { AuthContextProvider } from './context'
// import { AdminDashboard, UserDashboard } from './pages/Dashboard/index'
// import { AdminAttendance, UserAttendance } from './pages/Attendance/index'
// import { AdminLeave, UserLeave } from './pages/Leave/index'
// import ManageEmployees from './components/layout/ManageEmployees'

// function App() {
//   const [isOpen, setIsOpen]     = useState(false)
//   const [title, setTitle]       = useState('Dashboard')
//   const [user, setUser]         = useState(null)
//   const [darkMode, setDarkMode] = useState(false)

//   const handleSlidebar = () => setIsOpen(prev => !prev)

//   useEffect(() => {
//     const stored = localStorage.getItem('user')
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     if (stored) setUser(JSON.parse(stored))
//   }, [])

//   const handleLogin = (userData) => {
//     localStorage.setItem('user', JSON.stringify(userData))
//     setUser(userData)
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('user')
//     setUser(null)
//   }

//   const toggleDarkMode = () => setDarkMode(prev => !prev)

//   useEffect(() => {
//     const html = document.documentElement
//     darkMode ? html.classList.add('dark') : html.classList.remove('dark')
//   }, [darkMode])

//   return (
//     <AuthContextProvider value={{ user, handleLogin, handleLogout }}>
//       {/* Global Toast Container */}
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         pauseOnHover
//         draggable
//         theme={darkMode ? 'dark' : 'light'}
//       />

//       <div className="flex h-screen overflow-hidden">
//         {user ? (
//           <>
//             <Slidebar
//               isOpen={isOpen}
//               handleSlidebar={handleSlidebar}
//               userEmail={user.email  || ''}
//               userName={user.name    || ''}
//               userRole={user.role}
//               onLogout={handleLogout}
//             />

//             <div className="flex-1 flex flex-col overflow-hidden">
//               <Header
//                 title={title}
//                 handleSlidebar={handleSlidebar}
//                 isAdmin={user.role === 'admin'}
//                 darkMode={darkMode}
//                 toggleDarkMode={toggleDarkMode}
//               />

//               <main className="pt-16 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900 flex-1 overflow-y-auto">
//                 <Routes>
//                   {/* Dashboard */}
//                   <Route
//                     path="/"
//                     element={
//                       user.role === 'admin'
//                         ? <AdminDashboard setTitle={setTitle} darkMode={darkMode} />
//                         : <UserDashboard  setTitle={setTitle} darkMode={darkMode} />
//                     }
//                   />

//                   {/* Attendance */}
//                   <Route
//                     path="/attendance"
//                     element={
//                       user.role === 'admin'
//                         ? <AdminAttendance setTitle={setTitle} />
//                         : <UserAttendance  setTitle={setTitle} />
//                     }
//                   />

//                   {/* Leave */}
//                   <Route
//                     path="/leave"
//                     element={
//                       user.role === 'admin'
//                         ? <AdminLeave setTitle={setTitle} />
//                         : <UserLeave  setTitle={setTitle} />
//                     }
//                   />

//                   {/* Manage Employees — admin only */}
//                   {user.role === 'admin' && (
//                     <Route
//                       path="/employees"
//                       element={<ManageEmployees setTitle={setTitle} />}
//                     />
//                   )}

//                   {/* Auth redirects */}
//                   <Route path="/login" element={<Navigate to="/"      replace />} />
//                   <Route path="*"      element={<Navigate to="/"      replace />} />
//                 </Routes>
//               </main>
//             </div>
//           </>
//         ) : (
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="*"     element={<Navigate to="/login" replace />} />
//           </Routes>
//         )}
//       </div>
//     </AuthContextProvider>
//   )
// }

// export default App



















import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Slidebar from './components/layout/Slidebar'
import Header from './components/layout/Header'
import Login from './pages/Auth/Login.jsx'
import { AuthContextProvider } from './context'
import { AdminDashboard, UserDashboard } from './pages/Dashboard/index'
import { AdminAttendance, UserAttendance } from './pages/Attendance/index'
import { AdminLeave, UserLeave } from './pages/Leave/index'
import ManageEmployees from './components/layout/ManageEmployees'

function App() {
  const [isOpen, setIsOpen]     = useState(false)
  const [title, setTitle]       = useState('Dashboard')
  const [user, setUser]         = useState(null)
  const [darkMode, setDarkMode] = useState(false)

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

  const toggleDarkMode = () => setDarkMode(prev => !prev)

  useEffect(() => {
    const html = document.documentElement
    darkMode ? html.classList.add('dark') : html.classList.remove('dark')
  }, [darkMode])

  return (
    <AuthContextProvider value={{ user, handleLogin, handleLogout }}>
      {/* Global Toast Container — always mounted so Login/Logout toasts work */}
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
              userEmail={user.email  || ''}
              userName={user.name    || ''}
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
                        : <UserDashboard  setTitle={setTitle} darkMode={darkMode} />
                    }
                  />

                  {/* Attendance */}
                  <Route
                    path="/attendance"
                    element={
                      user.role === 'admin'
                        ? <AdminAttendance setTitle={setTitle} />
                        : <UserAttendance  setTitle={setTitle} />
                    }
                  />

                  {/* Leave */}
                  <Route
                    path="/leave"
                    element={
                      user.role === 'admin'
                        ? <AdminLeave setTitle={setTitle} />
                        : <UserLeave  setTitle={setTitle} />
                    }
                  />

                  {/* Manage Employees — admin only */}
                  {user.role === 'admin' && (
                    <Route
                      path="/employees"
                      element={<ManageEmployees setTitle={setTitle} />}
                    />
                  )}

                  {/* Auth redirects */}
                  <Route path="/login" element={<Navigate to="/"      replace />} />
                  <Route path="*"      element={<Navigate to="/"      replace />} />
                </Routes>
              </main>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*"     element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </div>
    </AuthContextProvider>
  )
}

export default App