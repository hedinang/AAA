import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDbuiLkt2Y992Hp-wdA39nB_-SgtcU6e0o",
    authDomain: "mechanics-d2b54.firebaseapp.com",
    projectId: "mechanics-d2b54",
    storageBucket: "mechanics-d2b54.appspot.com",
    messagingSenderId: "395755035508",
    appId: "839837590443088",
    // appSecret: '9fd27eb285daf1295977673486326b44',
    measurementId: "G-V70PVMV6K2"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const google = new GoogleAuthProvider()
const facebook = new FacebookAuthProvider();
export { auth, google, facebook };