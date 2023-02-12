// import axios from './axiosFirebase';
var admin = require("firebase-admin");
var serviceAccount = require("../../service-account.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

async function sendMessage(body) {
    return await axios.post('https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send', body, { timeout: 8000 });
}

async function getAccessToken() {
    // Add the public key generated from the console here.
    const token = 'esED3tO1wqU2E9KtOniDNW:APA91bGkoByz4NnDF-8ueLEWPh-44pLVC0TJanI4b5110iUTx5zerbkLRqwaT9W8-WrnE3ziij9noHH3gG6mTTEXkCzcO3fSnVnNgJendMeAkyTMWJi2JLtBw-hlmPbtrwH87wVkVJ7f'
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
    const r = await admin.messaging().send(data.message);
    return 'ss'
}

module.exports = {
    sendMessage, getAccessToken
}