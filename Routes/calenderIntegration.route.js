const { Router } = require('express');
const dayjs = require('dayjs');
const { google } = require('googleapis');
const { v4 } = require('uuid'); // used for generate unique id;
const calenderIntegrationRoute = Router();
const calender = google.calendar({
    version: 'v3',
    auth: process.env.API_KEY
});

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

const scopes = [
    'https://www.googleapis.com/auth/calendar'
];


// /google  =>  Calendar Integration with Google Calendar
calenderIntegrationRoute.get('/google', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });
    res.redirect(url);
});

calenderIntegrationRoute.get('/google/redirect', async (req, res) => {
    const code = req.query.code;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    res.send({ msg: "You have successfully logged in" });
});

// /schedule_event => For schedule an event with google calender
calenderIntegrationRoute.get('/schedule_event', async (req, res) => {
    await calender.events.insert({
        calendarId: 'primary',
        auth: oauth2Client,
        conferenceDataVersion: 1,
        requestBody: {
            summary: 'Test Event',
            description: "Some Event that is very important",
            start: {
                dateTime: dayjs(new Date()).add(1, 'day').toISOString(),
                timeZone: 'Asia/Kolkata'
            },
            end: {
                dateTime: dayjs(new Date()).add(1, 'day').add(1, 'hour').toISOString(),
                timeZone: 'Asia/Kolkata'
            },
            conferenceData: {
                createRequest: {
                    requestId: v4()
                }
            },
            attendees: [
                {
                    email: 'pushpendra1697@gmail.com'
                }
            ]
        }
    });
    res.send({ msg: "Create an Event at Google Calender" });
});


module.exports = { calenderIntegrationRoute };