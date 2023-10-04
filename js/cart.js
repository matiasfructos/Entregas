// Validacion de usuario
const data = localStorage.getItem("userStatus")

function bienvenidx() {
  if (!data) {
    window.location.href = "login.html"
  }
}
bienvenidx()

function user() {
  document.getElementById("user").innerHTML = localStorage.getItem("username")
}
user()

// Cerrar Sesion
const cerrar_sesion = document.getElementById("cerrar_sesion")

cerrar_sesion.addEventListener("click", a => {
  localStorage.removeItem("userStatus")
  window.location.href = "login.html"
}) 

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

document.addEventListener("DOMContentLoaded", function (){

  //Fetch para la información del carrito de compras
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      
      if (!localStorage.getItem("cart_products")) {
        localStorage.setItem("cart_products", JSON.stringify(resultObj.data.articles[0]))
      }
    }
  })
  let productos = localStorage.getItem("cart_products")
  carrito(JSON.parse(productos))
  temaActivo()
});

//
function carritoData(data){
  const cartItems = document.getElementById("cartItems")
  let subtotal = data.count * data.unitCost
  cartItems.innerHTML+= 
    `<tr scope="row">
    <td><img width="150" src=${data.image} alt="Producto"> </td>
    <td>${data.name}</td>
    <td>${data.currency} ${data.unitCost}</td>
    <td><input type="number" class="form-control" value="${data.count}"</td>
    <td>${data.currency} ${subtotal}</td>
    <td><button class="btn btn-danger">Eliminar</button></td>
    </tr>
    `
  ;
}

function carrito(array) {
  const cartItems = document.getElementById("cartItems")
  array.forEach(element => {
    cartItems.innerHTML+= 
    `<tr scope="row">
    <td><img width="150" src=${element.image} alt="Producto"> </td>
    <td>${element.name}</td>
    <td>${element.currency} ${element.unitCost}</td>
    <td><input id="${element.name}" type="number" class="form-control" value="${element.count}"</td>
    <td>${element.currency} ${subtotal}</td>
    <td><button class="btn btn-danger">Eliminar</button></td>
    </tr>
    `
  ;
  });
}