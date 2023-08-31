const router = require("express").Router();
const userRoutes = require("./user-routes");
const dashboardRoutes = require("./dashboard-route");

router.use("/users", userRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
