// Se traen la categoría y el producto desde el local storage
const CAT_ID = localStorage.getItem("catID");
const PROD_ID = localStorage.getItem("prodID");

const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = `https://japceibal.github.io/emercado-api/cats_products/${CAT_ID}.json`;
const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${PROD_ID}.json`;
const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${PROD_ID}.json`;
const CART_INFO_URL =
  "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

// Se encarga de mostrar u ocultar un spinner en la página
let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

// Función que permite que se realicen los fetch
let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

// Valida que el usuario esté logueado
function getUserStatus() {
  if (!localStorage.getItem("userStatus")) {
    window.location.href = "login.html";
  }
}

// Muestra el nombre de usuario en el navbar
function showUser() {
  let firstName = JSON.parse(localStorage.getItem("currentUser")).firstName;
  document.getElementById("user").innerHTML = "Hola, " + firstName;
}

// Funciones encargadas de los temas claro-oscuro
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

function getUserData() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  return currentUser
}
