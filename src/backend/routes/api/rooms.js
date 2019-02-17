import express from "express";
const router = express.Router();

//Room Model
const Room = require("../../dbmodels/RoomSchema");

//User Model
const User = require("../../dbmodels/UserSchema");


/************************
 * ROOMS
 ***********************/

/**
 * GET api/rooms
 *
 * Get all rooms
 */
router.get("/", (req, res) => {
    Room.find()
        .then( rooms => res.json(rooms))
        .catch(e => console.error(e))
});

/**
 * GET api/rooms/:id
 *
 * Get one room
 */
router.get("/:id", (req, res) => {
    Room.findById(req.params.id)
        .then( rooms => res.json(rooms))
        .catch(e => console.error(e))
});


/**
 * POST api/rooms
 *
 * Create a new room
 */
router.post("/", (req, res) => {
    const newRoom = new Room({
        name: req.body.name,
        maxPerson: req.body.maxPerson,
        password: req.body.password,
        timer: req.body.timer,
        mainTopic: req.body.mainTopic
    });

    newRoom.save()
        .then(room => res.json(room))
        .catch(e => console.error(e));
});

/**
 * DELETE api/rooms/:id
 *
 * Delete a room
 */
router.delete("/:id", (req, res) => {
    Room.findById(req.params.id)
        .then(room =>
            room.remove()
            .then(() => res.json({success: true})))
        .catch(e => res.status(404).json({success: false}));
});



/************************
 * Users
 ***********************/

/**
 * POST api/rooms/:id/users/
 *
 * Add a new User to a room
 */
router.post("/:id/users", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        subTopic: req.body.subTopic,
        drawOrder: req.body.drawOrder
    });

    Room.updateOne(
        {_id: req.params.id},
        {$push: {users: newUser}}
    )
    .then(room => res.json(room))
    .catch(e => console.error(e));
});

module.exports = router;