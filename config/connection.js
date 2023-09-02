const Sequelize = require("sequelize");
require("dotenv").config();

//sets up connection to database
const sequelize = new Sequelize("cleardb - colorful - 17451", {
  dialect: "mysql",
  logging: true, // Set to true for debugging
});

module.exports = sequelize;
