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