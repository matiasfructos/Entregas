document.addEventListener("DOMContentLoaded", function(){
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (!username || !password) {
        return alert("Por favor, rellene todos los campos")
    } else {
        localStorage.setItem("userStatus", true)
        window.location.href = "login.html"
    }


    //   if (username.trim() === "" && password.trim() === "")  {
    //     alert("Por favor, ingrese un nombre de usuario y/o contraseña válido.");
    //     return;
    //   }
      // Almacenar el nombre en sessionStorage para usarlo en home.js
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      // Redirigir a la página principal
      window.location.href = "index.html";


    });
  });


