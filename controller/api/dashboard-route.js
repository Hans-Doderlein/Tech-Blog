const { Posts } = require("../../model");
const withAuth = require("../../utils/auth");
const { activity } = require("../../utils/helpers");
const router = require("express").Router();

//load dashboard route
router.get("/", withAuth, activity, async (req, res) => {
  try {
    //retireves any posts done by logged in user
    const usersPosts = await Posts.findAll({
      where: {
        user_id: req.session.userId,
      },
    });

    //serializes date
    const posts = usersPosts.map((post) => post.get({ plain: true }));

    //renders dashboard template, implenting retrieved data
    res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
