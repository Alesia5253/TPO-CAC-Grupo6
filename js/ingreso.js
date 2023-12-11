function validar() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    if (username == "" || password == "") {
      alert("Por favor ingrese su nombre de usuario y contraseña.");
    } else if (username == "ikimasu" && password == "1234") {
      window.location.href = "../Flask/FRONT-END/index.html";
    } else {
      alert("Nombre de usuario o contraseña incorrectos.");
    }
  }