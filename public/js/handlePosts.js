async function deletePost(id) {
  console.log("delete button clicked: " + id);
  const res = await fetch("/api/posts/", {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    document.location.replace("/api/dashboard");
  }
}
async function updatePostContent(id) {
  console.log("update button clicked");
  const title = document.getElementById("post-title").value.trim();
  const content = document.getElementById("post-content").value.trim();
  const res = await fetch("/api/posts/", {
    method: "PUT",
    body: JSON.stringify({ id, title, content }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    document.location.replace("/api/dashboard");
  }
}

async function updatePost(id) {
  document.location.replace(`/api/posts/update/${id}`);
}
