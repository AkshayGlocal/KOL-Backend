import { createContext,useState } from "react";

export const ConferenceContext = createContext({
    Conference:0,
    setConferenceHandler:()=>{}
})

export function ConferenceProvider(props){
    const [Conference,setConference] = useState(0);

    function setConferenceHandler(Conferencecount){
        setConference(Conferencecount);
    }
    const context ={
        Conference:Conference,
        setConferenceHandler:setConferenceHandler
    }

    return <ConferenceContext.Provider value={context}>
        {props.children}
    </ConferenceContext.Provider>


}




