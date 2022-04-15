// IMPORTS

// Filtros navegador
document.getElementById("divFiltrosDiv").addEventListener("input", e => {
    document.getElementById(e.target.className).innerHTML = e.target.value
})

// Abrir menu pulsando en icono
document.getElementById("user").addEventListener("click", function() {
    document.getElementById("idMenu").classList.toggle("show")
})

let Login = document.querySelector("#Login");

Login.addEventListener('click', e=>{

    window.open("../HTML/perfil.html", "_self")
})

let SignUp = document.querySelector("#SignUp");

SignUp.addEventListener('click', e=>{
    const localUser = JSON.parse(localStorage.getItem('Means_userLogued'))
    if (localUser) localStorage.removeItem("Means_userLogued")
    window.open("../HTML/portada.html", "_self");
    //****************************************/
    //CUANDO TENGAMOS LOCAL, ELIMINAR LA SESIÓN AQUI
})