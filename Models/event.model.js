const { Schema, model } = require("mongoose");

//Schema/blueprint of event
const eventSchema = new Schema(
    {
        name: { type: String, required: true },
        desc: { type: String, required: true },
        start: { type: Date, required: true },
        end: { type: Date, required: true },
        location: { type: String, required: true },
        maxMember: { type: Number, required: true },
        adminid: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },

        eventExpired: { type: Boolean, default: false },
        requestToJoin: { type: Array, default: [] },
        acceptedUser: { type: Array, default: [] },
        rejectedUser: { type: Array, default: [] },
        expiredUser: { type: Array, default: [] },
    },
    { versionKey: false, timestamps: true }
);

//Model of event
const EventModel = model("event", eventSchema);

module.exports = EventModel;