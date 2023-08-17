// Validacion de usuario
const data = localStorage.getItem("userStatus")

function bienvenidx() {
  if (!data) {
    alert("Debe iniciar Sesion")
    window.location.href = "login.html"
  }
}
bienvenidx()

// Cerrar Sesion
const cerrar_sesion = document.getElementById("cerrar_sesion")

cerrar_sesion.addEventListener("click", a => {
  localStorage.removeItem("userStatus")
  window.location.href = "login.html"
}) 
