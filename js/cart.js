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
    console.log(element.unitCost);
    // Crea la fila de la tabla
    cartItems.innerHTML += `
      <tr scope="row">
        <td><img width="150" src=${element.image} alt="Producto"> </td>
        <td>${element.name}</td>
        <td>${element.currency} ${element.unitCost}</td>
        <td><input id="${
          element.id
        }" type="number" class="form-control count" value="${
      element.count
    }" min="1" cost="${element.unitCost}"></td>
        <td>${element.currency} <span class="${element.id} subtotal">${
      element.count * element.unitCost
    }</span></td>
        <td><button class="btn btn-danger botones" value="${
          element.id
        }">Eliminar</button></td>
      </tr>`;
      total()
  });
  
  //Actualización del subtotal en tiempo real
  let productos = document.querySelectorAll(".count");
  productos.forEach((elemento) => {
    elemento.addEventListener("input", (e) => {
      fetch(
        `https://japceibal.github.io/emercado-api/products/${e.target.id}.json`
      )
        .then((res) => res.json())
        .then((data) => {
          let span = document.getElementsByClassName(e.target.id);
          span[0].textContent = data.cost * e.target.value;
        });
      });
      elemento.addEventListener("change", (e) => {
        total()
      })
  });


  //Función que busca todos los subtotales y los suma
  function total (){
    let subtotales = document.querySelectorAll(".subtotal")
    let total = []
    subtotales.forEach((elemento) => {
      let parseSubtotal = parseInt(elemento.innerHTML)
      total.push(parseSubtotal)
})
console.log(total)
let totalHTML = sumIntegersInArray(total)
document.getElementById("total").innerHTML = totalHTML

  }
//Función que te devuelve la suma de todos los elementos del array
  function sumIntegersInArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      if (Number.isInteger(arr[i])) {
        sum += arr[i];
      }
    }
    console.log(sum)
    return sum;
  }

  
  // Intento de función que te devuelve el
 // valor activo de los radios para actualizar el total segun el tipo de envio

//   // Get a reference to the form element
// const shippingForm = document.getElementById("shippingForm");

// // Add a submit event listener to the form
// shippingForm.addEventListener("submit", function(event) {
//   // Prevent the form from actually submitting (you can handle the form submission here if needed)
//   event.preventDefault();

//   // Get the selected shipping option by name
//   const tipoEnvioRadios = document.querySelectorAll('input[name="tipoenvio"]');
//   let selectedValue = null;

//   tipoEnvioRadios.forEach(radio => {
//     if (radio.checked) {
//       selectedValue = radio.value;
//     }
//   });
//   console.log("Selected Value: " + selectedValue);
// });




//Botón de eliminar
  let botones = document.querySelectorAll(".botones");
  botones.forEach((elemento) => {
    elemento.addEventListener("click", (e) => {
      let productos = JSON.parse(localStorage.getItem("carrito")) || [];
      let filtrados = productos.filter(
        (elemento) => elemento.id != e.target.value
      );
      localStorage.setItem("carrito", JSON.stringify(filtrados));
      e.target.parentElement.parentElement.remove();
    });
  });
}
