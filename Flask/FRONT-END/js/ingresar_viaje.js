function guardar() {
    let destino_ingresado = document.getElementById("destino").value //input
    let origen_ingresado = document.getElementById("origen").value
    let costo = document.getElementById("costo").value 
    let dias = document.getElementById("dias").value 
    // let imagen = document.getElementById("imagen").value 

    console.log(destino_ingresado,origen_ingresado,costo,dias);
    // Se arama el objeto de js 
    let datos = {
        destino: destino_ingresado,
        origen: origen_ingresado,
        costo: costo,
        dias: dias,
        // imagen:imagen
    }
    console.log(datos);
    
    let url = "https://ikimasug6.pythonanywhere.com/registro"
    var options = {
        body: JSON.stringify(datos),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Grabado")
            // Devuelve el href (URL) de la página actual
            window.location.href = "../index.html";  
            
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar" )
            console.error(err);
        })
}