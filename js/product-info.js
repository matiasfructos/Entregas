//CONSTANTES
const BTN = document.getElementById("btn");
const COMMENTS_CONTAINER = document.getElementById("commentsContainer");

// Bloque encargado del cierre de sesión
document.getElementById("cerrar_sesion").addEventListener("click", (a) => {
  localStorage.removeItem("userStatus");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});

//Carta del producto
let cardsContainer = document.getElementById("cardsContainer");

function producto(data) {
  cardsContainer.innerHTML += `
  <div class="container px-4 px-lg-5 my-5">
      <div class="row gx-4 gx-lg-5 align-items-center rounded" style="background-color: #eef; padding: 10px">
        <div class="col-md-6">
          <div id="prodCarousel" class="carousel slide carousel-fade">
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#prodCarousel"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#prodCarousel"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#prodCarousel"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target="#prodCarousel"
                data-bs-slide-to="3"
                aria-label="Slide 4"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="${data.images[0]}" class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="${data.images[1]}" class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="${data.images[2]}" class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="${data.images[3]}" class="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#prodCarousel"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#prodCarousel"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div class="col-md-6">
          <div class="small mb-1">
            ${data.category} | ${data.soldCount} vendidos
          </div>
          <h1 class="display-5 fw-bolder">${data.name}</h1>
          <div class="form-group d-flex">
            <input
              id="buy_input"
              type="number"
              value="1"
              min="1"
              class="form-control"
            />
            <button type="button" onclick="currentProd" class="btn btn-success">
              Comprar
            </button>
          </div>
          <div class="fs-5 mb-5">
            <span>${data.currency} ${data.cost}</span>
          </div>
          <h4>Descripción:</h4>
          <br />
          <p class="lead">${data.description}</p>
          <div class="d-flex"></div>
        </div>
      </div>
    </div>
  `;

}

//Guarda el id del producto
function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}

//Función que agrega productos relacionados en la información del productoa
let productosRelacionados = document.getElementById("productosRelacionados");

function productoRelacionado(data) {
  for (let i = 0; i < data.length; i++)
    productosRelacionados.innerHTML += `
    <div
      onclick="setProdID(${data[i].id})"
      class="card"
      style="width: 18rem; cursor: pointer"
    >
      <img src="${data[i].image}" class="card-img-top" alt=".." />
      <div class="card-body">
        <p class="card-text">${data[i].name}</p>
      </div>
    </div>
    `;
}

document.addEventListener("DOMContentLoaded", function (e) {
  getUserStatus();
  showUser();
  temaActivo();

  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      producto(resultObj.data);
      currentProd(resultObj.data);
      productoRelacionado(resultObj.data.relatedProducts);
    }
  });

  //Fetch para los comentarios
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      comentarios(resultObj.data);
    }
  });
});

function currentProd(product) {
  let prodArray = localStorage.getItem("carrito") || [];
  const producto = {
    id: product.id,
    name: product.name,
    count: product.count,
    unitCost: product.cost,
    currency: product.currency,
    image: product.images[0],
  };
  localStorage.setItem("carrito", JSON.stringify(producto));
}

//Contenedor de comentarios
function comentarios(data) {
  data.forEach((element) => {
    COMMENTS_CONTAINER.innerHTML += `<div class="card">
<div class="card-body">
  <h5>${element.user} | ${element.dateTime}</h5><br>
  ${element.description}<br><br>
  ${mostrarEstrellas(element.score)}
</div>
</div>
<br>`;
  });
}

//Esta funcion agrega un comentario de forma manual, agregando también la puntuación.
function addComment() {
  let comment = document.getElementById("comment").value;
  let rating = document.getElementById("rating").value;
  let date = new Date().toLocaleString();
  let email = JSON.parse(localStorage.getItem("currentUser"))[0].email;

  //Plantilla
  COMMENTS_CONTAINER.innerHTML += `
  <div class="card">
      <div class="card-body">
        <h5>${email} | ${date}</h5>
        <br />
        ${comment}<br /><br />
        ${mostrarEstrellas(rating)}
      </div>
    </div>
    <br />
  `;
  //
  document.getElementById("comment").value = "";
  document.getElementById("rating").value = 1;
}

//Funcion que genera estrellas

function mostrarEstrellas(puntaje) {
  let estrellas = [];
  //El primer  (for) te devuelve x estrellas pintadas
  for (let i = 0; i < puntaje; i++) {
    estrellas.push("<span class='fa fa-star checked'></span>");
  }
  //El segundo (for) te devuelve 5-x sin pintar
  for (let j = 0; j < 5 - puntaje; j++) {
    estrellas.push("<span class='fa fa-star'></span>");
  }
  //El (join) hace que los (elementos) del array se unan
  return estrellas.join("");
}
