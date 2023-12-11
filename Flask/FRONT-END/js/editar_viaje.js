function modificar() {
    let id = document.getElementById("id").value
    let destino_ingresado = document.getElementById("destino").value
    let origen_ingresado = document.getElementById("origen").value
    let costo = document.getElementById("costo").value 
    let dias = document.getElementById("dias").value 
    // let imagen_ingresada = document.getElementById("imagen").value 

    let datos = {
        destino: destino_ingresado,
        origen: origen_ingresado,
        costo: costo,
        dias: dias,
        // imagen: imagen_ingresada
    }

    console.log(datos);

    let url = "https://ikimasug6.pythonanywhere.com/update/"+id
    var options = {
        body: JSON.stringify(datos),
        method: 'PUT',
        
        headers: { 'Content-Type': 'application/json' },
        // el navegador seguirá automáticamente las redirecciones y
        // devolverá el recurso final al que se ha redirigido.
        redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("modificado")
            alert("Registro modificado")

            //Puedes utilizar window.location.href para obtener la URL actual, redirigir a otras páginas
           window.location.href = "../index.html";
          
        })
        .catch(err => {
            this.error = true
            console.error(err);
            alert("Error al Modificar")
        })      
}