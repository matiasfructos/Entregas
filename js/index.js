document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    temaActivo();
});

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

// Validacion de usuario
const data = localStorage.getItem("userStatus")

function bienvenidx() {
    if (!data) {
        window.location.href = "login.html"
    }
}
bienvenidx()

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
