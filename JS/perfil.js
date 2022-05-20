// IMPORTS
import { RequestHandlerClass } from '../JS/common/dbCalls/requestHandler.js'
import { getPosts } from './common/dbCalls/posts.js'

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

divInfo.addEventListener("click", e => {
    e.preventDefault()
    if (e.target.id === "btnEdit") {
        localUser.phone = document.getElementById("campoPhoneE").value
        localUser.name = document.getElementById("campoNameE").value
        localUser.password = document.getElementById("campoPassE").value

        updateUser(localUser)
    }
})

// FUNCTIONS
viewPosts()

if (localUser) {
    const userDoc = await RequestHandler.getDefault("http://localhost:8085/users/" + localUser.email)
    localStorage.setItem('Means_userLogued', JSON.stringify(userDoc))

    loadUser()
}

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

    const update = updateUser(localUser)
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
    const editUser = await RequestHandler.putDefault("http://localhost:8085/users/edit/" + localUser.email, user)
    if (editUser === true) localStorage.setItem('Means_userLogued', JSON.stringify(localUser))
    return editUser
}

function changeView(item) {
    if (!!previousItemView) previousItemView.style.color = "black"

    item.style.color = "#7E16EB";
    previousItemView = item
}

async function viewPosts() {
    deleteInfo() 

    getPosts(1, divInfo, { idUser: localUser.email })
}
async function viewReviews() {
    deleteInfo()

    const review = await RequestHandler.getDefault("http://localhost:8085/review/user/" + localUser.email)
    if (review) await review.forEach(e => { loadReviews(e) })
}
function viewFavs() {
    deleteInfo()

    const posts = []
    localUser.favs.forEach(async e => {
        let post = await RequestHandler.getDefault("http://localhost:8085/post/" + e)
        posts.push(post)
    })

    setTimeout(getPosts, 1000, 4, divInfo, { posts: posts })
}
function viewEdit() {
    deleteInfo()

    loadEdit()
}

function deleteInfo() {
    divInfo.innerHTML = ""
}

async function loadReviews(review) {
    const userVSender = await RequestHandler.getDefault("http://localhost:8085/users/" + review.user)

    let reviewCard = `
    <div class="cardReview">
        <div class="revTop">
            <div class="revUser">
                <img id="iconUser" src="${ userVSender.icono }">
                <img id="insUser" src="${ userVSender.insignias[0] }">
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

async function loadEdit() {
    let editCard = `
    <div class="cardEdit">
        <form class="form-edit" id="form-edit">
            <div class="form-campo">
                <div>
                    <img src="https://api.iconify.design/fluent/mail-16-filled.svg?color=%23514f4f">
                    <p class="tituloEdit">EMAIL</p>
                </div>
                <p id="editEmail" class="editCampo" >${ localUser.email }</p>
            </div>
            <div class="form-campo">
                <div>
                    <img src="https://api.iconify.design/ant-design/phone-filled.svg?color=%23514f4f">
                    <p class="tituloEdit">PHONE</p>
                </div>
                <input id="campoPhoneE" class="editCampo" type="text" placeholder="Phone" autocomplete required>
            </div>
            <div class="form-campo">
                <div>
                    <img src="https://api.iconify.design/wpf/name.svg?color=%23514f4f">
                    <p class="tituloEdit">NAME</p>
                </div>
                <input id="campoNameE" class="editCampo" type="text" placeholder="Name" autocomplete required>
            </div>
            <div class="form-campo">
                <div>
                    <img src="https://api.iconify.design/bxs/lock-alt.svg?color=%23514f4f">
                    <p class="tituloEdit">PASSWORD</p>
                </div>
                <input id="campoPassE" class="editCampo" type="password" placeholder="Password" autocomplete required>
            </div>
            <button class="buttons" id="btnEdit">Edit</button>
        </form>
    </div>`

    divInfo.innerHTML += editCard

    document.getElementById("campoPhoneE").value = localUser.phone
    document.getElementById("campoNameE").value = localUser.name
    document.getElementById("campoPassE").value = localUser.password
}