const bcrypt = require("bcrypt");

//?Encrypt password
const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, 10);
};

//? Compare passwords
const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};

