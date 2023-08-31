const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username-signup").value.trim();
  const email = document.getElementById("email-signup").value.trim();
  const password = document.getElementById("password-signup").value.trim();

  if (email && password && username) {
    const res = await fetch("/api/users/signup", {
      method: "post",
      body: JSON.stringify({ email, password, username }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      document.location.replace("/api/users/login");
    } else {
      console.log("failed to signup");
    }
  }
});
