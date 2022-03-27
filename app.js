require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const mongodb = require('./config/dbConnect');
const routes = require('./Routes/Route');

(async () => {
    try {
        await mongodb.connect()
        app.use(cors())

        app.use(express.json())

        app.use('/', routes)

        const port = process.env.PORT

        app.listen(port, () => {
            console.log("server running in port ", port)
        })
    }
    catch (err) {
        console.log("Error in connecting to DB",)
    }
})();
