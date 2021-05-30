const router = require("express").Router();

//import authorize middleare
const authorize = require("../middlewares/authorize");

router.get("/sample"); // publice route

router.get("/sample/secret", authorize, ); // private route



module.exports = router;