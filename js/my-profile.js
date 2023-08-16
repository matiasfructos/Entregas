



// Validacion de usuario

const data = localStorage.getItem("userStatus") 

  function bienvenidx(){
   if (!data){
    alert("Debe iniciar Sesion")
   window.location.href = "login.html"
   }
  }
  bienvenidx()