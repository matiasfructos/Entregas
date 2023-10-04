//CONSTANTES
const BTN = document.getElementById("btn")
const COMMENTS_CONTAINER = document.getElementById("commentsContainer")

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

//Carta del producto
let cardsContainer = document.getElementById("cardsContainer");

function producto(data) {
  cardsContainer.innerHTML = `
<div class="container px-4 px-lg-5 my-5">
<div class="row gx-4 gx-lg-5 align-items-center">
<div class="col-md-6">
<div id="prodCarousel" class="carousel slide carousel-fade">
<div class="carousel-indicators">
  <button type="button" data-bs-target="#prodCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#prodCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#prodCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
  <button type="button" data-bs-target="#prodCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
</div>
<div class="carousel-inner">
  <div class="carousel-item active">
    <img src="${data.images[0]}" class="d-block w-100" alt="...">
  </div>
  <div class="carousel-item">
    <img src="${data.images[1]}" class="d-block w-100" alt="...">
  </div>
  <div class="carousel-item">
    <img src="${data.images[2]}" class="d-block w-100" alt="...">
  </div>
  <div class="carousel-item">
    <img src="${data.images[3]}" class="d-block w-100" alt="...">
  </div>
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#prodCarousel" data-bs-slide="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#prodCarousel" data-bs-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="visually-hidden">Next</span>
</button>
</div>
</div>
<div class="col-md-6">
<div class="small mb-1">${data.category} | ${data.soldCount} vendidos</div>
<h1 class="display-5 fw-bolder">${data.name}</h1>
<div class="fs-5 mb-5">
<span>${data.currency} ${data.cost}</span>
</div>
<h4>Descripción:</h4><br>
<p class="lead">${data.description}</p>
<button type="button" id="buy_btn" class="btn btn-success">Comprar</button>
</div>
</div>
</div>
`
};

//Guarda el id del producto
function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html"
}

//Función que agrega productos relacionados en la información del productoa
let productosRelacionados = document.getElementById("productosRelacionados")

function productoRelacionado(data) {
  for (let i = 0; i < data.length; i++)
    productosRelacionados.innerHTML +=
      `<div onclick="setProdID(${data[i].id})" class="card" style="width: 18rem; cursor: pointer">
  <img src="${data[i].image}" class="card-img-top" alt="..">
  <div class="card-body">
    <p class="card-text">${data[i].name}</p>
  </div>
</div>`
}


//Comentario y calificacion de productos
document.addEventListener("DOMContentLoaded", function (e) {

  //Fetch para la información del producto
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      console.log(resultObj.data)
      producto(resultObj.data)
      productoRelacionado(resultObj.data.relatedProducts)
    }
  })

  //Fetch para los comentarios
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      console.log(resultObj.data)
      comentarios(resultObj.data)
    }
  })
  temaActivo()

});

//Contenedor de comentarios
function comentarios(data) {
  data.forEach(element => {
    COMMENTS_CONTAINER.innerHTML +=
      `<div class="card">
<div class="card-body">
  <h5>${element.user} | ${element.dateTime}</h5><br>
  ${element.description}<br><br>
  ${mostrarEstrellas(element.score)}
</div>
</div>
<br>`
  });
}

//Esta funcion agrega un comentario de forma manual, agregando también la puntiación.
function addComment() {
  let comment = document.getElementById("comment").value;
  let rating = document.getElementById("rating").value;
  let date = new Date().toLocaleString();

  //Plantilla
  COMMENTS_CONTAINER.innerHTML +=
    `<div class="card">
<div class="card-body">
  <h5>${localStorage.getItem("username")} | ${date} </h5><br>
  ${comment}<br><br>
  ${mostrarEstrellas(rating)}
</div>
</div>
<br>`
  //
  document.getElementById("comment").value = ""
  document.getElementById("rating").value = 1
}

//Funcion que genera estrellas

function mostrarEstrellas(puntaje) {
  let estrellas = []
  //El primer  (for) te devuelve x estrellas pintadas
  for (let i = 0; i < puntaje; i++) {
    estrellas.push("<span class='fa fa-star checked'></span>");
  }
  //El segundo (for) te devuelve 5-x sin pintar
  for (let j = 0; j < (5 - puntaje); j++) {
    estrellas.push("<span class='fa fa-star'></span>");
  }
  //El (join) hace que los (elementos) del array se unan
  return estrellas.join("")
}

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