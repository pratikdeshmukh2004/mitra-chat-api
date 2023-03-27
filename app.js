require("dotenv").config();
const express = require("express");
const morgan = require('morgan');
const app = express();
const userrouter = require("./routes/user");

app.use(morgan('combined'));
app.use(express.json())
app.use(userrouter)

let PORT = process.env.PORT || 5050
app.listen(PORT, (req, res) => {
    console.log(`Your server is listening on http://localhost:${PORT}`);
});