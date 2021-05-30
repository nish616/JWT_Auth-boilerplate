const bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken");

//require environment variables
const {secret} = require("../Config/jwt.token");

//Import user model
const User =  require("../models/user");

 async function register (req,res) {
     try{

        const {userName, password} = req.body;

        if(!userName || ! password)
        return res.status(400).send({success : "false",error:"fields are empty"});
        
        //check if user already exists
        const userExist = await User.findOne({userName : userName});
        if(userExist) return res.status(400).send({success : "false", message:"User already registered"});

        //Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = {
            userName : userName,
            password : hashedPassword
        };

        const user  = new User(newUser);
        await user.save();

        const payload = {
            id : user._id,
            userName : user.userNname   // Add more data to payload as per ur logic
        };
        const accessToken = jwt.sign(payload, secret, {expiresIn: '120m'});
        
        res.status(200).send({success : "true","token" : accessToken});
    
    }catch(err){
        if(err){
            console.log(err);
            res.status(500).send({success : "false", error : err});
        }
    }
    
    
}

 async function login (req, res){
    try{
        const {userName, password} = req.body;

        if(!userName || ! password)
        return res.status(400).send({success : "false",error:"fields are empty"});

        //check if user  exists
        const user = await User.findOne({userName : userName});
        if(!user) res.status(400).send({success : "false", message:"Invalid user name/password"});

        //password check
        const validPass = await bcrypt.compare(password, user.password);
        if(!validPass)  return res.status(400).send({success : "false",mesg:"Invalid user name/password"});

        
        const payload = {
            id : user._id,
            userName : user.userNname  // Add more data to payload as per ur logic
        };
        const accessToken = jwt.sign(payload, secret, {expiresIn: '120m'});
        
        res.status(200).send({success : "true","token" : accessToken});

    }catch(err){
        console.log(err);
    }
    
    
}

module.exports = { register, login} ;