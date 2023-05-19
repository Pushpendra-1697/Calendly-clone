const { Schema, model } = require("mongoose");

//Schema/blueprint of user
const userSchema = new Schema(
    {
        name: { type: String, required: true },
        password: { type: String, required: true },

        availability: [
            {
                start: { type: Date, required: true, default: Date.now },
                end: { type: Date, required: true, default: Date.now },
                isUnavailable: { type: Boolean, required: true, default: false }
            }
        ],
    },
    { versionKey: false, timestamps: true }
);

//Collection of user
const UserModel = model("user", userSchema);

module.exports = UserModel;