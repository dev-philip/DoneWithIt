import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';


import expoPushTokensApi from '../api/expoPushTokens';


export default useNotifications = (notificationListenerFunc) => {

    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotifications();

        if(notificationListenerFunc){
            // notificationListener.current = Notifications.addNotificationReceivedListener(notificationListenerFunc);
            responseListener.current = Notifications.addNotificationResponseReceivedListener(notificationListenerFunc);
        } 

    }, []);


    const registerForPushNotifications = async () => {

        try {
         const { status: existingStatus } = await Notifications.getPermissionsAsync();
         let finalStatus = existingStatus;
         if (existingStatus !== 'granted') {
           const { status } = await Notifications.requestPermissionsAsync();
           finalStatus = status;
         }
         if (finalStatus !== 'granted') {
           alert('Failed to get push token for push notification!');
           return;
         }
 
         const token = (await Notifications.getExpoPushTokenAsync()).data;
         console.log(token);
         expoPushTokensApi.register(token);
         
        } catch (error) {
         console.log('Error getting a push token', error);
        }
    
     }
}