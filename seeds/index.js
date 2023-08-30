const sequelize = require("../config/connection");
const seedPosts = require("./postData");
const seedUsers = require("./userData");

async function seedAll() {
  await sequelize.sync({ force: true }), await seedPosts();
  await seedUsers();
  process.exit(0);
}

seedAll();
