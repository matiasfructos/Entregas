document.addEventListener('DOMContentLoaded', function () {
  getUserStatus()
  temaActivo()
  showUser()

  //Fetch para la información del carrito de compras
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === 'ok') {
      let productos = JSON.parse(localStorage.getItem('carrito')) || []
      productos.push(resultObj.data.articles[0])
      showCartItems(productos)
    }
  })
})

// Bloque encargado del cierre de sesión
document.getElementById('cerrar_sesion').addEventListener('click', (a) => {
  localStorage.removeItem('userStatus')
  localStorage.removeItem('currentUser')
  window.location.href = 'login.html'
})

function validarNegativo(valor) {
  if (valor.value < 1) {
    valor.value = 1
    return valor.value
  }
}

function showCartItems(array) {
  const cartItems = document.getElementById('cartItems')
  array.forEach((element) => {
    // Crea la fila de la tabla
    cartItems.innerHTML += `
    <div class="row align-items-center text-center g-3 my-1 border-bottom">
      <div class="col-6 col-md-2">
        <img src=${element.image} class="img-fluid rounded" alt="Producto">
      </div>
      <div class="col-6 col-md-2">
        <h4>${element.name}</h4>
      </div>
      <div class="col-6 col-md-2">
        <h5>${element.currency} ${element.unitCost}</h5>
      </div>
      <div class="col-6 col-md-2">
        <input id="${element.id}" type="number" class="form-control" value="${
      element.count
    }" min="1" onchange="validarNegativo(this); calcSubTotal(this, ${
      element.unitCost
    }, ${element.id}); calcTotal()">
      </div>
      <div class="col-6 col-md-2">
        <h5>${element.currency} <span class="${element.id} subtotal">${
      element.count * element.unitCost
    }</span></h5>
      </div>
      <div class="col-6 col-md-2">
        <button class="btn btn-danger botones" value="${
          element.id
        }" onclick="removeProduct(this, ${element.id})">Eliminar</button>
      </div>
    </div>
    `
  })
  calcTotal()
}

function calcSubTotal(elemento, precio, id) {
  let subTotalValue = elemento.value * precio
  let subTotalField = document.getElementsByClassName(id)[0]
  subTotalField.innerHTML = subTotalValue
}

function calcTotal(valorEnvio) {
  let subTotalArray = document.querySelectorAll('.subtotal')
  let envio = valorEnvio ?? 0.07
  let sumOfSubTotal = 0
  subTotalArray.forEach((elemento) => {
    sumOfSubTotal += parseInt(elemento.innerHTML)
  })

  let endSubTotal = document.getElementById('subtotal')
  let endEnvio = document.getElementById('precioEnvio')
  let endTotal = document.getElementById('total')

  endSubTotal.innerHTML = sumOfSubTotal
  endEnvio.innerHTML = Math.floor(sumOfSubTotal * envio)
  endTotal.innerHTML = Math.floor(sumOfSubTotal * envio + sumOfSubTotal)
}

function removeProduct(elemento, id) {
  let productos = JSON.parse(localStorage.getItem('carrito')) || []
  let filtrados = productos.filter((elemento) => elemento.id != id)
  localStorage.setItem('carrito', JSON.stringify(filtrados))
  elemento.parentElement.parentElement.remove()
  calcTotal()
}

function validateInput(input, event) {
  if (!input.checkValidity()) {
    input.setAttribute('class', 'form-control is-invalid')
    event.preventDefault()
  } else {
    input.setAttribute('class', 'form-control is-valid')
  }
}

