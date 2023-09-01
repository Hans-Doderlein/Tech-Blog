const router = require("express").Router();
const { User } = require("../../model/index");

router.get("/login", (req, res) => {
  console.log("login route called");
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

router.post("/signup", async (req, res) => {
  const newUser = await User.create(req.body);

  req.session.loggedIn = true;
  req.session.userId = newUser.id;
  req.session.username = newUser.username;

  res.status(200).json({ message: "Signup sucessful" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const validUser = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!validUser) {
    res.status(404).json({ message: "Incorrect Email or Password" });
    return;
  }

  const validPassword = await validUser.checkPassword(password);

  if (!validPassword) {
    res.status(401).json({ message: "Incorrect Email or Password" });
    return;
  }

  req.session.loggedIn = true;
  req.session.userId = validUser.id;
  req.session.username = validUser.username;

  res.status(200).json({ message: "login successful", user_id: validUser.id });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
