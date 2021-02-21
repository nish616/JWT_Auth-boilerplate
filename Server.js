const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

//require Db connection
require("./DB/db.Connection");

//import routes
const authRoute = require("./Routes/Authentication.router");
const sampleRoute = require("./Routes/Sample.router");

const app = express();

//middleware
app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(bodyParser.json());

//Route middleware
app.use("/", authRoute);
app.use("/",sampleRoute);


app.listen(3000, console.log("Server up and running!"));