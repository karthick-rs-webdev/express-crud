const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const connectDB = require("./server/database/connection");

const app = express();

dotenv.config({path: ".env"});
const PORT = process.env.PORT || 8080;

// log requestd
app.use(morgan("tiny"));

// set view engine
app.set("view engine", "ejs");

// connect DB
connectDB();

// parse request body as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// load routes
app.use('/', require("./server/routes/router"));

app.listen(PORT, () => console.log(`Server Started at http://localhost:${PORT}`));