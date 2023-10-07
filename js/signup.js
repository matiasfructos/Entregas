document.getElementById("signUpButton").addEventListener("click", () => {
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;

  let user = {
    fullName: fullName,
    email: email,
    pass: pass,
  };

  let users = JSON.parse(localStorage.getItem("usuarios")) || [];
  let isRegistered = users.find((element) => element.email == user.email);

  if (!isRegistered) {
    users.push(user);
    localStorage.setItem("usuarios", JSON.stringify(users));
    window.location.href = "login.html";
  } else {
    document
      .getElementById("email")
      .setAttribute("class", "form-control is-invalid");
  }
});
