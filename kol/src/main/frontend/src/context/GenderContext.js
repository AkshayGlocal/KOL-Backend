import { createContext,useState } from "react";

export const GenderContext = createContext({
    gender:'',
    setGenderHandler:()=>{}
})

export function GenderProvider(props){
    const [gender,setGender] = useState();

    function setGenderHandler(Genderprop){
        setGender(Genderprop);
    }
    const context ={
        gender:gender,
        setGenderHandler:setGenderHandler
    }

    return <GenderContext.Provider value={context}>
        {props.children}
    </GenderContext.Provider>
}
