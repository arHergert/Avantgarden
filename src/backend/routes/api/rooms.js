import express from "express";
const router = express.Router();

//Room Model
const Room = require("../../dbmodels/RoomSchema");

//User Model
const User = require("../../dbmodels/UserSchema");



function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}

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
        .catch(e => console.error(`GET api/rooms/${req.params.id}`, e))
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
        .then(room => res.json(room._id))
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
            .then(() => res.json({delete_room_success: true})))
        .catch(e => res.status(404).json({delete_room_success: false}));
});

/**
 * DELETE api/rooms/
 *
 * Delete all rooms
 */
router.delete("/", (req, res) => {
    Room.remove({})
        .then(() => res.json({delete_all_rooms_success: true}))
        .catch(e => res.status(404).json({delete_all_rooms_success: false}));
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
        adminStatus: req.body.adminStatus
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
            () => res.json({delete_all_user_success: true})
        )
        .catch(e => console.error("POST api/rooms/:id",e));
});



/**
 * PUT api/rooms/:id/:params1/:params2
 *
 * Set one room variable false (params1) and other true (params2)
 */
router.put("/:id/:params1/:params2", (req, res) => {

    Room.updateMany(
        {_id: req.params.id},
        {[req.params.params1]: false, [req.params.params2]: true},
    )
        .then(
            () => res.json({change_Room_Vars_success: true})
        )
        .catch(e => console.error("POST api/rooms/:id",e));
});


/**
 * DELETE api/rooms/:id/:userid/
 *
 * Delete one user from a room and remove room if its empty
 */
router.delete("/:id/:userid", (req, res) => {

    Room.findOne({_id: req.params.id})
        .then(room => {
            if (room){
                room.users = room.users.filter( user => {
                    return user._id != req.params.userid
                });

                if(room.users.length < 1){
                    room.remove()
                        .then(() => {});
                }else {
                    room.save().catch(e => {});
                }

            }
        })
        .then( () => res.json({delete_one_user_success: true}) )
        .catch(e => console.error("DELETE api/rooms/:id/:userid/",e));
});


/************************
 * Topics
 ***********************/

/**
 * POST api/rooms/:roomid/topics/
 *
 * Adds a new main- or subTopic into a Topic Array
 */
router.post("/:roomid/topics", (req, res) => {
    const newTopic = {
        value: req.body.value,
        userId: req.body.userId
    };

    if(req.body.isMainTopic == true){
        Room.updateOne(
            {_id: req.params.roomid},
            {$push: {userMainTopics: newTopic}}
        )
            .then(() => res.json({add_MainTopic_success: true}))
            .catch(e => console.error("POST api/rooms/:roomid/topics/",e));
    }else {
        Room.updateOne(
            {_id: req.params.roomid},
            {$push: {userSubTopics: newTopic}}
        )
            .then(() => res.json({Add_SubTopic_success: true}))
            .catch(e => console.error("POST api/rooms/:roomid/topics/",e));
    }

});

/**
 * POST api/rooms/:roomid/topics/delete
 *
 * Deletes a main- or subTopic from a Topic Array
 */
router.post("/:roomid/topics/delete", (req, res) => {

    if(req.body.isMainTopic == true){
        Room.findOne({_id: req.params.roomid})
            .then(room => {
                if (room){
                    room.userMainTopics = room.userMainTopics.filter( topic => {
                        return topic.value != req.body.value
                    });
                    room.save().catch(e => {});
                }
            })
            .then( () => res.json({del_MainTopic_success: true}) )
            .catch(e => console.error("DELETE api/rooms/:id/:userid/",e));
    }else {
        Room.findOne({_id: req.params.roomid})
            .then(room => {
                if (room){
                    room.userSubTopics = room.userSubTopics.filter( topic => {
                        return topic.value != req.body.value
                    });
                    room.save().catch(e => {});
                }
            })
            .then( () => res.json({del_SubTopic_success: true}) )
            .catch(e => console.error("DELETE api/rooms/:id/:userid/",e));
    }

});

/************************
 * Topic choice and administration
 ***********************/

/**
 * POST api/rooms/:roomid/topics/choose/
 *
 * Chooses a main topic or maps a sub topic to a user
 */