//Proceso de validación
let miFormulario = document.getElementById('formEnvio')
miFormulario.addEventListener('submit', (e) => {
  let calle = document.getElementById('calle')
  let numero = document.getElementById('numero')
  let esquina = document.getElementById('esquina')
  let ciudad = document.getElementById('ciudad')
  let departamento = document.getElementById('departamento')
  let codigo_postal = document.getElementById('codigo_postal')
  let premium = document.getElementById('premium')
  let express = document.getElementById('express')
  let estandar = document.getElementById('estandar')

  validateInput(calle, e)
  validateInput(numero, e)
  validateInput(esquina, e)
  validateInput(ciudad, e)
  validateInput(departamento, e)
  validateInput(codigo_postal, e)

  if (
    calle.checkValidity() &&
    numero.checkValidity() &&
    esquina.checkValidity() &&
    ciudad.checkValidity() &&
    departamento.checkValidity() &&
    codigo_postal.checkValidity() &&
    ((cardNum.checkValidity() &&
      cardSec.checkValidity() &&
      cardVen.checkValidity()) ||
      cuenta.checkValidity()) &&
    (credito.checkValidity() || transferencia.checkValidity())
  ) {
    alert('Formulario enviado con éxito!')
    localStorage.removeItem('carrito')
    document.getElementById('cartItems').innerHTML = ''
  } else {
    e.preventDefault()
  }

  if (credito.checked) {
    if (!cardNum.checkValidity()) {
      cardNum.setAttribute('class', 'form-control is-invalid')
      e.preventDefault()
      spanMetodo.setAttribute('style', 'color:red')
    } else {
      cardNum.setAttribute('class', 'form-control is-valid')
      spanMetodo.setAttribute('style', 'color:white')
    }
    if (!cardSec.checkValidity()) {
      cardSec.setAttribute('class', 'form-control is-invalid')
      e.preventDefault()
      spanMetodo.setAttribute('style', 'color:red')
    } else {
      cardSec.setAttribute('class', 'form-control is-valid')
      spanMetodo.setAttribute('style', 'color:white')
    }
    if (!cardVen.checkValidity()) {
      cardVen.setAttribute('class', 'form-control is-invalid')
      e.preventDefault()
      spanMetodo.setAttribute('style', 'color:red')
    } else {
      cardVen.setAttribute('class', 'form-control is-valid')
      spanMetodo.setAttribute('style', 'color:white')
    }
  } else if (transferencia.checked) {
    if (!cuenta.checkValidity()) {
      cuenta.setAttribute('class', 'form-control is-invalid')
      e.preventDefault()
      spanMetodo.setAttribute('style', 'color:red')
    } else {
      cuenta.setAttribute('class', 'form-control is-valid')
      spanMetodo.setAttribute('style', 'color:white')
    }
  } else {
    e.preventDefault()
    spanMetodo.setAttribute('style', 'color:red')
  }
})

//Selección de método de compra
let credito = document.getElementById('payment-credit-card')
let cardNum = document.getElementById('credit-card-number')
let cardSec = document.getElementById('credit-card-sec-code')
let cardVen = document.getElementById('credit-card-expire-date')
let cuenta = document.getElementById('bank-account-number')
let transferencia = document.getElementById('payment-bank-account')
let spanMetodo = document.getElementById('display-metodo-pago')
let botonSeleccionar = document.getElementById('btnSeleccionar')

credito.addEventListener('input', () => {
  if (credito.checked == true) {
    cuenta.setAttribute('disabled', 'true')
    cardNum.removeAttribute('disabled')
    cardSec.removeAttribute('disabled')
    cardVen.removeAttribute('disabled')
    cuenta.value = ''
    spanMetodo.textContent = 'El método seleccionado es: tarjeta de crédito'
  }
})

transferencia.addEventListener('input', () => {
  if (transferencia.checked == true) {
    cardNum.setAttribute('disabled', 'true')
    cardSec.setAttribute('disabled', 'true')
    cardVen.setAttribute('disabled', 'true')
    cuenta.removeAttribute('disabled')
    cardNum.value = ''
    cardSec.value = ''
    cardVen.value = ''
    spanMetodo.textContent = 'El método seleccionado es: transferencia'
  }
})

botonSeleccionar.addEventListener('click', (event) => {
  if (credito.checked) {
    if (
      !cardNum.checkValidity() ||
      !cardSec.checkValidity() ||
      !cardVen.checkValidity()
    ) {
      cardNum.reportValidity()
      cardSec.reportValidity()
      cardVen.reportValidity()
    } else {
      botonSeleccionar.setAttribute('data-bs-dismiss', 'modal')
    }
  } else if (transferencia.checked) {
    if (!cuenta.checkValidity()) {
      cuenta.reportValidity()
    } else {
      botonSeleccionar.setAttribute('data-bs-dismiss', 'modal')
    }
  }
})
