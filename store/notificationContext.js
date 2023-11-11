import { createContext, useState } from "react";


const NotificationContext = createContext({
  notification: null,
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export function NotificationContextProvider({children}){
    const [activeNotification, setActiveNotification] = useState();

    function handleShowNotification(notificationData){
        setActiveNotification(notificationData);
    }

    function handleHideNotification(){
        setActiveNotification(null);
    }

    const context = {notification: activeNotification, showNotification: handleShowNotification, hideNotification: handleHideNotification}
    return <NotificationContext.Provider value={context}>{children}</NotificationContext.Provider>
}

export default NotificationContext;