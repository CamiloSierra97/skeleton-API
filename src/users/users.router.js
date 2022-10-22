const router = require("express").Router();

const userServices = require("./users.services");

//? Routes

router.get("/", userServices.getAllUsers);

router
  .route("/:id")
  .get(userServices.getUserById)
  .patch(userServices.patchUser)
  .delete(userServices.deleteUser);

module.exports = router;
