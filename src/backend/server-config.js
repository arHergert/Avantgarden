require('dotenv').config();

const env = process.env;

export default {
    port: env.PORT,
    uri: env.URI,
    serverAdress: env.URI+':'+env.PORT,
    mongodbUri:  "mongodb+srv://"+env.dbUser+":"+env.dbPW+"@avantdb-rqmuf.mongodb.net/test?retryWrites=true&w=majority"
}