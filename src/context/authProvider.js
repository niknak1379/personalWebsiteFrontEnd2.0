import { createContext, useContext, useState } from "react";
const AuthConext = createContext({})

export const AuthProvider = ({ children }) => {
    const [accessToken, setToken] = useState(null)
    const [trust, setTrust] = useState(JSON.parse(localStorage.getItem('trust')) || false) //to decide wether this device is trusted or not
    
    console.log('context being created')
    return (
        <AuthConext.Provider value={{accessToken, setToken, trust, setTrust}}>
            {children}
        </AuthConext.Provider>
    )
}

export default AuthConext;