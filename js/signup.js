document.getElementById('signUpButton').addEventListener('click', () => {
  const fullName = document.getElementById('fullName').value
  const email = document.getElementById('email').value
  const pass = document.getElementById('pass').value

  let arrayNombres = fullName.split(' ')

  let user
  if (arrayNombres.length == 1) {
    console.log('2')
    user = {
      firstName: fullName,
      email: email,
      pass: pass,
    }
  } else if (arrayNombres.length == 2) {
    user = {
      firstName: arrayNombres[0],
      lastName: arrayNombres[1],
      email: email,
      pass: pass,
    }
  } else if (arrayNombres.length == 3) {
    user = {
      firstName: arrayNombres[0],
      lastName: arrayNombres[1],
      middleLastName: arrayNombres[2],
      email: email,
      pass: pass,
    }
  } else if (arrayNombres.length == 4) {
    user = {
      firstName: arrayNombres[0],
      middleName: arrayNombres[1],
      lastName: arrayNombres[2],
      middleLastName: arrayNombres[3],
      email: email,
      pass: pass,
    }
  } else {
    document
      .getElementById('fullName')
      .setAttribute('class', 'form-control is-invalid')
  }

  let users = JSON.parse(localStorage.getItem("usuarios")) || [];
  let isRegistered = users.find((element) => element.email == user.email);

  if (!isRegistered) {
    users.push(user);
    localStorage.setItem("usuarios", JSON.stringify(users));
    window.location.href = "login.html";
  } else {
    document
      .getElementById("email")
      .setAttribute("class", "form-control is-invalid");
  }
})
