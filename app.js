require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const repoRoute = require("./Routes/repo");
const tagsRoute = require('./Routes/tags')

app.use(cors())
app.use(express.json())

const dbConnect = require('./config/dbConnect');
dbConnect()

app.use("/repo",repoRoute)
app.use("/tags",tagsRoute)

app.listen(PORT, () => console.log(`Server is running on port-${PORT}`));