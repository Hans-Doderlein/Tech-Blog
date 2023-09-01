//makes delete request using user input
async function deletePost(id) {
  try {
    const res = await fetch("/api/posts/", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      document.location.replace("/api/dashboard");
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

//makes update request using user input
async function updatePostContent(id) {
  const title = document.getElementById("post-title").value.trim();
  const content = document.getElementById("post-content").value.trim();

  try {
    const res = await fetch("/api/posts/", {
      method: "PUT",
      body: JSON.stringify({ id, title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      document.location.replace("/api/dashboard");
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

//loads post to be updated
function updatePost(id) {
  document.location.replace(`/api/posts/update/${id}`);
}
