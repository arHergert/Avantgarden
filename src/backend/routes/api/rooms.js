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
    if(req.params.id === null || req.params.id === undefined){
        return {error: "No ID sent"}
    }
    Room.findById(req.params.id)
        .then( rooms => res.json(rooms))
        .catch(e => console.error("GET api/rooms/:id", e))
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
        .catch(e => console.error("POST api/rooms",e));
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

/**
 * DELETE api/rooms/
 *
 * Delete all rooms
 */
router.delete("/", (req, res) => {
    Room.remove({})
        .then(() => res.json({success: true}))
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
        name: req.body.name
    });

    Room.updateOne(
        {_id: req.params.id},
        {$push: {users: newUser}}
    )
    .then(
        room => res.json(newUser._id)
    )
    .catch(e => console.error("POST api/rooms/:id",e));
});

/**
 * DELETE api/rooms/:id/users/
 *
 * Delete all users of a room
 */
router.delete("/:id/users", (req, res) => {

    Room.updateOne(
        {_id: req.params.id},
        {users: []}
    )
        .then(
            () => res.json({success: true})
        )
        .catch(e => console.error("POST api/rooms/:id",e));
});

/**
 * DELETE api/rooms/:id/:userid/
 *
 * Delete one user from a room
 */
router.delete("/:id/:userid", (req, res) => {

    Room.update(
        {_id: req.params.id},
        {$pullAll: Room.users  }
    )
        .then(() => res.json({success: true}) )
        .catch(e => console.error("DELETE api/rooms/:id/:userid/",e));
});


module.exports = router;