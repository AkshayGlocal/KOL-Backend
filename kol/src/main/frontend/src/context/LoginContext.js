import { createContext,useState } from "react";

export const UserRoleContext = createContext({
    username:'',
    setuserNameHandler:()=>{}
})

export function LoginContextProvider(props){
    const [userName,setuserName] = useState();

    function setuserNameHandler(usernameprop){
        setuserName(usernameprop);
    }
    const context ={
        username:userName,
        setuserNameHandler:setuserNameHandler
    }

    return <UserRoleContext.Provider value={context}>
        {props.children}
    </UserRoleContext.Provider>


}




