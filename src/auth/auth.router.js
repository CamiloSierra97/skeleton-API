//? Authorization and authentication routes
//* Recovery Password
//* Verify User

const router = require("express").Router();

const { registerUser } = require("../users/users.services");

//? /api/v1/auth

//* Register
router.post("/register", registerUser);

//* Login
const authServices = require("./auth.services");
router.post("/login", authServices.login);

module.exports = router;
