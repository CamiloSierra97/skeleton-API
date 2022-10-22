//? Authorization and authentication routes
//* Login
//* Recovery Password
//* Verify User

const router = require("express").Router();

const { registerUser } = require("../users/users.services");

//? /api/v1/auth

//* Register
router.post("/register", registerUser);

module.exports = router;