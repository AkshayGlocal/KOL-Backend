import { createContext,useState } from "react";

export const PublicationsContext = createContext({
    Publications:0,
    setPublicationsHandler:()=>{}
})

export function PublicationsProvider(props){
    const [Publications,setPublications] = useState(0);

    function setPublicationsHandler(Publicationscount){
        setPublications(Publicationscount);
    }
    const context ={
        Publications:Publications,
        setPublicationsHandler:setPublicationsHandler
    }

    return <PublicationsContext.Provider value={context}>
        {props.children}
    </PublicationsContext.Provider>


}




