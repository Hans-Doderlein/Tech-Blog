const { Comments } = require("../../model");
const withAuth = require("../../utils/auth");
const { activity } = require("../../utils/helpers");
const router = require("express").Router();

//add comments route
router.post("/add", withAuth, activity, async (req, res) => {
  try {
    //creates new comment
    const newComment = await Comments.create({
      ...req.body,
      username: req.session.username,
    });

    res.status(200).json({ message: "comment added" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