router.post("/:roomid/topics/choose", (req, res) => {
    console.log("Choosing Topics");
    if(req.body.value == "MainTopics"){
        console.log("Is MainTopics");
        Room.findOne({_id: req.params.roomid})
            .then( room => {
                room.mainTopic = room.userMainTopics[Math.floor(Math.random() * room.userMainTopics.length)].value;
                console.log("Value:",room.userMainTopics[Math.floor(Math.random() * room.userMainTopics.length)].value);
                console.log("Final MainTopic:", room.mainTopic);
                room.save().catch(e => {});
            })
            .then( () => res.json({choose_MainTopic_success: true}) )
            .catch(e => console.error("PUT api/rooms/:roomid/topics/choose/",e));
    }else {
        Room.findOne({_id: req.params.roomid})
            .then(room => {
                let shuffledSubTopics = shuffle(room.userSubTopics);
                room.users = shuffle(room.users);

                for(let i= 0; i< room.users.length; i++){
                    room.users[i].subTopic = shuffledSubTopics[i].value;
                    room.users[i].drawOrder = i+1;

                }
                room.markModified("users");
                room.save().catch(e => {});

            })
            .then( () => res.json({choose_SubTopics_success: true}) )
            .catch(e => console.error("PUT api/rooms/:roomid/topics/choose/",e));
    }

});

/************************
 * Canvas administration
 ***********************/

/**
 * POST api/rooms/canvas/:roomid/save/:userid/
 *
 * Saves a canvas string for a room or an user
 */
router.post("/canvas/:roomid/save/:userid", (req, res) => {
    console.log("Saving Canvas...");
    if(req.body.value == "Room"){
        console.log("Is MainTopics");
        Room.findOne({_id: req.params.roomid})
            .then( room => {
                console.log("Canvas saved to Room");
               room.canvasData = req.data.canvasData;
               room.activeOrder = room.activeOrder + 1;
               console.log("DrawOrder", room.drawOrder);
               room.save().catch(e => {});

            })
            .then( () => res.json({save_Room_canvas_success: true}) )
            .catch(e => console.error("POST api/rooms/canvas/:roomid/save/:userid/",e));
    }else {
        Room.findOne({_id: req.params.roomid})
            .then(room => {
                console.log("Canvas saved for an user");
                room.users.forEach( user => {
                    if(user._id == req.params.userid){
                        user.canvasData = req.body.canvasData;
                    }
                });
                room.markModified("users");
                room.save().catch(e => {});

                let allUsersSentCanvas = true;
                room.users.forEach( user => {

                    if(user.canvasData == null){
                        allUsersSentCanvas = false;
                        return;
                    }
                });
                console.log("All Users sent Canvas? ", allUsersSentCanvas);

                if(allUsersSentCanvas){
                    Room.updateMany(
                        {_id: req.params.roomid},
                        {isDrawRoom: false, isTempRoom: true},
                    ).catch(e => console.error("POST api/rooms/:id",e));
                }
            })
            .then( () => res.json({save_User_canvas_success: true}) )
            .catch(e => console.error("POST api/rooms/canvas/:roomid/save/:userid/",e));
    }

});


/**
 * GET api/rooms/canvas/:roomid/get/:draworder
 *
 * Gets one or two canvas objects
 */
router.get("/canvas/:roomid/get/:draworder", (req, res) => {
    console.log("Get Canvas...");
    var canvas = {
        first: "",
        second: ""
    };

    if(req.params.draworder == "2"){
        console.log("Get Canvas for Order 1 and 2");
        Room.findOne({_id: req.params.roomid})
            .then( room => {
                room.users.forEach( user => {

                    if(user.drawOrder == req.params.draworder-1){
                        canvas.first = user.canvasData;
                    }

                    if(user.drawOrder == req.params.draworder){
                        canvas.second = user.canvasData;
                    }
                });

                console.log("Canvas Order 1+2 sent!")

            })
            .then( () => res.json(canvas) )
            .catch(e => console.error("ERROR Order 1+2 GET api/rooms/canvas/:roomid/get/:draworder",e));
    }else {
        console.log("Get Canvas for", req.params.draworder, " and room.canvasData");
        Room.findOne({_id: req.params.roomid})
            .then(room => {
                canvas.first = room.canvasData;

                room.users.forEach( user => {

                    if(user.drawOrder == req.params.draworder){
                        canvas.second = user.canvasData;
                    }
                });
                console.log("Canvas Order >2 sent!");

            })
            .then( () => res.json(canvas) )
            .catch(e => console.error("ERROR Order >2 GET api/rooms/canvas/:roomid/get/:draworder",e));
    }

});


module.exports = router;