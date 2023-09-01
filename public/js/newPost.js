const newPostButton = document.getElementById("newPostButton");

//on click, loads new post template
newPostButton.addEventListener("click", (e) => {
  e.preventDefault();

  document.location.replace("/api/posts/new");
});
