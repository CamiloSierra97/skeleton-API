const { Sequelize } = require("sequelize");
const config = require("../config");

//? Environment variables
const config = new Sequelize({
  dialect: "postgres",
  host: config.db.host,
  username: config.db.username,
  password: config.db.password,
  database: config.db.dbName,
});

module.exports = db;
