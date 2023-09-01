const { Posts, Comments, User } = require("../../model");
const withAuth = require("../../utils/auth");
const { getDate } = require("../../utils/helpers");

const { activity } = require("../../utils/helpers");

const router = require("express").Router();

router.get("/new", withAuth, activity, (req, res) => {
  console.log("route used");

  res.render("newPost", { loggedIn: req.session.loggedIn });
});

router.post("/new", withAuth, activity, async (req, res) => {
  console.log("req body", req.body);
  const { postTitle: title, postContent: content } = req.body;

  const newPost = await Posts.create({
    title,
    content,
    created_on: getDate(),
    user_id: req.session.userId,
  });

  res.status(200).json({ message: "new post created" });
  console.log("newpost route called: ", newPost);
});

router.get("/:id", withAuth, activity, async (req, res) => {
  const post = await Posts.findByPk(req.params.id, {
    include: [{ model: Comments }, { model: User }],
  });

  const posts = post.get({ plain: true });
  console.log("post: ", posts);
  res.render("individualPost", {
    posts,
    user_id: req.session.userId,
    loggedIn: req.session.loggedIn,
  });
});

router.delete("/", withAuth, activity, async (req, res) => {
  console.log(req.body);
  Posts.destroy({
    where: {
      id: req.body.id,
    },
  });

  res.status(200).json({ message: "post deleted" });
  console.log("delete route started");
});

router.get("/update/:id", withAuth, activity, async (req, res) => {
  const post = await Posts.findByPk(req.params.id);
  console.log("post:", post);

  const posts = post.get({ plain: true });

  res.render("updatePost", { posts, loggedIn: req.session.loggedIn });
});

router.put("/", withAuth, activity, async (req, res) => {
  const { id, title, content } = req.body;
  console.log("update route reached");
  await Posts.update(
    {
      title,
      content,
    },
    {
      where: {
        id: id,
      },
    }
  );

  res.status(200).json({ message: "post updated" });
});

module.exports = router;
