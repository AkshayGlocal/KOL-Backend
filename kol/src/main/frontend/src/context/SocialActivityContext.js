import { createContext,useState } from "react";

export const SocialActivityContext = createContext({
    SocialActivity:0,
    setSocialActivityHandler:()=>{}
})

export function SocialActivityProvider(props){
    const [SocialActivity,setSocialActivity] = useState(0);

    function setSocialActivityHandler(SocialActivitycount){
        setSocialActivity(SocialActivitycount);
    }
    const context ={
        SocialActivity:SocialActivity,
        setSocialActivityHandler:setSocialActivityHandler
    }

    return <SocialActivityContext.Provider value={context}>
        {props.children}
    </SocialActivityContext.Provider>


}




