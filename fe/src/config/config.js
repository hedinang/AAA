import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const messaging = getMessaging(app);

const google = new GoogleAuthProvider()
const facebook = new FacebookAuthProvider();
export { auth, google, facebook, messaging };