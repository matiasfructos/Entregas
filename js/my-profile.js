document.addEventListener('DOMContentLoaded', function () {
  getUserStatus()
  temaActivo()
  loadUserData()
  showUser()
})

// Bloque encargado del cierre de sesión
document.getElementById('cerrar_sesion').addEventListener('click', (a) => {
  localStorage.removeItem('userStatus')
  localStorage.removeItem('currentUser')
  window.location.href = 'login.html'
})

const userProfileForm = document.getElementById('userProfileForm')
const saveButton = document.getElementById('saveButton')
const FILE_INPUT = document.getElementById('fileInput')
const PROFILE_PICTURE = document.getElementById('previewImage')

let firstName = document.getElementById('firstName')
let middleName = document.getElementById('middleName')
let lastName = document.getElementById('lastName')
let middleLastName = document.getElementById('middleLastName')
let email = document.getElementById('loginemail')
let phone = document.getElementById('phone')

FILE_INPUT.addEventListener('change', function (e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = function (event) {
      const imageDataURL = event.target.result
      const currentUser = getUserData()
      currentUser.image = imageDataURL
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
    }
    reader.readAsDataURL(file)
  }
})

function loadUserData() {
  const currentUser = getUserData()

  firstName.value = currentUser.firstName || ''
  middleName.value = currentUser.middleName || ''
  lastName.value = currentUser.lastName || ''
  middleLastName.value = currentUser.middleLastName || ''
  email.value = currentUser.email || ''
  phone.value = currentUser.phone || ''

  if (currentUser.image) {
    PROFILE_PICTURE.src = currentUser.image
  }
}

saveButton.addEventListener('click', () => {
  let currentUser = getUserData()
  let usuarios = JSON.parse(localStorage.getItem('usuarios'))

  let index = usuarios.findIndex(
    (element) => element.email === currentUser.email
  )
  currentUser.firstName = firstName.value
  currentUser.middleName = middleName.value
  currentUser.lastName = lastName.value
  currentUser.middleLastName = middleLastName.value
  currentUser.phone = phone.value

  usuarios[index] = currentUser
  localStorage.setItem('usuarios', JSON.stringify(usuarios))
  localStorage.setItem('currentUser', JSON.stringify(currentUser))
  loadUserData()

  alert("Tu perfil ha sido actualizado")
})
