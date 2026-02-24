import { useContext } from 'react'
import {createContext} from 'react'


export const AuthContext = createContext({

    id : {id},
    login : {user.id},
    logout : {}

})




export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvide = AuthContext.Provider;