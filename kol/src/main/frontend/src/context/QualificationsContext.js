import { createContext,useState } from "react";

export const QualificationsContext = createContext({
    Qualifications:0,
    setQualificationsHandler:()=>{}
})

export function QualificationsProvider(props){
    const [Qualifications,setQualifications] = useState(0);

    function setQualificationsHandler(Qualificationscount){
        setQualifications(Qualificationscount);
    }
    const context ={
        Qualifications:Qualifications,
        setQualificationsHandler:setQualificationsHandler
    }

    return <QualificationsContext.Provider value={context}>
        {props.children}
    </QualificationsContext.Provider>


}




