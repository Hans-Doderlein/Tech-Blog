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

commentButton.addEventListener("click", (e) => {
  e.preventDefault();

  document.getElementById("addComment").style.display = "block";
});

commentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const commentSection = document.getElementById("addComment");

  const content = document.getElementById("newComment").value.trim();

  const created_on = getDate();

  const user_id = commentSection.dataset.user;

  const post_id = commentSection.dataset.post;

  const res = await fetch("/api/comments/add", {
    method: "post",
    body: JSON.stringify({ content, created_on, user_id, post_id }),
    headers: { "Content-Type": "application/json" },
  });

  document.getElementById("addComment").style.display = "none";

  if (res.ok) {
    document.location.replace("/api/posts/" + post_id);
  }
});
