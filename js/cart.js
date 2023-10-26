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

function validarNegativo(valor) {
  if (valor.value < 1) {
    valor.value = 1;
    return valor.value;
  }
}

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
    }" min="1" onchange="validarNegativo(this)" cost="${element.unitCost}"></td>
        <td>${element.currency} <span class="${element.id} subtotal">${
      element.count * element.unitCost
    }
      </span></td>
        <td><button class="btn btn-danger botones" value="${
          element.id
        }">Eliminar</button></td>
      </tr>`;
    total();
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
          if (e.target.value > 0) {
            let span = document.getElementsByClassName(e.target.id);
            span[0].textContent = data.cost * e.target.value;
          }
        });
    });
    elemento.addEventListener("change", (e) => {
      total();
    });
  });

  //Valor del total
  let valorTotal;
  //Función que busca todos los subtotales, los suma y agrega el coste de envío
  function total() {
    let subtotales = document.querySelectorAll(".subtotal");
    let total = [];
    subtotales.forEach((elemento) => {
      let parseSubtotal = parseInt(elemento.innerHTML);
      total.push(parseSubtotal);
    });
    let totalHTML = sumIntegersInArray(total);
    let envioTotal = envio(totalHTML) + totalHTML;
    document.getElementById("precioEnvio").innerHTML = envio(totalHTML);
    document.getElementById("subtotal").innerHTML = totalHTML;
    document.getElementById("total").innerHTML = Math.round(envioTotal);
  }
  //Función que te devuelve la suma de todos los elementos del array
  function sumIntegersInArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      if (Number.isInteger(arr[i])) {
        sum += arr[i];
      }
    }
    return sum;
  }
  //Función que altera un valor según el tipo de envío
  function envio(valor) {
    let premium = document.getElementById("premium");
    let express = document.getElementById("express");
    let estandar = document.getElementById("estandar");
    let valorDelEnvio;
    if (premium.checked) {
      valorDelEnvio = valor * premium.value;
    } else if (express.checked) {
      valorDelEnvio = valor * express.value;
    } else if (estandar.checked) {
      valorDelEnvio = valor * estandar.value;
    }
    console.log(Math.round(valorDelEnvio));
    return Math.round(valorDelEnvio);
  }

  //Se añade un evento a los radios para que al marcarlos afecten el total
  document.getElementById("premium").addEventListener("change", function () {
    if (this.checked) {
      total();
    }
  });

  document.getElementById("express").addEventListener("change", function () {
    if (this.checked) {
      total();
    }
  });

  document.getElementById("estandar").addEventListener("change", function () {
    if (this.checked) {
      total();
    }
  });

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
      total();
    });
  });
}

//Proceso de validación 
let miFormulario = document.getElementById("formEnvio");
console.log(miFormulario);
miFormulario.addEventListener("submit", (e) => {
  let calle = document.getElementById("calle");
  let numero = document.getElementById("numero");
  let esquina = document.getElementById("esquina");
  let ciudad = document.getElementById("ciudad");
  let departamento = document.getElementById("departamento");
  let codigo_postal = document.getElementById("codigo_postal");
  let premium = document.getElementById("premium");
  let express = document.getElementById("express");
  let estandar = document.getElementById("estandar");

  let productosValidacion = document.querySelectorAll(".count");

  productosValidacion.forEach((elemento) => {
    if (!elemento.checkValidity()) {
      elemento.setAttribute("class", "form-control count is-invalid");
      e.preventDefault();
    } else {
      elemento.setAttribute("class", "form-control count is-valid");
    }
  });

  if (
    calle.checkValidity() &&
    numero.checkValidity() &&
    esquina.checkValidity() &&
    ciudad.checkValidity() &&
    departamento.checkValidity() &&
    (cardNum.checkValidity() &&
    cardSec.checkValidity() &&
    cardVen.checkValidity() ||
    cuenta.checkValidity())
  ) {
    alert("Formulario enviado con éxito!");
    localStorage.removeItem("carrito");
    document.getElementById("cartItems").innerHTML = "";
  } else {
    e.preventDefault();
  }

  if (!calle.checkValidity()) {
    calle.setAttribute("class", "form-control is-invalid");
    e.preventDefault();
  } else {
    calle.setAttribute("class", "form-control is-valid");
  }

  if (!codigo_postal.checkValidity()) {
    codigo_postal.setAttribute("class", "form-control is-invalid");
    e.preventDefault();
  } else {
    codigo_postal.setAttribute("class", "form-control is-valid");
  }

  if (!numero.checkValidity()) {
    numero.setAttribute("class", "form-control is-invalid");
    e.preventDefault();
  } else {
    numero.setAttribute("class", "form-control is-valid");
  }

  if (!esquina.checkValidity()) {
    esquina.setAttribute("class", "form-control is-invalid");
    e.preventDefault();
  } else {
    esquina.setAttribute("class", "form-control is-valid");
  }

  if (!ciudad.checkValidity()) {
    ciudad.setAttribute("class", "form-control is-invalid");
    e.preventDefault();
  } else {
    ciudad.setAttribute("class", "form-control is-valid");
  }

  if (!departamento.checkValidity()) {
    departamento.setAttribute("class", "form-control is-invalid");
    e.preventDefault();
  } else {
    departamento.setAttribute("class", "form-control is-valid");
  }

  if (credito.checked) {
    if (!cardNum.checkValidity()) {
      cardNum.setAttribute("class", "form-control is-invalid");
      e.preventDefault();
      spanMetodo.setAttribute("style", "color:red");
    } else {
      cardNum.setAttribute("class", "form-control is-valid");
      spanMetodo.setAttribute("style", "color:white");
    }
    if (!cardSec.checkValidity()) {
      cardSec.setAttribute("class", "form-control is-invalid");
      e.preventDefault();
      spanMetodo.setAttribute("style", "color:red");
    } else {
      cardSec.setAttribute("class", "form-control is-valid");
      spanMetodo.setAttribute("style", "color:white");
    }
    if (!cardVen.checkValidity()) {
      cardVen.setAttribute("class", "form-control is-invalid");
      e.preventDefault();
      spanMetodo.setAttribute("style", "color:red");
    } else {
      cardVen.setAttribute("class", "form-control is-valid");
      spanMetodo.setAttribute("style", "color:white");
    }
  } else if (transferencia.checked) {
    if (!cuenta.checkValidity()) {
      cuenta.setAttribute("class", "form-control is-invalid");
      e.preventDefault();
      spanMetodo.setAttribute("style", "color:red");
    } else {
      cuenta.setAttribute("class", "form-control is-valid");
      spanMetodo.setAttribute("style", "color:white");
    }
  } else {
    e.preventDefault();
    spanMetodo.setAttribute("style", "color:red");
  }

  
});

//Selección de método de compra
let credito = document.getElementById("payment-credit-card");
let cardNum = document.getElementById("credit-card-number");
let cardSec = document.getElementById("credit-card-sec-code");
let cardVen = document.getElementById("credit-card-expire-date");
let cuenta = document.getElementById("bank-account-number");
let transferencia = document.getElementById("payment-bank-account");
let spanMetodo = document.getElementById("display-metodo-pago");

credito.addEventListener("input", () => {
  if (credito.checked == true) {
    cuenta.setAttribute("disabled", "true");
    cardNum.removeAttribute("disabled");
    cardSec.removeAttribute("disabled");
    cardVen.removeAttribute("disabled");
    cuenta.value = "";
    spanMetodo.textContent = "El método seleccionado es: tarjeta de crédito";
  }
});

transferencia.addEventListener("input", () => {
  if (transferencia.checked == true) {
    cardNum.setAttribute("disabled", "true");
    cardSec.setAttribute("disabled", "true");
    cardVen.setAttribute("disabled", "true");
    cuenta.removeAttribute("disabled");
    cardNum.value = "";
    cardSec.value = "";
    cardVen.value = "";
    spanMetodo.textContent = "El método seleccionado es: transferencia";
  }
});