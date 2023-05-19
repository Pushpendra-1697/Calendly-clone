const { Router } = require('express');
const EventModel = require('../Models/event.model');
const EventRouter = Router();
const jwt = require('jsonwebtoken');


//end points: "/events" for creating any new event by any logged user after creation that user become admin of that event;
EventRouter.post("/", async (req, res) => {
    let { name, desc, start, end, maxMember, location } = req.body;
    let { token } = req.headers;
    token = jwt.decode(token, process.env.secret_key);
    let adminid = token.id;

    try {
        const event = new EventModel({ name, desc, start, end, maxMember, adminid, location });
        await event.save();
        res.status(201).send({ msg: "Successfully Created an Event", event, status: "Ok" });
    } catch (err) {
        res.status(404).send({ Error: err.message, status: "NO" });
    }
});

// /events/get => Retrieving Events of particular adminid;
EventRouter.get("/get", async (req, res) => {
    try {
        let events = await EventModel.find().populate('adminid');
        res.status(200).send({ status: "OK", events });
    } catch (err) {
        res.status(404).send({ Error: err.message, status: "NO" });
    }
});

module.exports = { EventRouter };