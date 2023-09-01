const newPostButton = document.getElementById("newPostButton");

newPostButton.addEventListener("click", async (e) => {
  e.preventDefault();

  console.log("post button clicked");
  document.location.replace("/api/posts/new");
});
