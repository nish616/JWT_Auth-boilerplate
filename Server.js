const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

//require Db connection
require("./DB/db.Connection");

//import routes
const authRoute = require("./Routes/Authentication.router");
const sampleRoute = require("./Routes/Sample.router");

const app = express();

app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//Routes
app.use("/", authRoute);
app.use("/",sampleRoute);


app.listen(3000, console.log("Server up and running!"));