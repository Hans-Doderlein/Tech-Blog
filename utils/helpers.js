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
};
