// IMPORTS
import { getPosts } from './common/dbCalls/posts.js'

// CONSTS
const localUser = JSON.parse(localStorage.getItem('Means_userLogued'))

const backgroundProfileCreatePost = document.getElementById("topCreate")
const imgProfileCreatePost = document.getElementById("createImg")

const divPost = document.getElementById("divPost");

// EVENT LISTENERS


// FUNCTIONS
getPosts(0, divPost, {})

if (localUser) loadUser()

async function crearPost() {
    const inputNombrePost = document.getElementById("inputNombrePost")
    const inputDescBr = document.getElementById("inputDescBr")
    const inputDescEx = document.getElementById("inputDescEx")
    // const inputPers = document.getElementById("inputPers")
    const inputDinero = document.getElementById("inputDinero")
    const inputFechaIni = document.getElementById("inputFechaIni")
    const inputFechaFin = document.getElementById("inputFechaFin")


    const data = {
        name: inputNombrePost.value,
        smallDescription: inputDescBr.value,
        largeDescription: inputDescEx.value,
        // people: inputPers.value,
        money: inputDinero.value,
        image: img.src,
        startDate: inputFechaIni.value,
        finishDate: inputFechaFin.value
    }

    if (createPost(data) == "Post creado correctamente") {
        inputNombrePost.value="",
        inputDescBr.value="",
        inputDescEx.value="",
        inputPers.value="",
        inputDinero.value="",
        inputFechaIni.value="",
        inputFechaFin.value=""
    }

}

function loadUser() {
    // Background Create Post Profile
    backgroundProfileCreatePost.style.backgroundImage = 'linear-gradient(' + localUser.backgroundProfile[0] + ', ' + localUser.backgroundProfile[1] + ')'

    // Image Create Post Profile
    imgProfileCreatePost.src = localUser.icono ? localUser.icono : "../Imagenes/Pics/hombre.png"
}