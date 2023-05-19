const { Router } = require('express');
const notificationRouter = Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const UserModel = require('../Models/users.model');
// Need user & pass => SMTP(simple mail transfer protocol) Server

// /notification => For Send email notification by Nodemailer
notificationRouter.get('/', async (req, res) => {
    const { receiver, meetLink } = req.body;
    let { token } = req.headers;
    token = jwt.decode(token, process.env.secret_key);
    let adminid = token.id;
    let user = await UserModel.findOne({ _id: adminid });

    try {
        // connect with SMTP server
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: "emmitt.hudson@ethereal.email", // generated ethereal user
                pass: "YtuPv7n128uBmhVxR5", // generated ethereal password
            },
        });

        let info = await transporter.sendMail({
            from: `"unknown sender 👻" <${user.name}@gmail.com>`, // sender address
            to: `${receiver}`, // list of receivers
            subject: "Invitation from an unknown sender, Meeting Link",
            text: `Hello Dear, I hope you are doing well!! This is appointment requests, please give confirmations, or changes to scheduled events`,
            html: `<a href=${meetLink} target="_blank">Meet Link: ${meetLink}</a>`,
        });

        res.send({ msg: info, status: "Ok" });
    } catch (err) {
        res.status(404).send({ Error: err.message, status: "NO" });
    }
});


module.exports = { notificationRouter };

