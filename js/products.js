// Validacion de usuario
const data = localStorage.getItem("userStatus")

function bienvenidx() {
    if (!data) {
        alert("Debe iniciar Sesion")
        window.location.href = "login.html"
    }
}
bienvenidx()

let URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"

//fetch de los datos
fetch(URL)
    .then(res => res.json())
    .then(data => {
        showCard(data.products)
        console.log(data.products)
    })

//crea las tarjetas de los productos
function showCard(array) {
    array.forEach(element => {
        let container = document.getElementById("contenedor")
        container.innerHTML +=
            `<div class="tarjeta">
                <div class="tarjeta-img">
                    <img src="${element.image}" alt="Imágen de un ${element.name}" width="200">
                </div>
                <div class="tarjeta-content">
                    <div class="tarjeta-title">
                        <h5>${element.name}</h3>
                        <p>${element.soldCount} vendidos</p>
                    </div>
                    <div class="tarjeta-body">
                        <h6>${element.description}</h4>
                        <p>${element.currency} ${element.cost}</p>
                    </div>
                </div>
            </div>`
    });
}

// Cerrar Sesion
const cerrar_sesion = document.getElementById("cerrar_sesion")

cerrar_sesion.addEventListener("click", a => {
    localStorage.removeItem("userStatus")
    window.location.href = "login.html"
})




