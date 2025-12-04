import { createContext, useState } from "react";



export const AppContext = createContext()

export const AppContextProvider = ({children})=>{
  const [login,setLogin] = useState(false)
  const [createSession,setCreateSession] = useState(false)
    const  value = {
        login,setLogin,
        createSession,setCreateSession
        
    }
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>

    )

}