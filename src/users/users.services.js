const userControllers = require("./users.controllers");

const getAllUsers = (req, res) => {
  userControllers
    .getAllUsers()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const getUserById = (req, res) => {
  const id = req.params.id;
  userControllers
    .getUserById(id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "Invalid ID" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const patchUser = (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, phone, gender, country } = req.body;
  userControllers
    .updateUser(id, { firstName, lastName, phone, gender, country })
    .then((data) => {
      if (data[0]) {
        res
          .status(200)
          .json({ message: `User with ID ${id}, edited succesfully` });
      } else {
        res.status(404).json({ message: "Invalid ID or missing data" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const registerUser = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    birthday,
    gender,
    country,
  } = req.body;
  if (firstName && lastName && email && password && phone && birthday) {
    //? Controller execution
    userControllers
      .createUser({
        firstName,
        lastName,
        email,
        password,
        phone,
        birthday,
        gender,
        country,
      })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    //? Error when data is missing
    res.status(400).json({
      message: "All fields must be completed",
      fields: {
        firstName: "string",
        lastName: "string",
        email: "example@email.com",
        password: "string",
        phone: "+573001234567",
        birthday: "YYYY/MM/DD",
      },
    });
  }
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  userControllers
    .deleteUser(id)
    .then((data) => {
      if (data !== 0) {
        res.status(204).json();
      } else {
        res.status(404).json({ message: "Invalid ID" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

//? My user Services
const getMyUser = (req, res) => {
  const id = req.user.id; //? req.user contains the information from the decrypted token
  userControllers
    .getUserById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const patchMyUser = (req, res) => {
  const id = req.user.id; //? req.user contains the information from the decrypted token
  const { firstName, lastName, phone, birthday, gender, country } = req.body;
  userControllers
    .updateUser(id, { firstName, lastName, phone, birthday, gender, country })
    .then((data) => {
      res.status(200).json({ message: `Your user was edited succesfully` });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const deleteMyUser = (req, res) => {
  const id = req.user.id; //? req.user contains the information from the decrypted token
  userControllers
    .updateUser(id, { status: "inactive" })
    .then((data) => {
      res.status(200).json("Your user was deleted succesfully");
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  patchUser,
  registerUser,
  deleteUser,
  getMyUser,
  patchMyUser,
  deleteMyUser,
};
