const sequelize = require("../config/connection");
const Posts = require("../model/Posts");
const { getDate } = require("../utils/helpers");

async function seedPosts() {
  await sequelize.sync({ force: false });
  await Posts.create({
    title: "first post",
    content: "this is my first post",
    created_on: getDate(),
    comments: [],
    user_id: 1,
  });
}

module.exports = seedPosts;
