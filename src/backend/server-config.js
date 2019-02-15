require('dotenv').config();
import ip from "ip";

const env = process.env;

export default {
    port: env.PORT || 5000,
    uri: ip.address()|| env.URI,
    serverAdress: ip.address()+':'+env.PORT,
    mongodbUri: "mongodb://"+ip.address()+":27017/avantdb"
}