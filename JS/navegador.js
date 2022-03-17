// Filtros navegador
document.getElementById("divFiltrosDiv").addEventListener("input", e => {
    document.getElementById(e.target.className).innerHTML = e.target.value
})

// Abrir menu pulsando en icono
document.getElementById("user").addEventListener("click", function() {
    document.getElementById("idMenu").classList.toggle("show")
})