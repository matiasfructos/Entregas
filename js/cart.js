// Validacion de usuario
const data = localStorage.getItem("userStatus");

function bienvenidx() {
  if (!data) {
    window.location.href = "login.html";
  }
}
bienvenidx();

function user() {
  document.getElementById("user").innerHTML = localStorage.getItem("username");
}
user();

// Cerrar Sesion
const cerrar_sesion = document.getElementById("cerrar_sesion");

cerrar_sesion.addEventListener("click", (a) => {
  localStorage.removeItem("userStatus");
  window.location.href = "login.html";
});

// Cambio de Temas
const temaOscuro = () => {
  document.querySelector("body").setAttribute("data-bs-theme", "dark");
  document.querySelector("#dl-icon").setAttribute("class", "bi bi-sun-fill");
  localStorage.setItem("tema", "oscuro");
};

const temaClaro = () => {
  document.querySelector("body").setAttribute("data-bs-theme", "light");
  document.querySelector("#dl-icon").setAttribute("class", "bi bi-moon-fill");
  localStorage.removeItem("tema");
};

const temaActivo = () => {
  let tema = localStorage.getItem("tema");
  if (tema == "oscuro") {
    return temaOscuro();
  } else {
    return temaClaro();
  }
};

const cambiarTema = () => {
  document.querySelector("body").getAttribute("data-bs-theme") === "light"
    ? temaOscuro()
    : temaClaro();
};

//Apertura del DOM
document.addEventListener("DOMContentLoaded", function () {
  //Fetch para la información del carrito de compras
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      carrito(resultObj.data.articles);
    }
  });
  temaActivo();
});

function carrito(array) {
  const cartItems = document.getElementById("cartItems");

  array.forEach((element) => {
    const inputId = `input_${element.name}`; // Crea ID para el input
    const subtotalId = `subtotal_${element.name}`; // Crea ID para los elementos del subtotal

    // Crea la fila de la tabla
    cartItems.innerHTML += `
      <tr scope="row">
        <td><img width="150" src=${element.image} alt="Producto"> </td>
        <td>${element.name}</td>
        <td>${element.currency} ${element.unitCost}</td>
        <td><input id="${inputId}" type="number" class="form-control" value="${
      element.count
    }" min="1"></td>
        <td>${element.currency} <span id="${subtotalId}">${
      element.count * element.unitCost}</span></td>
        <td><button class="btn btn-danger">Eliminar</button></td>
      </tr>`;
      
    // Agrega evento input para actualizar el subtotal
    const inputElement = document.getElementById(inputId);
    const subtotalElement = document.getElementById(subtotalId);

    inputElement.addEventListener("input", () => {
      const cantidad = parseInt(inputElement.value);
      const nuevoSubtotal = cantidad * element.unitCost;
      subtotalElement.textContent = nuevoSubtotal;
    });
  });
}

