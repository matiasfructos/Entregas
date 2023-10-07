document.addEventListener("DOMContentLoaded", function () {
  getUserStatus();
  temaActivo();
  showUser();

  //Fetch para la información del carrito de compras
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      carrito(resultObj.data.articles);
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
      element.count * element.unitCost
    }</span></td>
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
