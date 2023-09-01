const sequelize = require("../config/connection");
const seedPosts = require("./postData");
const seedUsers = require("./userData");

//seed all tables in database
async function seedAll() {
  try {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();
    process.exit(0);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

seedAll();
