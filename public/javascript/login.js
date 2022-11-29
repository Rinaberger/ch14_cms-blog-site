async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector("#username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
  
    if (username && password) {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      console.log(response)
      if (response.ok) {
        console.log("logged in")
        document.location.replace("/userblogs");
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document
    .querySelector(".login-form")
    .addEventListener("submit", loginFormHandler);