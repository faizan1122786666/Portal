// import { useContext } from 'react'
// import {createContext} from 'react'


// export const AuthContext = createContext({

//     id : {id},
//     login : {user.id},
//     logout : {}

// })




// export const useAuthContext = () => {
//     return useContext(AuthContext)
// }

// export const AuthContextProvide = AuthContext.Provider;








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