const Sequelize = require("sequelize");
require("dotenv").config();

//sets up connection to database
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  logging: true, // Set to true for debugging
});

module.exports = sequelize;
