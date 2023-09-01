const router = require("express").Router();
const { User } = require("../../model/index");

//loads login page
router.get("/login", (req, res) => {
  res.render("login");
});

//on logut, destroys the seeion
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    //redirects to homepage
    res.redirect("/");
  });
});

//route for creating a user
router.post("/signup", async (req, res) => {
  try {
    //creates new user
    const newUser = await User.create(req.body);

    //sets login status, username, and user id
    req.session.loggedIn = true;
    req.session.userId = newUser.id;
    req.session.username = newUser.username;

    res.status(200).json({ message: "Signup sucessful" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

//route for checking login credentials
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //retrieves user using email
    const validUser = await User.findOne({
      where: {
        email: email,
      },
    });

    //checks if user exists
    if (!validUser) {
      res.status(404).json({ message: "Incorrect Email or Password" });
      return;
    }

    //compares password given vs user password
    const validPassword = await validUser.checkPassword(password);

    //checs if oasswirds are same
    if (!validPassword) {
      res.status(401).json({ message: "Incorrect Email or Password" });
      return;
    }

    req.session.loggedIn = true;
    req.session.userId = validUser.id;
    req.session.username = validUser.username;

    res
      .status(200)
      .json({ message: "login successful", user_id: validUser.id });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

//route that loads signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
