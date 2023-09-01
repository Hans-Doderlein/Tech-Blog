const sequelize = require("../config/connection");
const User = require("../model/User");

//seeds users with intiial data
const seedUsers = async () => {
  try {
    await sequelize.sync({ force: false });

    const newuser = await User.create({
      username: "Nicholas99",
      email: "hans.doderlein99@gmail.com",
      password: "tempPassword",
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = seedUsers;
