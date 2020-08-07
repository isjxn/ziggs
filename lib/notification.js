const logger = require('./log');
const admin = require("firebase-admin");
const serviceAccount = require("../firebase.json");

class NotificationManager {
    constructor() {
        logger.log('started..', 'NotificationManager');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://nanologicmanager.firebaseio.com"
        });
    }

    sendNotification(title, body) {
        const message = {
            data: {
              title: title,
              message: body
            },
            topic: 'default'
        };

        admin.messaging().send(message)
        .then((response) => {
            logger.log(`Successfully sent notification: ${response}`, 'NotificationManager');
        })
        .catch((error) => {
            logger.log(`Error: ${error}`, 'Notificationmanager');
        });
    }
}

module.exports = new NotificationManager();