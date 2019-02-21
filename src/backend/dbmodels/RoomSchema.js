import mongoose from "mongoose";
//User Model
const User = require("./UserSchema");

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
    userMainTopics: {
        type: [],
        "default": []
    },
    userSubTopics: {
        type: [],
        "default": []
    },
    canvasData: {
        type: mongoose.Schema.Types.Mixed,
        "default": {}
    },
    users: {
        type: Array,
        "default": [User]
    },
    isWaitingRoom: {
        type: Boolean,
        "default": true
    },
    isMainTopicRoom: {
        type: Boolean,
        "default": false
    },
    isSubTopicRoom: {
        type: Boolean,
        "default": false
    },
    isStyleTopicRoom: {
        type: Boolean,
        "default": false
    },
    isDrawRoom: {
        type: Boolean,
        "default": false
    },
    isEndRoom: {
        type: Boolean,
        "default": false
    }

});

module.exports = mongoose.model("room", RoomSchema);