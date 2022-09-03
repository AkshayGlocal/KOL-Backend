import { createContext,useState } from "react";

export const KolIdContext = createContext({
    kol_id:'',
    setkolIdHandler:()=>{}
})

export function KolIdProvider(props){
    const [kol_id,setkolId] = useState();

    function setkolIdHandler(kolidprop){
        setkolId(kolidprop);
    }
    const context ={
        kol_id:kol_id,
        setkolIdHandler:setkolIdHandler
    }

    return <KolIdContext.Provider value={context}>
        {props.children}
    </KolIdContext.Provider>
}
