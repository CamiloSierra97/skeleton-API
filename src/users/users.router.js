const router = require("express").Router();
const userServices = require("./users.services");

//? Protect routes
const passport = require("passport");
const adminValidate = require("../middlewares/role.middleware");
require("../middlewares/auth.middleware")(passport);

//? Routes

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userServices.getAllUsers
);

router
  .route("/me")
  .get(passport.authenticate("jwt", { session: false }), userServices.getMyUser)
  .patch(
    passport.authenticate("jwt", { session: false }),
    userServices.patchMyUser
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    userServices.deleteMyUser
  );

router
  .route("/:id")
  .get(userServices.getUserById)
  .patch(
    passport.authenticate("jwt", { session: false }),
    adminValidate,
    userServices.patchUser
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    adminValidate,
    userServices.deleteUser
  );

module.exports = router;
