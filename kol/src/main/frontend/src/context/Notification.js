import { createContext,useState } from "react";

export const NotificationContext = createContext({
    Notification:{},
    setNotificationHandler:()=>{}
})

export function NotificationProvider(props){
    const [Notification,setNotification] = useState({});

    function setNotificationHandler(Notificationcount){
        setNotification(Notificationcount);
    }
    const context ={
        Notification:Notification,
        setNotificationHandler:setNotificationHandler
    }

    return <NotificationContext.Provider value={context}>
        {props.children}
    </NotificationContext.Provider>


}




