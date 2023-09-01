const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./controller");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

// Define a middleware to reset the session expiration
function resetSessionExpiration(req, res, next) {
  if (req.session) {
    req.session.touch();
  }
  next();
}

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 5 * 60 * 1000, // Set a short-lived cookie (5 minutes)
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
  rolling: true,
};

app.use(session(sess));
app.use(resetSessionExpiration);

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
