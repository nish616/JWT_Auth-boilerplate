//Database connection here
const mongoose = require("mongoose");

//require environment variables
const dbVariables = require("../Config/db.config");

module.exports = mongoose.connect("mongodb+srv://"+dbVariables.dbUser+":"+dbVariables.dbPassword+"@cluster0.ll1mc.mongodb.net/"+dbVariables.dbName+"?retryWrites=true&w=majority",
{ useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => {
    console.log("Database authenticated and connected");
})
.catch((err) => {
    if(err) throw err;
});