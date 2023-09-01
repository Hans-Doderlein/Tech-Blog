module.exports = {
  getDate: () => {
    // Create a new Date object
    const today = new Date();

    // Get the current year, month, and day
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based
    const day = today.getDate();

    // Format the date as desired (for example, YYYY-MM-DD)
    const formattedDate = `${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}-${year}`;

    return formattedDate;
  },
  activity: (req, res, next) => {
    if (!req.session) {
      req.session = {};
    }
    if (!req.session.lastActivity) {
      req.session.lastActivity = Date.now();
    }

    if (Date.now() - req.session.lastActivity > 60 * 1000) {
      console.log("out of time");
      req.session.destroy(() => {
        res.redirect("/api/users/login");
      });
      return;
    }

    req.session.lastActivity = Date.now();
    next();
  },
};
