// IMPORTS
import { RequestHandlerClass } from '../JS/requestHandler.js'

// CONSTS
const RequestHandler = new RequestHandlerClass()

const localUser = JSON.parse(localStorage.getItem('Means_userLogued'))

const insigniasDiv = document.getElementById("insignias")

const nameUser = document.getElementById("nameUser")
const iconProfile = document.getElementById("iconoPerfil")
const backgroundProfile = document.getElementById("imagenBackPerfil")
const emailUser = document.getElementById("emailUser")
const phoneUser = document.getElementById("phoneUser")

const ventanaEmergente = document.getElementById("pantallaEmergente");
const fondoChangePerfil = document.getElementById("fondo");
const color1CP = document.getElementById("miColor1")
const color2CP = document.getElementById("miColor2")

let iconSelec
let selecFlag = false
let previousIconId

let previousItemView

const problemCard = document.querySelector(".problemCard")
const msgProblem = document.getElementById("problemMsg")

// Event Listener
document.getElementById("editarPerfilImages").addEventListener("click", e => { viewVentanaEmergente() })

document.getElementById("selectorColores").addEventListener("input", e => {
    let input = e.target
    if (input.className === "inputColor") cambioColor()
})

document.getElementById("guardarCambios").addEventListener("click", e => { guardarCambios() })

document.getElementById("tablaIconos").addEventListener("click", e => {
    let icon = e.target

    if (icon.className === "icono") {
        iconSelec = icon.src

        icon.style.border = "2px solid #7E16EB"

        if (!!previousIconId && !selecFlag) {
            document.getElementById(previousIconId).style.border = "2px solid white"
            if (document.getElementById(previousIconId).src === icon.src) {
                icon.style.border = "2px solid white"
                iconSelec = localUser.icono
            }
        }

        if (selecFlag) selecFlag = false
        else selecFlag = true

        previousIconId = icon.id
    }
})

document.getElementById("closeVE").addEventListener("click", e => { ventanaEmergente.style.visibility  = "hidden"; })

document.querySelector(".bottomNav").addEventListener("click", e => {
    const item = e.target

    if (item.className === "buttonBNav") {
        changeView(item)
        if (item.id == "vNavPost") viewPosts()
        if (item.id == "vNavReviews") viewReviews()
        if (item.id == "vNavFavs") viewFavs()
        if (item.id == "vNavEdit") viewEdit()
    }
})

// FUNCTIONS
if (localUser) loadUser()

function loadUser() {
    // Name
    nameUser.innerHTML = localUser.name.toUpperCase()

    // Icon
    iconProfile.src = localUser.icono ? localUser.icono : "../Imagenes/Pics/hombre.png"

    // Background Profile
    backgroundProfile.style.backgroundImage = 'linear-gradient(' + localUser.backgroundProfile[0] + ', ' + localUser.backgroundProfile[1] + ')'

    // Data
    emailUser.innerHTML = localUser.email
    phoneUser.innerHTML = localUser.phone

    // Insignias
    localUser.insignias.forEach(e => {addInsignia(e)});
}

function addInsignia(url) { insigniasDiv.innerHTML += `<img src=${url}>` }

function cambioColor() {
    fondoChangePerfil.style.background = 'linear-gradient(' + color1CP.value + ', ' + color2CP.value + ')';
}

function viewVentanaEmergente() { ventanaEmergente.style.visibility  = "visible"; }

function guardarCambios() {
    const conditions = conditionsChanges()

    if (conditions != "No errors") {
        createProblem(conditions)
        return
    }

    backgroundProfile.style.background = 'linear-gradient(' + color1CP.value + ', ' + color2CP.value + ')';
    localUser.backgroundProfile = [color1CP.value, color2CP.value]

    ventanaEmergente.style.visibility = "hidden";

    if (iconSelec) { 
        iconProfile.src = iconSelec;
        localUser.icono = iconSelec
    }

    iconSelec = undefined

    const update = updateUser(user)
    if (update === "Usuario editado con éxito") {
        closeProblem()
        cerrarPestaña()
    }
}

function conditionsChanges() {
    if (color1CP.value == "#ffffff" && color2CP.value == "#ffffff") return "No puedes poner ambos colores en blanco"

    return "No errors"
}

function createProblem(msg) {
    msgProblem.innerHTML = msg
    problemCard.style.visibility = "visible"
}

function closeProblem() {
    msgProblem.innerHTML = ""
    problemCard.style.visibility = "hidden"
}

async function updateUser(user) {
    const editUser = await RequestHandler.putDefault("http://localhost:8085/users/edit" + localUser.email, user)
    return editUser
}

function changeView(item) {
    if (!!previousItemView) previousItemView.style.color = "black"

    item.style.color = "#7E16EB";
    previousItemView = item
}

function viewPosts() {

}

function viewReviews() {

}

function viewFavs() {

}

function viewEdit() {

}

// var categorias = document.getElementsByClassName("categoria");
// var arrayCat = [];
// for(var i = 0;i < categorias.length;i++) {
//  arrayCat[i] = categorias[i];
//  arrayCat[i].addEventListener("click", cambiarCat);
//  arrayCat[i].style.cursor = "pointer";
// }
// function cambiarCat(event) {
//     var cambio = event.target;
//     cambio.style.color = "#7E16EB";
//     for(var i = 0;i < arrayCat.length;i++)
//     {
//         if(arrayCat[i] != cambio)
//         {
//             arrayCat[i].style.color ="black";
//         }
//     }
// }