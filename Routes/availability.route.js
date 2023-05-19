const { Router } = require('express');
const UserModel = require('../Models/users.model');
const availableRouter = Router();
const jwt = require('jsonwebtoken');


// /availability/patch/:id => setting availability
availableRouter.patch('/update/:id', async (req, res) => {
    const { start, end, isUnavailable } = req.body;
    const { id } = req.params;

    try {
        // Update the user's availability
        let payload = { start, end, isUnavailable };
        let user = await UserModel.findOne({ _id: id });
        user.availability.push(payload);
        await UserModel.findByIdAndUpdate({ _id: id }, { availability: user.availability })
        return res.status(200).json({ message: 'Availability updated successfully' });
    } catch (err) {
        res.status(404).send({ Error: err.message, status: "NO" });
    }
});

// /availability/get => checking availability
availableRouter.get('/get', async (req, res) => {
    const { start, end } = req.query;
    let { token } = req.headers;
    token = jwt.decode(token, process.env.secret_key);
    let adminid = token.id;

    let user = await UserModel.findOne({ _id: adminid });
    // Check if the user is available for the specified time slot
    const isAvailable = user.availability.every((slot) => {
        const slotStart = new Date(slot.start);
        const slotEnd = new Date(slot.end);
        const requestedStart = new Date(start);
        const requestedEnd = new Date(end);

        return (
            (requestedStart >= slotEnd || requestedEnd <= slotStart) &&
            !slot.isUnavailable
        );
    });

    return res.status(200).json({ isAvailable });
});

module.exports = { availableRouter };

