const bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken");

//require environment variables
const {secret} = require("../Config/jwt.token");
const {userId} = require("../Config/db.config");

//Import user model
const User =  require("../models/user");

 async function register (req,res) {
     try{

        const {userName, password} = req.body;

        //check if user already exists
        const userExist = await User.findOne({userName : userName});
        if(userExist) return res.status(400).send("User already registered");

        //Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = {
            userName : userName,
            password : hashedPassword,
            roleId :  userId
        };

        const user  = new User(newUser);
        await user.save();

        res.status(201).json({"message" : "User registered!"});
    
    }catch(err){
        if(err){
            console.log(err);
        }
    }
    
    
}

 async function login (req, res){
    try{
        const {userName, password} = req.body;
        //check if user  exists
        const user = await User.findOne({userName : userName});
        if(user == null) return res.status(400).send("Invalid user name/password");

        //password check
        const validPass = await bcrypt.compare(password, user.password);
        if(!validPass) return res.status(400).send("Invalid user name/password");

        //create and assign token with role_id
        const accessToken = jwt.sign({token_id : user._id +' '+user.roleId}, secret, {expiresIn: '120m'});
        
        res.status(200).json({"auth-token" : accessToken});

    }catch(err){
        console.log(err);
    }
    
    
}

module.exports = { register, login} ;