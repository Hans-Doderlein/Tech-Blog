const Posts = require("./Posts");
const User = require("./User");

User.hasMany(Posts, {
  foreignKey: "username",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Posts.belongsTo(User, {
  foreignKey: "username",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = { User, Posts };
