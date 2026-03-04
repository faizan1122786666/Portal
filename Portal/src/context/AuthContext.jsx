// // import { useContext } from 'react'
// // import {createContext} from 'react'


// // export const AuthContext = createContext({

// //     id : {id},
// //     login : {user.id},
// //     logout : {}

// // })




// // export const useAuthContext = () => {
// //     return useContext(AuthContext)
// // }

// // export const AuthContextProvide = AuthContext.Provider;








import { useContext } from 'react'
import {createContext} from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({
  user: null,
  handleLogin: () => {},
  handleLogout: () => {}
})

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = AuthContext.Provider








// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     try {
//       const stored = localStorage.getItem('portalUser');
//       return stored ? JSON.parse(stored) : null;
//     } catch {
//       return null;
//     }
//   });

//   // Whenever user changes, sync to localStorage
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('portalUser', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('portalUser');
//     }
//   }, [user]);

//   // Called after successful login — stores the full user object
//   const handleLogin = (userData) => {
//     // Normalize so every field is always present
//     const normalized = {
//       id:         userData.id         || userData._id || '',
//       email:      userData.email      || '',
//       role:       userData.role       || 'employee',
//       name:       userData.name       || '',
//       shift:      userData.shift      || '',
//       department: userData.department || '',
//       salary:     userData.salary     || 0,
//     };
//     setUser(normalized);
//   };

//   // Called after profile update — merge changed fields into existing user
//   const updateUser = (updatedFields) => {
//     setUser(prev => {
//       if (!prev) return prev;
//       const merged = { ...prev, ...updatedFields };
//       return merged;
//     });
//   };

//   const handleLogout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, handleLogin, handleLogout, updateUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }


// export function useAuthContext() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider');
//   return ctx;
// }

// export default AuthContext












// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext(null);

// export function AuthContextProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     try {
//       const stored = localStorage.getItem('portalUser');
//       return stored ? JSON.parse(stored) : null;
//     } catch {
//       return null;
//     }
//   });

//   // Whenever user changes, sync to localStorage
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('portalUser', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('portalUser');
//     }
//   }, [user]);

//   // Called after successful login — stores the full user object
//   const handleLogin = (userData) => {
//     // Normalize so every field is always present
//     const normalized = {
//       id:         userData.id         || userData._id || '',
//       email:      userData.email      || '',
//       role:       userData.role       || 'employee',
//       name:       userData.name       || '',
//       shift:      userData.shift      || '',
//       department: userData.department || '',
//       salary:     userData.salary     || 0,
//     };
//     setUser(normalized);
//   };

//   // Called after profile update — merge changed fields into existing user
//   const updateUser = (updatedFields) => {
//     setUser(prev => {
//       if (!prev) return prev;
//       const merged = { ...prev, ...updatedFields };
//       return merged;
//     });
//   };

//   const handleLogout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, handleLogin, handleLogout, updateUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }


// // eslint-disable-next-line react-refresh/only-export-components
// export function useAuthContext() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider');
//   return ctx;
// }

// export default AuthContext