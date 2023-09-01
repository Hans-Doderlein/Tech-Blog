const { Posts, Comments, User } = require("../../model");
const withAuth = require("../../utils/auth");
const { getDate } = require("../../utils/helpers");
const { activity } = require("../../utils/helpers");
const router = require("express").Router();

//route for loading the new post template
router.get("/new", withAuth, activity, (req, res) => {
  res.render("newPost", { loggedIn: req.session.loggedIn });
});

//route for saving new post
router.post("/new", withAuth, activity, async (req, res) => {
  const { postTitle: title, postContent: content } = req.body;
  try {
    //creates new post in database
    const newPost = await Posts.create({
      title,
      content,
      created_on: getDate(),
      user_id: req.session.userId,
    });

    res.status(200).json({ message: "new post created" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

//route for retrieving specific post by id
router.get("/:id", withAuth, activity, async (req, res) => {
  try {
    //retrieves post by id
    const post = await Posts.findByPk(req.params.id, {
      include: [{ model: Comments }, { model: User }],
    });

    //serializes post data
    const posts = post.get({ plain: true });

    //renders individual post template with retrieved post
    res.render("individualPost", {
      posts,
      user_id: req.session.userId,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

//deletes post using post id
router.delete("/", withAuth, activity, async (req, res) => {
  try {
    //deletes post from database
    await Posts.destroy({
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json({ message: "post deleted" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

//get post by id
router.get("/update/:id", withAuth, activity, async (req, res) => {
  try {
    //retrieves post from database using id
    const post = await Posts.findByPk(req.params.id);

    //serializes post data
    const posts = post.get({ plain: true });

    //renders update post template
    res.render("updatePost", { posts, loggedIn: req.session.loggedIn });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

//updates post using id and user input
router.put("/", withAuth, activity, async (req, res) => {
  try {
    const { id, title, content } = req.body;

    //update post
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
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
