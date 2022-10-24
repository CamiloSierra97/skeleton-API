const { loginUser } = require("./auth.controller");
const jwt = require("jsonwebtoken");

//? Login Service
const login = (req, res) => {
  const { email, password } = req.body;
  //? Email or Password does not exist
  if (email && password) {
    loginUser(email, password)
      .then((response) => {
        if (response) {
          const token = jwt.sign(
            {
              id: res.id,
              email: res.email,
              role: res.role,
            },
            "Camilo"
          );
          res.status(200).json({
            message: "User log in succesfully",
            token,
          });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((err) => {
        res.status(400).json({ message: error.message });
      });
  } else {
    return res.status(400).json({ message: "Missing data" });
  }
};

module.exports = {
  login,
};
