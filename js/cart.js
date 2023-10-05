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

document.addEventListener("DOMContentLoaded", function () {

  //Fetch para la información del carrito de compras
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      let lista_productos = JSON.parse(localStorage.getItem("cart_products")) || []
      console.log(lista_productos)
      if (lista_productos.find(element => element.id == resultObj.data.articles[0].id) == undefined) {
        lista_productos.push(resultObj.data.articles[0])
        localStorage.setItem("cart_products", JSON.stringify(lista_productos))
      }
    }
  })
  carrito(JSON.parse(localStorage.getItem("cart_products")) || [])
  temaActivo()
});

//Carta de elementos del carrito
function carrito(array) {
  const cartItems = document.getElementById("cartItems")
  array.forEach(element => {
    cartItems.innerHTML +=
      `<tr scope="row">
    <td><img width="150" src=${element.image} alt="Producto"> </td>
    <td>${element.name}</td>
    <td>${element.currency} ${element.unitCost}</td>
    <td><input id="${element.name}" type="number" class="form-control" value="${element.count}"</td>
    <td>${element.currency}</td>
    <td><button class="btn btn-danger">Eliminar</button></td>
    </tr>
    `
      ;
  });
}