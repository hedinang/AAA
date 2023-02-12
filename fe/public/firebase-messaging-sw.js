importScripts("https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.3.0/firebase-messaging.js");

// The contents of firebaseConfig can be obtained from the firebase console.
const firebaseConfig = {
    apiKey: "AIzaSyBLwUET9Ps-ZLH-W0Fky1sXCoX87L69ZTc",
    authDomain: "testabc-a43d1.firebaseapp.com",
    projectId: "testabc-a43d1",
    storageBucket: "testabc-a43d1.appspot.com",
    messagingSenderId: "827301614113",
    appId: "1:827301614113:web:30894371cb045db8150960",
    measurementId: "G-LJCMECPW7B"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// When a notification is received, the push event is called.
self.addEventListener('push', function (event) {

    console.log("event:push")
    let messageTitle = "MESSAGETITLE"
    let messageBody = "MESSAGEBODY"
    let messageTag = "MESSAGETAG"

    const notificationPromise = self.registration.showNotification(
        messageTitle,
        {
            body: messageBody,
            tag: messageTag
        });

    event.waitUntil(notificationPromise);

}, false)

// If the web application is in the background, setBackGroundMessageHandler is called.
messaging.setBackgroundMessageHandler(function (payload) {

    console.log("backgroundMessage")

    let messageTitle = "MESSAGETITLE"
    let messageBody = "MESSAGEBODY"

    return self.registration.showNotification(
        messageTitle,
        {
            body: messageBody,
            tag: messageTag
        });
});
