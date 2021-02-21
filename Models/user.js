const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName : {
        type: String,
        min : 10,
        required : true
    },
    
    password : {
        type : String,
        required : true
    },

    roleId : {
        type : String,
        required : true
    }

});

module.exports = mongoose.model("User", userSchema);