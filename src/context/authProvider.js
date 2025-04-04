import { createContext, useContext, useState } from "react";
const AuthConext = createContext({})

export const AuthProvider = ({ children }) => {
    const [accessToken, setToken] = useState(2)
    
    
    console.log('context being created')
    return (
        <AuthConext.Provider value={{accessToken, setToken}}>
            {children}
        </AuthConext.Provider>
    )
}

export default AuthConext;