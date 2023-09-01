const signupForm = document.getElementById("signup-form");

//on submit, makes post request to add user to the database
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username-signup").value.trim();
  const email = document.getElementById("email-signup").value.trim();
  const password = document.getElementById("password-signup").value.trim();

  try {
    if (email && password && username) {
      const res = await fetch("/api/users/signup", {
        method: "post",
        body: JSON.stringify({ email, password, username }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        document.location.replace("/");
      } else {
        console.log("failed to signup");
      }
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
