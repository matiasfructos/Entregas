// Validacion de usuario
const data = localStorage.getItem("userStatus")

function bienvenidx() {
    if (!data) {
        window.location.href = "login.html"
    }
}
bienvenidx()
const catID = localStorage.getItem("catID")
let URL = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`


//fetch de los datos
fetch(URL)
    .then(res => res.json())
    .then(data => {
        showCard(data.products)
        console.log(data)
        catName(data.catName)
    })
//Selecciona el titulo de la categoría

function catName(cat){
    const catName = document.getElementById("catName")
    catName.innerHTML = cat.toLowerCase()
}

//Botones de filtrado



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

function user() {
    const user = localStorage.getItem("username")
    const name = document.getElementById("user")
    name.innerHTML = user
}
user()

// Cerrar Sesion
const cerrar_sesion = document.getElementById("cerrar_sesion")

cerrar_sesion.addEventListener("click", a => {
    localStorage.removeItem("userStatus")
    window.location.href = "login.html"
})




