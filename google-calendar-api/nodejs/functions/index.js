const functions = require('firebase-functions');
const {
    google
} = require('googleapis');


const calendar = google.calendar('v3');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.createEvent = functions.https.onRequest((req, res) => {

    const privateKey = req.get('x-private-key');
    const clientEmail = req.get('x-client-email');
    const calendarId = req.get('x-calendar-id');
    const appointment = safalyParse(req.body);


    console.log(privateKey);

    // console.log(`privateKey: ${privateKey}`);
    // console.log(`clientEmail: ${clientEmail}`);
    // console.log(`calendarId: ${calendarId}`);

    if (!privateKey) {
        res.status(409).send({
            "message": "No privateKey informed."
        });
    }

    if (!clientEmail) {
        res.status(409).send({
            "message": "No clientEmail informed."
        });
    }

    if (!calendarId) {
        res.status(409).send({
            "message": "No calendar ID informed."
        });
    }

    if (!appointment) {
        res.status(409).send({
            "message": "No appointment informed."
        });
    }

    // Set up Google Calendar Service account credentials
    const serviceAccountAuth = new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: 'https://www.googleapis.com/auth/calendar'
    });

    const options = {
        serviceAccountAuth,
        calendarId
    };

    createCalendarEvent(appointment, options).then(() => {
        res.status(200).send({
            "message": "Ok, let me see if we can fit you in. is fine!."
        });
    }).catch((err) => {
        console.log(err);
        res.status(409).send({
            "message": "I'm sorry, there are no slots available for."
        });
    });
});

/**
 * 
 * @param {*} content 
 */
const safalyParse = content => {
    return JSON.parse(JSON.stringify(content));
};

/**
 * Creates a event if have no conflict.
 * 
 * @param {*} appointment 
 * @param {*} options 
 */
const createCalendarEvent = (appointment, options) => {

    const {
        startAt,
        endAt,
        summary,
        description
    } = appointment;

    const {
        serviceAccountAuth,
        calendarId
    } = options;

    return new Promise((resolve, reject) => {
        calendar.events.list({
            auth: serviceAccountAuth,
            calendarId: calendarId,
            timeMin: new Date(startAt).toISOString(),
            timeMax: new Date(endAt).toISOString()
        }, (err, calendarResponse) => {
            // Check if there is a event already on the Calendar
            if (err || calendarResponse.data.items.length > 0) {
                reject(err || new Error('Requested time conflicts with another appointment'));
            } else {
                // Create event for the requested time period
                calendar.events.insert({
                    auth: serviceAccountAuth,
                    calendarId: calendarId,
                    resource: {
                        summary,
                        description,
                        start: {
                            dateTime: startAt
                        },
                        end: {
                            dateTime: endAt
                        }
                    }
                }, (err, event) => {
                    err ? reject(err) : resolve(event);
                });
            }
        });
    });
}