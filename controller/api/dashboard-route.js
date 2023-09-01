const { Posts } = require("../../model");
const withAuth = require("../../utils/auth");

const router = require("express").Router();

router.get("/", withAuth("dashboard"), async (req, res) => {
  const usersPosts = await Posts.findAll({
    where: {
      user_id: req.session.userId,
    },
  });

  const posts = usersPosts.map((post) => post.get({ plain: true }));

  res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
});

module.exports = router;
