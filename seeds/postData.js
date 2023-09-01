const sequelize = require("../config/connection");
const Posts = require("../model/Posts");
const { getDate } = require("../utils/helpers");

//seeds the post table with initial data
async function seedPosts() {
  try {
    await sequelize.sync({ force: false });
    await Posts.create({
      title: "first post",
      content: "this is my first post",
      created_on: getDate(),

      user_id: 1,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

module.exports = seedPosts;
