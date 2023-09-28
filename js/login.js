document.addEventListener("DOMContentLoaded", function () {

  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validación del usuario
    if (!username || !password) {
      return alert("Por favor, rellene todos los campos")
    } else {
      localStorage.setItem("userStatus", true)
    }

    // Almacenar el nombre en localStorage para usarlo en home.js
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    // Redirigir a la página principal
    window.location.href = "index.html";
  });
});


// Cambio de Temas
const temaOscuro = () => {
  document.querySelector("body").setAttribute("data-bs-theme", "dark")
  document.querySelector("#dl-icon").setAttribute("class", "bi bi-sun-fill")
  localStorage.setItem("tema", "oscuro")
}

const temaClaro = () => {
  document.querySelector("body").setAttribute("data-bs-theme", "light")
  document.querySelector("#dl-icon").setAttribute("class", "bi bi-moon-fill")
  localStorage.removeItem("tema")
}

const temaActivo = () => {
  let tema = localStorage.getItem("tema");
  if (tema == "oscuro") {
      return temaOscuro()
  } else {
      return temaClaro()
  }
}

const cambiarTema = () => {
  document.querySelector("body").getAttribute("data-bs-theme") === "light" ?
  temaOscuro() : temaClaro();
}
