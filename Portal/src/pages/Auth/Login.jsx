// import React, { useState } from 'react'
// import { CgProfile } from 'react-icons/cg'
// import { useNavigate } from 'react-router';
// import { mockUsersData } from '../../data/mockUsersData';
// import { useAuthContext } from '../../context';
// function Login({onLogin}) {
//   const [Email, setEmail] = useState('')
//   const [Password, setPassword] = useState('')
//   const [error,setError] = useState(null);
//   // const [FullName, setFullName] = useState('')

//    const  {Login} = useAuthContext();
//   const handleLogin = (e) => {
//     e.preventDefault()
//     setError('');

//     const foundUser = mockUsersData.find((e) => e.email === Email && e.password === Password);

//     if(foundUser)
//     {
//       Login()
//     }
//   }

//   const navigate = useNavigate();

//   return (
//     <div className='flex items-center bg-[#2C5282] justify-center min-h-screen p-4 bg-neutral-secondary-light'>
//       <div className='w-full max-w-xs sm:max-w-sm border border-default-medium rounded-lg sm:rounded-xl shadow-lg bg-white p-6 sm:p-8'>
//         <div className="text-center mb-6 sm:mb-8">
//           <div className="mb-4">
//             <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#2C5282] mb-3">
//               <CgProfile size={50} className="text-white" />
//             </div>
//             <h1 className="text-xl sm:text-2xl font-bold text-heading mb-2">
//               Employee Portal
//             </h1>
//             <p className="text-xs sm:text-sm text-body">
//               Sign in to access your dashboard
//             </p>
//           </div>
//         </div>

//         <form onSubmit={handleLogin}>
//           {/* <div className="mb-4 sm:mb-5">
//             <label htmlFor="fullname" className="block mb-2 sm:mb-2.5 text-xs sm:text-sm font-bold text-heading">Full Name</label>
//             <input 
//               type="text" 
//               value={FullName}
//               onChange={(e) => setFullName(e.target.value)}
//               id="fullname" 
//               className="bg-neutral-secondary-medium border border-default-medium text-heading text-xs sm:text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 sm:py-2.5 shadow-xs placeholder:text-body outline-none" 
//               placeholder="Full Name" 
//               required />
//           </div> */}

//           <div className="mb-4 sm:mb-5">
//             <label htmlFor="email" className="block mb-2 sm:mb-2.5 text-xs sm:text-sm font-bold text-heading">Email</label>
//             <input 
//               type="email" 
//               value={Email}
//               onChange={(e) => setEmail(e.target.value)}
//               id="email" 
//               className="bg-neutral-secondary-medium border border-neutral-400 text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" 
//               placeholder="employee@company.com" 
//               required />
//           </div>

//           <div className="mb-4 sm:mb-5">
//             <label htmlFor="password" className="block mb-2 sm:mb-2.5 text-xs sm:text-sm font-bold text-heading">Password</label>
//             <input 
//               type="password" 
//               value={Password}
//               onChange={(e) => setPassword(e.target.value)}
//               id="password" 
//               className="bg-neutral-secondary-medium border border-neutral-400 text-heading text-xs sm:text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 sm:py-2.5 shadow-xs placeholder:text-body" 
//               placeholder="••••••••" 
//               required/>
//           </div>

//           <button 
//             type="submit" 
//             className="w-full cursor-pointer hover:bg-[#2C520] text-white bg-[#2C5282] box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-xs sm:text-sm px-4 py-2.5 sm:py-2.5 focus:outline-none transition-colors duration-200">
//             Access Portal
//           </button>
//         </form>

//         <div className="mt-6 text-center space-y-3">
//           <a href="#" className="block text-xs sm:text-sm text-brand hover:text-brand-strong transition-colors duration-200">
//             Forgot employee <span className='text-blue-700 hover:underline'>password?</span>
//           </a>
//         </div>

//         <div className="mt-8 pt-6 border-t border-default-medium">
//           <p className="text-xs text-center text-body">
//             &copy; {new Date().getFullYear()} Company Name. Employee Portal v2.0
//           </p>
//           <p className="text-xs text-center text-body mt-1">
//             For authorized personnel only
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login






















// import React, { useState } from 'react'
// import { CgProfile } from 'react-icons/cg'
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'
// import { useAuthContext } from '../../context';
// import ChangePassword from './ChangePassword';

// function Login() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('');
//   const [loading, setloading] = useState(false);
//   const [showChangePassword, setShowChangePassword] = useState(false);

//   const { handleLogin } = useAuthContext();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError('');
//     setloading(true);

