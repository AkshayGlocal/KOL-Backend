import { createContext,useState } from "react";

export const AuthContext = createContext({
    Auth:{},
    setAuthHandler:()=>{}
})

export function AuthContextProvider(props){
    const [Auth,setAuth] = useState({});

    function setAuthHandler(auth){
        setAuth(auth);
    }
    const context ={
        Auth:Auth,
        setAuthHandler:setAuthHandler
    }

    return <AuthContext.Provider value={context}>
        {props.children}
    </AuthContext.Provider>
}
