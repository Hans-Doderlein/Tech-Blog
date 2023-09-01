const newPostForm = document.getElementById("post-form");

//on submit, makes request using data from the new post form
newPostForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const postTitle = document.getElementById("postTitle").value.trim();
  const postContent = document.getElementById("postContent").value.trim();

  try {
    const res = await fetch("/api/posts/new", {
      method: "POST",
      body: JSON.stringify({ postTitle, postContent }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      document.location.replace("/api/dashboard");
    }
  } catch (error) {
    console.log(error);
  }
});
