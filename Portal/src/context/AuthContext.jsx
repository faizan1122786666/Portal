/**
 * Context: AuthContext
 * Description: Manages authentication state and provides login/logout functionality across the application.
 * Why: To centralize user session management and ensure consistent access to user data and authorization status.
 */
import { useContext, createContext } from 'react'

export const AuthContext = createContext({
  user: null,
  handleLogin: () => {},
  handleLogout: () => {}
})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = AuthContext.Provider