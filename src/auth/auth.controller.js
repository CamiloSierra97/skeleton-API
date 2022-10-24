//? Imports
const { getUserByEmail } = require("../users/users.controllers");
const { comparePassword } = require("../utils/crypto");

//* User's email and password
//? Emails are unique in database

const loginUser = async (email, password) => {
  //? Two possibles answers, return user in case is succesful or return false otherwise
  try {
    const user = await getUserByEmail(email);
    //? Decrypting password
    const verifyPassword = comparePassword(password, user.password);
    if (verifyPassword) {
      return user;
    }
    return false;
  } catch (error) {
    return false;
  }
};


module.exports = {
  loginUser,
};