//     try{
//       const response = await axios.post('http://localhost:3000/api/auth/login',{email,password},{withCredentials : true})

//       // response.data.user = { id, email, role }
//       handleLogin(response.data.user);
//       navigate('/dashboard')

//     }catch(error)
//     {
//       setError(error.response?.data?.message || 'Invalid email or password')
//     }
//     finally{
//       setloading(false)
//     }

//   }

//   return (
//     <div className='flex items-center bg-[#2C5282] justify-center w-full min-h-screen p-4 bg-neutral-secondary-light'>
//       <div className='w-full max-w-xs sm:max-w-sm border border-default-medium rounded-lg sm:rounded-xl shadow-lg bg-white p-6 sm:p-8'>
//         <div className="text-center mb-6 sm:mb-8">
//           <div className="mb-4">
//             <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#2C5282] mb-3">
//               <CgProfile size={50} className="text-white" />
//             </div>
//             <h1 className="text-xl sm:text-2xl font-bold text-heading mb-2">
//               Employee Portal
//             </h1>
//             <p className="text-xs sm:text-sm text-body">
//               Sign in to access your dashboard
//             </p>
//           </div>
//         </div>

//         {error && (
//           <p className='text-red-500 text-center mb-4 font-medium'>
//             {error}
//           </p>)}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4 sm:mb-5">
//             <label htmlFor="email" className="block mb-2 sm:mb-2.5 text-xs sm:text-sm font-bold text-heading">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               id="email"
//               className="bg-neutral-secondary-medium border border-gray-400 outline-none text-heading text-sm rounded-base  block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
//               placeholder="employee@gmail.com"

//               required />
//           </div>

//           <div className="mb-4 sm:mb-5">
//             <label htmlFor="password" className="block mb-2 sm:mb-2.5 text-xs sm:text-sm font-bold text-heading">Password</label>
//             {/* <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               id="password"
//               className="bg-neutral-secondary-medium border border-gray-50 outline text-heading text-xs sm:text-sm rounded-base block w-full px-3 py-2.5 sm:py-2.5 shadow-xs placeholder:text-body"
//               placeholder="••••••••"
//               required /> */}
//               <input
//   type="password"
//   value={password}
//   onChange={(e) => setPassword(e.target.value)}
//   id="password"
//   className="bg-neutral-secondary-medium border border-gray-400 outline-none text-heading text-xs sm:text-sm rounded-base block w-full px-3 py-2.5 sm:py-2.5 shadow-xs placeholder:text-body"
//   placeholder="••••••••"
//   // pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
//   title="Password must contain at least 1 letter and 1 number (minimum 6 characters)"
//   required
// />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full cursor-pointer hover:bg-[#2C520] text-white bg-[#2C5282] box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-xs sm:text-sm px-4 py-2.5 sm:py-2.5 focus:outline-none transition-colors duration-200 ${loading ? "opacity-50 cursor-not-allowed" : " "}`}>

//             {loading ? 'Accessing...' : 'Access Portal'}
//           </button>
//         </form>

//         <div className="mt-6 text-center space-y-3">
//           <label className="block text-xs sm:text-sm text-body">
//             Change employee{' '}
//             <button
//               type="button"
//               onClick={() => setShowChangePassword(true)}
//               className="text-brand hover:text-brand-strong underline cursor-pointer"
//             >
//               password?
//             </button>
//           </label>
//         </div>

//         <div className="mt-8 pt-6 border-t border-default-medium">
//           <p className="text-xs text-center text-body">
//             &copy; {new Date().getFullYear()} Company Name. Employee Portal v2.0
//           </p>
//           <p className="text-xs text-center text-body mt-1">
//             For authorized personnel only
//           </p>
//         </div>
//       </div>

//       {/* Change Password Modal */}
//       {showChangePassword && (
//         <ChangePassword onClose={() => setShowChangePassword(false)} />
//       )}
//     </div>
//   )
// }

// export default Login
















// import React, { useState } from 'react'
// import { CgProfile } from 'react-icons/cg'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { useAuthContext } from '../../context'
// import ChangePassword from './ChangePassword'

// function Login() {
//   const [email, setEmail]   = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading]   = useState(false)
//   const [showChangePassword, setShowChangePassword] = useState(false)

