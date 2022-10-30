const router = require("express").Router();
const usersServices = require("./users.services");

//? Protect routes
const passport = require("passport");
const adminValidate = require("../middlewares/role.middleware");
require("../middlewares/auth.middleware")(passport);

//? Routes

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  usersServices.getAllUsers
);

router
  .route("/me")
  .get(passport.authenticate("jwt", { session: false }), usersServices.getMyUser)
  .patch(
    passport.authenticate("jwt", { session: false }),
    usersServices.patchMyUser
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    usersServices.deleteMyUser
  );

router
  .route("/:id")
  .get(usersServices.getUserById)
  .patch(
    passport.authenticate("jwt", { session: false }),
    adminValidate,
    usersServices.patchUser
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    adminValidate,
    usersServices.deleteUser
  );

module.exports = router;
