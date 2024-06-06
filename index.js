const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Ensure this file is included in your deployment package (ROOT FOLDER)

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://YOUR-FIREBASE-DB-PATH-URL.firebaseio.com'
    });
}

exports.handler = async(event) => {
    let payload;
    try {
        payload = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ error: 'Invalid JSON' }),
        };
    }

    const { data, title, body, topic } = payload;

    if (!topic) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ error: 'Invalid request, topic is required' }),
        };
    }

    const message = {
        notification: {
            title: title || 'Hello!',
            body: body || 'This is a notification from Firebase!'
        },
        data: data || {},
        topic: topic
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ message: 'Notification sent successfully', response }),
        };
    } catch (error) {
        console.error('Error sending message:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ error: 'Error sending message', details: error }),
        };
    }
};
