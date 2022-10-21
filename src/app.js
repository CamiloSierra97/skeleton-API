//? Dependencies
const express = require("express");

//? Files
const config = require("./config");

//? Routes
const userRouter = require("./users/users.router");

//? Initial Configs
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server OK!",
    users: `localhost:${config.port}/api/v1/users`,
  });
});

app.use("/api/v1/users", userRouter);

app.listen(config.port, () => {
  console.log(`Server started at port ${config.port}`);
});

