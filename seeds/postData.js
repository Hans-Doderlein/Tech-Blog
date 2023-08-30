const sequelize = require("../config/connection");
const Posts = require("../model/Posts");
const { getDate } = require("../utils/helpers");

const postData = {
  title: "first post",
  content: "this is my first post",
  created_on: getDate(),
  comments: [],
  username: "Nicholas99",
};

async function seedPosts() {
  await sequelize.sync({ force: true });
  await Posts.create(postData);
  process.exit(0);
}

module.exports = seedPosts;
