const router = require("express").Router();

//import environtment variables
const {adminId} = require("../Config/db.config");

//import authorize middleare
const authorize = require("../Middlewares/authorize");

router.get("/user", authorize, (req,res) => {

    res.send("User");
});

router.get("/admin", authorize, (req,res) => {

    const user = req.user;
    const roleId = user.split(' ')[1];

    if(roleId != adminId) return res.status(403).send("Acess denied");
    res.send("admin");
});



module.exports = router;