const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email-login").value.trim();
  const password = document.getElementById("password-login").value.trim();
  console.log("submit form faunction", email, password);

  if (email && password) {
    console.log("email and password checkeing");
    const res = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);

    if (res.ok) {
      document.location.replace("/");
    } else {
      console.log("failed to login");
    }
  }
});
