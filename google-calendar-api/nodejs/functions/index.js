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

    const serviceAccount = req.get('x-sa');
    const calendarId = req.get('x-calendar-id');
    const appointment = safalyParse(req.body);

    if (!serviceAccount) {
        throw new Error('No service account informed.');
    }

    if (!calendarId) {
        throw new Error('No calendar ID informed.');
    }

    if (!appointment) {
        throw new Error('No appointment informed.');
    }

    // Set up Google Calendar Service account credentials
    const serviceAccountAuth = new google.auth.JWT({
        email: serviceAccount.client_email,
        key: serviceAccount.private_key,
        scopes: 'https://www.googleapis.com/auth/calendar'
    });

    const options = {
        serviceAccountAuth,
        calendarId
    };

    console.log(appointment);

    createCalendarEvent(appointment, options).then(() => {
        res.status(200).send({
            "message": "Ok, let me see if we can fit you in. is fine!."
        });
    }).catch(() => {
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
function createCalendarEvent(appointment, options) {

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
            timeMin: startAt.toISOString(),
            timeMax: endAt.toISOString()
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