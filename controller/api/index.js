const router = require("express").Router();
const userRoutes = require("./user-routes");
const dashboardRoutes = require("./dashboard-route");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");

//router used for api calls
router.use("/users", userRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
