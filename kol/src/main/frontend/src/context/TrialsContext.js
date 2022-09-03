import { createContext,useState } from "react";

export const TrailsContext = createContext({
    Trails:0,
    setTrailsHandler:()=>{}
})

export function TrailsProvider(props){
    const [Trails,setTrails] = useState(0);

    function setTrailsHandler(Trailscount){
        setTrails(Trailscount);
    }
    const context ={
        Trails:Trails,
        setTrailsHandler:setTrailsHandler
    }

    return <TrailsContext.Provider value={context}>
        {props.children}
    </TrailsContext.Provider>


}




