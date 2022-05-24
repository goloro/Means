

// IMPORTS
import { getPosts } from './common/dbCalls/posts.js'
import { RequestHandlerClass } from './common/dbCalls/requestHandler.js'

// CONSTS
const RequestHandler = new RequestHandlerClass();

const localUser = JSON.parse(localStorage.getItem('Means_userLogued'))

const backgroundProfileCreatePost = document.getElementById("topCreate")
const imgProfileCreatePost = document.getElementById("createImg")

const divPost = document.getElementById("divPost");

// EVENT LISTENERS
document.getElementById("createLinkImg").addEventListener("click", e => {
    localStorage.setItem("Means_ViewProfile", localUser.email)
})
document.getElementById("profileRes").addEventListener("click", e => {
    localStorage.setItem("Means_ViewProfile", localUser.email)
})

//BOTON PARA LLEVARTE A REGISTRO DE INVERSORES !!!!!!!!!!!!! NO FUNCIONA !!!!
document.getElementById("btnInv").addEventListener("click", e=>{
    localStorage.removeItem("Means_userLogued")
    localStorage.setItem('Means_userOption', "registroINV")
    window.open("/HTML/users.html", "_self")
})

// FUNCTIONS
getPosts(3, divPost, {quantity: 10})

if (localUser) {
    const userDoc = await RequestHandler.getDefault("http://localhost:8085/users/" + localUser.email)
    localStorage.setItem('Means_userLogued', JSON.stringify(userDoc))

    loadUser()
}

function loadUser() {
    // Background Create Post Profile
    backgroundProfileCreatePost.style.backgroundImage = 'linear-gradient(' + localUser.backgroundProfile[0] + ', ' + localUser.backgroundProfile[1] + ')'

    // Image Create Post Profile
    imgProfileCreatePost.src = localUser.icono ? localUser.icono : "../Imagenes/Pics/hombre.png"
}