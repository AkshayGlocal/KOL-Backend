import { createContext,useState } from "react";

export const ProfessionalContext = createContext({
    professional:0,
    setProfessionalHandler:()=>{}
})

export function ProfessionalProvider(props){
    const [professional,setProfessional] = useState(0);

    function setProfessionalHandler(Professionalcount){
        setProfessional(Professionalcount);
    }
    const context ={
        professional:professional,
        setProfessionalHandler:setProfessionalHandler
    }

    return <ProfessionalContext.Provider value={context}>
        {props.children}
    </ProfessionalContext.Provider>


}




