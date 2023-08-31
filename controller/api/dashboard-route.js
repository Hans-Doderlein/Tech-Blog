const withAuth = require("../../utils/auth");

const router = require("express").Router();

router.get("/", withAuth("dashboard"), (req, res) => {
  res.render("dashboard", {
    posts: [
      {
        title: "title",
        user: { username: "a users name" },
        content: "conent",
        created_on: "now",
      },
    ],
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
