const { Comments } = require("../../model");
const withAuth = require("../../utils/auth");

const router = require("express").Router();

router.post("/add", withAuth("acad"), async (req, res) => {
  const newComment = await Comments.create({
    ...req.body,
    username: req.session.username,
  });
  console.log(newComment);

  res.status(200).json({ message: "comment added" });
});

module.exports = router;
