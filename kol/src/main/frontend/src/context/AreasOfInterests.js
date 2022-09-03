import { createContext,useState } from "react";

export const AreasofInterestsContext = createContext({
    AreasofInterests:'',
    setAreasofInterestsHandler:()=>{}
})

export function AreasofInterestsProvider(props){
    const [AreasofInterests,setAreasofInterests] = useState();

    function setAreasofInterestsHandler(AreasofInterestscount){
        setAreasofInterests(AreasofInterestscount);
    }
    const context ={
        AreasofInterests:AreasofInterests,
        setAreasofInterestsHandler:setAreasofInterestsHandler
    }

    return <AreasofInterestsContext.Provider value={context}>
        {props.children}
    </AreasofInterestsContext.Provider>


}




