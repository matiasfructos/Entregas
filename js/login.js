document.getElementById("logInButton").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;

  let users = JSON.parse(localStorage.getItem("usuarios")) || [];
  let isValid = users.find(
    (element) => element.email == email && element.pass == pass
  );

  // Validación del usuario
  if (isValid) {
    let currentUser = users.filter(
      (element) => element.email == email && element.pass == pass
    );
    localStorage.setItem("currentUser", JSON.stringify(currentUser[0]));
    localStorage.setItem("userStatus", true);
    window.location.href = "index.html";
  } else {
    document
      .getElementById("pass")
      .setAttribute("class", "form-control is-invalid");
  }
});
