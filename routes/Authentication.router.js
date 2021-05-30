const router = require("express").Router();

//import controllers
const Authenticate  = require("../controllers/Authentication.controller"); 

router.post("/register", Authenticate.register);

router.post("/login", Authenticate.login);



module.exports = router;