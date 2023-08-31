const router = require("express").Router();
const { Posts, User } = require("../model/index");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    console.log("router started");
    const dbPostData = await Posts.findAll({
      include: [{ model: User }],
    });
    console.log(JSON.stringify(dbPostData, null, 2));

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render("homepage", { posts, loggedIn: req.session.loggedIn });
  } catch (error) {
    console.log("error: ", error);
  }
});
module.exports = router;