//   const { handleLogin } = useAuthContext()
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const response = await axios.post(
//         'http://localhost:3000/api/auth/login',
//         { email, password },
//         { withCredentials: true }
//       )
//       handleLogin(response.data.user)
//       navigate('/')
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Invalid email or password')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className='flex items-center bg-[#2C5282] justify-center w-full min-h-screen p-4'>
//       <div className='w-full max-w-xs sm:max-w-sm border border-default-medium rounded-lg sm:rounded-xl shadow-lg bg-white p-6 sm:p-8'>
//         <div className="text-center mb-6 sm:mb-8">
//           <div className="mb-4">
//             <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#2C5282] mb-3">
//               <CgProfile size={50} className="text-white" />
//             </div>
//             <h1 className="text-xl sm:text-2xl font-bold text-heading mb-2">
//               Employee Portal
//             </h1>
//             <p className="text-xs sm:text-sm text-body">
//               Sign in to access your dashboard
//             </p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4 sm:mb-5">
//             <label htmlFor="email" className="block mb-2 sm:mb-2.5 text-xs sm:text-sm font-bold text-heading">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               id="email"
//               className="bg-neutral-secondary-medium border border-gray-400 outline-none text-heading text-sm rounded-base block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
//               placeholder="employee@gmail.com"
//               required
//             />
//           </div>

//           <div className="mb-4 sm:mb-5">
//             <label htmlFor="password" className="block mb-2 sm:mb-2.5 text-xs sm:text-sm font-bold text-heading">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               id="password"
//               className="bg-neutral-secondary-medium border border-gray-400 outline-none text-heading text-xs sm:text-sm rounded-base block w-full px-3 py-2.5 sm:py-2.5 shadow-xs placeholder:text-body"
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full cursor-pointer text-white bg-[#2C5282] box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-xs sm:text-sm px-4 py-2.5 sm:py-2.5 focus:outline-none transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {loading ? 'Accessing...' : 'Access Portal'}
//           </button>
//         </form>

//         <div className="mt-6 text-center space-y-3">
//           <label className="block text-xs sm:text-sm text-body">
//             Change employee{' '}
//             <button
//               type="button"
//               onClick={() => setShowChangePassword(true)}
//               className="text-brand hover:text-brand-strong underline cursor-pointer"
//             >
//               password?
//             </button>
//           </label>
//         </div>

//         <div className="mt-8 pt-6 border-t border-default-medium">
//           <p className="text-xs text-center text-body">
//             &copy; {new Date().getFullYear()} Company Name. Employee Portal v2.0
//           </p>
//           <p className="text-xs text-center text-body mt-1">
//             For authorized personnel only
//           </p>
//         </div>
//       </div>

//       {/* Change Password Modal */}
//       {showChangePassword && (
//         <ChangePassword onClose={() => setShowChangePassword(false)} />
//       )}
//     </div>
//   )
// }

// export default Login













import React, { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuthContext } from '../../context'
import ChangePassword from './ChangePassword'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)

  const { handleLogin } = useAuthContext()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        { email, password },
        { withCredentials: true }
      )
      toast.success(`Welcome back!`)
      handleLogin(response.data.user)
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex items-center bg-[#2C5282] dark:bg-gray-950 justify-center w-full min-h-screen p-4 transition-colors duration-300'>
      <div className='w-full max-w-xs sm:max-w-sm border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl shadow-lg bg-white dark:bg-gray-800 p-6 sm:p-8 transition-colors duration-300'>
        <div className="text-center mb-6 sm:mb-8">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#2C5282] dark:bg-blue-500 mb-3">
              <CgProfile size={50} className="text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Employee Portal
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Sign in to access your dashboard
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 sm:mb-5">
            <label htmlFor="email" className="block mb-2 sm:mb-2.5 text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 outline-none text-gray-900 dark:text-white text-sm rounded-lg block w-full px-3 py-2.5 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#2C5282] dark:focus:ring-blue-500 transition-colors"
              placeholder="employee@gmail.com"
              required
            />
          </div>

          <div className="mb-4 sm:mb-5">
            <label htmlFor="password" className="block mb-2 sm:mb-2.5 text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 outline-none text-gray-900 dark:text-white text-xs sm:text-sm rounded-lg block w-full px-3 py-2.5 sm:py-2.5 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#2C5282] dark:focus:ring-blue-500 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer text-white bg-[#2C5282] dark:bg-blue-600 hover:bg-[#1e3a5f] dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xs sm:text-sm px-4 py-2.5 sm:py-2.5 focus:outline-none transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Accessing...' : 'Access Portal'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <label className="block text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Change employee{' '}
            <button
              type="button"
              onClick={() => setShowChangePassword(true)}
              className="text-[#2C5282] dark:text-blue-400 hover:underline cursor-pointer"
            >
              password?
            </button>
          </label>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-center text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} Company Name. Employee Portal v2.0
          </p>
          <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-1">
            For authorized personnel only
          </p>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  )
}

export default Login