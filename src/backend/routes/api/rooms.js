import express from "express";
const router = express.Router();

//Room Model
const Room = require("../../dbmodels/rooms");

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
 * POST api/rooms
 *
 * Create a new room
 */
router.post("/", (req, res) => {
    const newRoom = new Room({
        name: req.body.name,
        maxPerson: req.body.maxPerson,
        password: req.body.password,
        timer: req.body.timer
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

module.exports = router;