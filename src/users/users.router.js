const router = require("express").Router();
const userServices = require("./users.services");

//? Protect routes
const passport = require("passport");
require("../middlewares/auth.middleware")(passport);

//? Routes

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userServices.getAllUsers
);

router
  .route("/:id")
  .get(userServices.getUserById)
  .patch(userServices.patchUser)
  .delete(userServices.deleteUser);

module.exports = router;
