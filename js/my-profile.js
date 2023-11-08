document.addEventListener("DOMContentLoaded", function () {
  getUserStatus();
  showUser();
  temaActivo();
});

// Bloque encargado del cierre de sesión
document.getElementById("cerrar_sesion").addEventListener("click", (a) => {
  localStorage.removeItem("userStatus");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});


const userProfileForm = document.getElementById('userProfileForm');
        const firstNameInput = document.getElementById('firstName');
        const middleNameInput = document.getElementById('middleName');
        const lastNameInput = document.getElementById('lastName');
        const middleLastNameInput = document.getElementById('middleLastName');
        const emailInput = document.getElementById('loginemail');
        const phoneInput = document.getElementById('phone');
        const saveButton = document.getElementById('saveButton');
        let emails = localStorage.getItem("email")
        // Simula que el usuario ha iniciado sesión (cambiar esto por tu lógica de autenticación)
        const userData = JSON.parse(localStorage.getItem('userData')) || {
            firstName: '',
            middleName: '',
            lastName: '',
            middleLastName: '',
            email: emails, // Debes obtener el email del usuario logueado
            phone: ''
        };
          
        // Función para cargar datos del usuario en el formulario
        function loadUserData() {
            firstNameInput.value = userData.firstName;
            middleNameInput.value = userData.middleName;
            lastNameInput.value = userData.lastName;
            middleLastNameInput.value = userData.middleLastName;
            emailInput.value = emails;
            phoneInput.value = userData.phone;
        }

        // Carga los datos del usuario al abrir la página
        loadUserData();

        // Maneja el evento de clic en el botón "Guardar"
        saveButton.addEventListener('click', () => {
            // Valida los campos obligatorios
            if (firstNameInput.value === '' || lastNameInput.value === '' || emailInput.value === '') {
                alert('Los campos obligatorios deben completarse.');
            } else {
                // Guarda los datos en el objeto userData
                userData.firstName = firstNameInput.value;
                userData.middleName = middleNameInput.value;
                userData.lastName = lastNameInput.value;
                userData.middleLastName = middleLastNameInput.value;
                userData.phone = phoneInput.value;

                // Guarda los datos en localStorage
                localStorage.setItem('userData', JSON.stringify(userData));
                alert('Datos guardados con éxito.');
            }
        });