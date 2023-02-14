// import axios from './axiosFirebase';
var admin = require("firebase-admin");
var serviceAccount = require("../service-account.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

async function sendMessage(body) {
    return await axios.post('https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send', body, { timeout: 8000 });
}

async function getAccessToken(token) {
    // Add the public key generated from the console here.
    const data = {
        message: {
            token: token,
            notification: {
                title: "Notification Title",
                body: "Notification Body ",
            },
            data: {
                Nick: "Mario",
                Room: "PortugalVSDenmark",
            },
        },
    };
    try {
        const r = await admin.messaging().send(data.message);
    } catch (error) {
        console.log(error)
    }
    return 'ss'
}

module.exports = {
    sendMessage, getAccessToken
}