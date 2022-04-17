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

let previousItemView = document.getElementById("vNavPost")
const divInfo = document.getElementById("divInfo")

const problemCard = document.querySelector(".problemCard")
const msgProblem = document.getElementById("problemMsg")

// EVENT LISTENERS
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
viewPosts()

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

async function viewPosts() {
    deleteInfo() 

    const post = await RequestHandler.getDefault("http://localhost:8085/post/user/" + localUser.email)
    if (post) post.forEach(e => { loadPost(e) });
}
async function viewReviews() {
    deleteInfo()

    const review = await RequestHandler.getDefault("http://localhost:8085/review/user/" + localUser.email)
    if (review) review.forEach(e => { loadReviews(e) })
}
function viewFavs() {
    deleteInfo()

    const post = localUser.favs
    post.forEach(e => { loadPost(e) });
}
function viewEdit() {
    deleteInfo()


}

function deleteInfo() {
    divInfo.innerHTML = ""
}

function loadPost(post) {
    let postCard = `
    <div class="cardPost">
        <div class="postImage">
            <img src="https://www.eventsforce.com/wp-content/uploads/2018/01/onboarding.jpg">
        </div>
        <div class="postBody">
            <div class="postBodyLeft">
                <p id="titlePost">${ post.name }</p>
                <p id="textPost">${ post.smallDescription }</p>
                <button id="moreInfoPost">Más Información</button>
            </div>
            <div class="postBodyRight">
                <div class="postBodyRightTop">
                    <div>
                        <img src="https://api.iconify.design/uil/favorite.svg?color=%23ffd600">
                        <img src="https://api.iconify.design/bi/chat-square-dots-fill.svg?color=%23514f4f">
                    </div>
                </div>
                <div class="postBodyRightBot">
                    <div>
                        <div class="postBodyRightBotDiv">
                            <img>
                            <p></p>
                        </div>
                        <div class="postBodyRightBotDiv">
                            <img>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    divInfo.innerHTML += postCard
}

function loadReviews(review) {
    let reviewCard = `
    <div class="cardReview">
        <div class="revTop">
            <div class="revUser">
                <img id="iconUser" src="">
                <img id="insUser" src="">
            </div>
            <div class="revStars">
                <img src="https://api.iconify.design/uil/favorite.svg?color=%23ffd233">
                <img src="https://api.iconify.design/uil/favorite.svg?color=%23ffd233">
                <img src="https://api.iconify.design/uil/favorite.svg?color=%23ffd233">
                <img src="https://api.iconify.design/uil/favorite.svg?color=%23ffd233">
                <img src="https://api.iconify.design/uil/favorite.svg?color=%23ffd233">
            </div>
        </div>
        <div class="revBot">
            <p id="revTxt">${ review.text }</p>
        </div>
    </div>`

    divInfo.innerHTML += reviewCard
}