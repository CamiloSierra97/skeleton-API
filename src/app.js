//? Dependencies
const express = require("express");
const db = require("./utils/database");

//? Files
const config = require("./config");

//? Routes
const userRouter = require("./users/users.router");
const authRouter = require("./auth/auth.router");

//? Initial Configs
const app = express();

app.use(express.json());

db.authenticate()
  .then(() => {
    console.log("Database autenticated");
  })
  .catch((err) => {
    console.log(err);
  });

db.sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.log(err);
  });

//? Petitions

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server OK!",
    users: `localhost:${config.port}/api/v1/users`,
  });
});

//? Verbs
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", authRouter);

app.listen(config.port, () => {
  console.log(`Server started at port ${config.port}`);
});
