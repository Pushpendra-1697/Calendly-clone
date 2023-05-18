const { Schema, model } = require("mongoose");

//Schema/blueprint of user
const userSchema = new Schema(
    {
        name: { type: String, required: true },
        password: { type: String, required: true }
    },
    { versionKey: false, timestamps: true }
);

//Collection of user
const UserModel = model("user", userSchema);

module.exports = UserModel;