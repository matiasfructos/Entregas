// Validacion de usuario
const data = localStorage.getItem("userStatus")

function bienvenidx() {
  if (!data) {
    window.location.href = "login.html"
  }
}
bienvenidx()

function user() {
  const user = localStorage.getItem("username")
  const name = document.getElementById("user")
  name.innerHTML = user
}
user()

// Cerrar Sesion
const cerrar_sesion = document.getElementById("cerrar_sesion")

cerrar_sesion.addEventListener("click", a => {
  localStorage.removeItem("userStatus")
  window.location.href = "login.html"
}) 
