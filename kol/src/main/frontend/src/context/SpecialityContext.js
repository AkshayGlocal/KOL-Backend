import { createContext,useState } from "react";

export const SpecialityContext = createContext({
    Speciality:'',
    setSpecialityHandler:()=>{}
})

export function SpecialityProvider(props){
    const [Speciality,setSpeciality] = useState();

    function setSpecialityHandler(Specialitycount){
        setSpeciality(Specialitycount);
    }
    const context ={
        Speciality:Speciality,
        setSpecialityHandler:setSpecialityHandler
    }

    return <SpecialityContext.Provider value={context}>
        {props.children}
    </SpecialityContext.Provider>


}




