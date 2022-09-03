import { createContext,useState } from "react";

export const SocialMediaContext = createContext({
    SocialMedia:0,
    setSocialMediaHandler:()=>{}
})

export function SocialMediaProvider(props){
    const [SocialMedia,setSocialMedia] = useState(0);

    function setSocialMediaHandler(SocialMediacount){
        setSocialMedia(SocialMediacount);
    }
    const context ={
        SocialMedia:SocialMedia,
        setSocialMediaHandler:setSocialMediaHandler
    }

    return <SocialMediaContext.Provider value={context}>
        {props.children}
    </SocialMediaContext.Provider>


}




