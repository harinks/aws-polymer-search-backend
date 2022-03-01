require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;

const dbConnect = require('./config/dbConnect');
dbConnect()

app.listen(PORT, () => console.log(`Server is running on port-${PORT}`));