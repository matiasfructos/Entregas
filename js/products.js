let URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"





fetch(URL)
    .then(res => res.json())
    .then(data => {
        showCard(data.products)
    })


function showCard(array) {
    let contenedor = document.getElementById("contenedor")
    array.forEach(element => {

        contenedor.innerHTML += `<div class="card">
        <div class="card_title">
            <h2>${element.name}</h2>
        </div>
        <div>
          <p>${element.description}</p>
          <p>${element.soldCount} </p>
          <p>Tiene un valor de: ${element.cost} USD</p>
        </div>
        <div class="card_image">
            <img src="${element.image}" alt="${element.name}">
        </div>
        </div>`
        

    });
}




// `<p> ${element.name} 
// ${element.cost} 
// ${element.description}
// ${element.soldCount} 
// <img src="${element.image}"> </p>`;