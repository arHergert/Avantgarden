import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./server-config";
const bodyParser = require("body-parser");
const server = express();

const rooms = require("../backend/routes/api/rooms");
const funcs = require("../backend/routes/api/funcs");

//Server Config
server.listen(config.port, () => {
    console.info("Server listening on ", config.serverAdress);
});

//MongoDB Config
mongoose.connect(config.mongodbUri, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected on ", config.mongodbUri))
    .catch(err => console.log(err));

server.use(cors());

//Bodyparser Middleware
server.use(bodyParser.json());

//Use Route
server.use("/api/rooms", rooms);

server.use("/api/funcs", funcs);

