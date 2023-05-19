const { Schema, model } = require("mongoose");

//Schema/blueprint of Available
const availableSchema = new Schema(
    {
        start: { type: Date, required: true },
        end: { type: Date, required: true },
        isUnavailable: { type: Boolean, required: true },
        adminid: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        }
    },
    { versionKey: false, timestamps: true }
);

//Model of Available
const AvailableModel = model("event", availableSchema);

module.exports = AvailableModel;