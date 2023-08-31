const sequelize = require("../config/connection");
const seedPosts = require("./postData");
const seedUsers = require("./userData");

async function seedAll() {
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedPosts();

  console.log("seeding complete");
  process.exit(0);
}

seedAll();
