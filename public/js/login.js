const loginForm = document.getElementById("login-form");

//on submit, makes login post request
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email-login").value.trim();
  const password = document.getElementById("password-login").value.trim();

  try {
    if (email && password) {
      const res = await fetch("/api/users/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        document.location.replace("/");
      } else {
        console.log("failed to login");
      }
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
