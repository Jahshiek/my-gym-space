import {initializeApp} from 'firebase/app'
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyA-4y_Zk8IVaKdDAlTVaKJ4ZZByTLAS0tY",
    authDomain: "gym-push-firebase.firebaseapp.com",
    projectId: "gym-push-firebase",
    storageBucket: "gym-push-firebase.appspot.com",
    messagingSenderId: "798985888838",
    appId: "1:798985888838:web:7c4b3042d1b717fbbfd647",
    measurementId: "G-9L79VLXENE"
  };

const firebaseApp = initializeApp(firebaseConfig)


// Initialize Firebase Cloud Messaging and get a reference to the service
// const messaging = getMessaging(firebaseApp);

// Voluntary Application Server Identification to authorize send requests to supported web push services.
const vKey = "BAdY1JDbmKRjjY_6aH911ntCJB2puL9WURt54NtQudlMkvJ6Bx23A1gSPa1uSgewQ_w9YJJTIrywlIIIv-et3fM"

/*The method getToken()allows FCM to use the VAPID key credential 
when sending message requests to different push services.*/
// getToken(messaging, {vapidKey: vKey});


// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
getToken(messaging, { vapidKey: vKey }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

//Access the registration token
