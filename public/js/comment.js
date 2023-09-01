function getDate() {
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
}

const commentForm = document.getElementById("comment-form");
const commentButton = document.getElementById("commentButton");

//onclick displays add comment feature
commentButton.addEventListener("click", (e) => {
  e.preventDefault();

  document.getElementById("addComment").style.display = "block";
});

//on submit makes request for creating commment using user input from form
commentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const commentSection = document.getElementById("addComment");

  const content = document.getElementById("newComment").value.trim();

  const created_on = getDate();

  const user_id = commentSection.dataset.user;

  const post_id = commentSection.dataset.post;

  try {
    const res = await fetch("/api/comments/add", {
      method: "post",
      body: JSON.stringify({ content, created_on, user_id, post_id }),
      headers: { "Content-Type": "application/json" },
    });

    //hides comment feature until button is clicked again
    document.getElementById("addComment").style.display = "none";

    if (res.ok) {
      document.location.replace("/api/posts/" + post_id);
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
