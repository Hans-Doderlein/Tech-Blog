const sequelize = require("../config/connection");
const User = require("../model/User");

const userData = [
  {
    username: "Nicholas99",
    email: "hand.doderlein99@gmail.com",
    password: "tempPassword",
  },
];

const seedUsers = async () => {
  await sequelize.sync({ force: true });

  await User.create(userData);

  process.exit(0);
};

module.exports = seedUsers;
