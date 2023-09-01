const router = require("express").Router();
const { Posts, User } = require("../model/index");
const { activity } = require("../utils/helpers");

//route for loading homepage
router.get("/", activity, async (req, res) => {
  try {
    //retrieves all posts made by any user
    const dbPostData = await Posts.findAll({
      include: [{ model: User }],
    });

    //serializes retrieved data
    const posts = dbPostData.map((post) => post.get({ plain: true }));

    //renders homepage with serialized data
    res.render("homepage", { posts, loggedIn: req.session.loggedIn });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
module.exports = router;
