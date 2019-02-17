import mongoose from "mongoose";

//Create Schema for a User
const UserSchema = new mongoose.Schema({
    ObjectId: mongoose.Schema.ObjectId,
    name: {
        type: String,
        required: true
    },
    subTopic: {
        type: String,
        "default": null
    },
    drawOrder: {
        type: Number,
        "default": -1
    }
});

module.exports = mongoose.model("user", UserSchema);