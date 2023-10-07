document.getElementById("logInButton").addEventListener("click", () => {
  const username = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  // Validación del usuario
  if (!username || !password) {
    return alert("Por favor, rellene todos los campos");
  } else {
    localStorage.setItem("userStatus", true);
  }

  // Almacenar el nombre en localStorage para usarlo en home.js
  localStorage.setItem("username", username);
  localStorage.setItem("password", password);

  // Redirigir a la página principal
  window.location.href = "index.html";
});
