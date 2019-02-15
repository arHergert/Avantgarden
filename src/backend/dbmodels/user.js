import mongoose from "mongoose";

//Create Schema for a User
const UserSchema = new mongoose.Schema({
    ObjectId: mongoose.Schema.ObjectId,
    name: {
        type: String,
        required: true
    },
    maxPerson: {
        type: Number,
        required: true
    },

});

module.exports = mongoose.model("user", UserSchema);