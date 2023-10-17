const button = document.querySelector(".buscar");
const recuadro = document.querySelector(".recuadro");

button.addEventListener("click", function() {
  recuadro.style.display = "block";
});

window.addEventListener("mousedown", function(e) {
  if (!recuadro.contains(e.target)) {
    recuadro.style.display = "none";
  }
});


// Código para validar el formulario
// Obtener el formulario por su ID
var formulario = document.getElementById("miform");

// Agregar un event listener para el evento submit del formulario

// Event listener es una función que se ejecuta cuando ocurra un evento específico en el documento HTML,
// en este caso es el evento "submit" del formulario.

// Cuando el usuario hace clic en el botón de enviar dentro del formulario,
// se activa el evento "submit".
// Cuando este evento se dispara, la función que se pasa como segundo argumento al event listener se ejecuta


formulario.addEventListener("submit", function (event) {
    // Obtener los valores de los campos
    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("correo").value;
    var telefono = document.getElementById("telefono").value;

    // Validar que el nombre no esté vacío
    if (nombre.trim() === "") {
        alert("Por favor, ingrese su nombre completo.");
        event.preventDefault(); // Evitar que el formulario se envíe
        return false;
    }

    // Validar que el nombre solo contenga letras mayúsculas y minúsculas
    var nombreRegex = /^[A-Za-z]+$/;
    if (!nombreRegex.test(nombre)) {
        alert("El nombre debe contener solo letras mayúsculas y minúsculas.");
        event.preventDefault(); // Evitar que el formulario se envíe
        return false;
    }

    // Validar que el correo electrónico tenga el formato estandar 
    var correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        event.preventDefault();
        return false;
    }

    // Validar que el teléfono contenga solo números y al menos 10 dígitos
    var telefonoRegex = /^\d{10,}$/;
    if (!telefonoRegex.test(telefono)) {
        alert("Por favor, ingrese un número de teléfono válido con al menos 10 dígitos.");
        event.preventDefault();
        return false;
    }

    // Si todas las validaciones pasan, el formulario se enviará normalmente
});



