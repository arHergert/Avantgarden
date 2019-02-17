import mongoose from "mongoose";

//Create Schema for Avantgarden Rooms
const RoomSchema = new mongoose.Schema({
    ObjectId: mongoose.Schema.ObjectId,
    name: {
        type: String,
        required: true
    },
    maxPerson: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        "default": null
    },
    timer: {
        type: Number,
        "default": 120
    },
    mainTopic: {
        type: String,
        "default": null
    },
    canvasData: {
        type: mongoose.Schema.Types.Mixed,
        "default": {}
    },
    users: {
        type: Array,
        "default": []
    }

});

module.exports = mongoose.model("room", RoomSchema);