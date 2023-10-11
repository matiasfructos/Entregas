document.addEventListener("DOMContentLoaded", function () {
  getUserStatus();
  temaActivo();
  showUser();

  //Fetch para la información del carrito de compras
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      let productos = JSON.parse(localStorage.getItem("carrito")) || [];
      productos.push(resultObj.data.articles[0]);
      carrito(productos);
    }
  });
});

// Bloque encargado del cierre de sesión
document.getElementById("cerrar_sesion").addEventListener("click", (a) => {
  localStorage.removeItem("userStatus");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});

//Carta de elementos del carrito
function carrito(array) {
  const cartItems = document.getElementById("cartItems");
  array.forEach((element) => {

    // Crea la fila de la tabla
    
    cartItems.innerHTML += `
      <tr scope="row">
        <td><img width="150" src=${element.image} alt="Producto"> </td>
        <td>${element.name}</td>
        <td>${element.currency} ${element.unitCost}</td>
        <td><input id="${element.id}" type="number" class="form-control count" value="${element.count}" min="1"></td>
        <td>${element.currency} <span class="${element.id}">${element.count * element.unitCost}</span></td>
        <td><button class="btn btn-danger">Eliminar</button></td>
      </tr>`;
  });
  let productos = document.querySelectorAll(".count");
  productos.forEach((elemento) => {
    elemento.addEventListener("input", (e) => {
      getJSONData(
        `https://japceibal.github.io/emercado-api/products/${e.target.id}.json`
      ).then(function (resultObj) {
        if (resultObj.status === "ok") {
          let span = document.getElementsByClassName(e.target.id);
          span[0].textContent = resultObj.data.cost * e.target.value;
        }
      });

    });
  });
}
