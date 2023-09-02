const Sequelize = require("sequelize");
require("dotenv").config();

//sets up connection to database
const sequelize = new Sequelize(
  "mysql://b2a4db455f0aea:6572ce31@us-cdbr-east-06.cleardb.net/heroku_a8d218e01dc7faf?reconnect=true",
  {
    dialect: "mysql",
    logging: true, // Set to true for debugging
  }
);

module.exports = sequelize;
