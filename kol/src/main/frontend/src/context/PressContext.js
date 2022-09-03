import { createContext,useState } from "react";

export const PressContext = createContext({
    press:0,
    setPressHandler:()=>{}
})

export function PressProvider(props){
    const [press,setpress] = useState(0);

    function setPressHandler(presscount){
        setpress(presscount);
    }
    const context ={
        press:press,
        setPressHandler:setPressHandler
    }

    return <PressContext.Provider value={context}>
        {props.children}
    </PressContext.Provider>


}




