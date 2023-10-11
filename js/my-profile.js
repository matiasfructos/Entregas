document.addEventListener("DOMContentLoaded", function () {
  getUserStatus();
  showUser();
  temaActivo();
});

// Bloque encargado del cierre de sesión
document.getElementById("cerrar_sesion").addEventListener("click", (a) => {
  localStorage.removeItem("userStatus");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});