const express = require("express");
const router = express.Router();
const {registerUser, loginUser, getAllUser} = require("../controller/userController")

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/allusers").get(getAllUser)
// router.post('/login', (req, res) =>{
//     res.send("Register")
// })

module.exports = router;
