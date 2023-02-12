// import { initializeApp } from "firebase/app";
// import { getMessaging, onMessage } from "firebase/messaging/sw";


// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// const firebaseApp = initializeApp({
//     apiKey: "AIzaSyBLwUET9Ps-ZLH-W0Fky1sXCoX87L69ZTc",
//     authDomain: "testabc-a43d1.firebaseapp.com",
//     projectId: "testabc-a43d1",
//     storageBucket: "testabc-a43d1.appspot.com",
//     messagingSenderId: "827301614113",
//     appId: "1:827301614113:web:30894371cb045db8150960",
//     measurementId: "G-LJCMECPW7B"
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = getMessaging(firebaseApp);
// onMessage(messaging, (payload) => {
//     console.log('Message received. ', payload);
//     // ...
// });