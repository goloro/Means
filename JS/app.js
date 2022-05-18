// IMPORTS
import { getPosts } from './common/dbCalls/posts.js'

// CONSTS
const localUser = JSON.parse(localStorage.getItem('Means_userLogued'))

const backgroundProfileCreatePost = document.getElementById("topCreate")
const imgProfileCreatePost = document.getElementById("createImg")

const divPost = document.getElementById("divPost");

// EVENT LISTENERS


// FUNCTIONS
getPosts(3, divPost, {quantity: 10})

if (localUser) loadUser()

function loadUser() {
    // Background Create Post Profile
    backgroundProfileCreatePost.style.backgroundImage = 'linear-gradient(' + localUser.backgroundProfile[0] + ', ' + localUser.backgroundProfile[1] + ')'

    // Image Create Post Profile
    imgProfileCreatePost.src = localUser.icono ? localUser.icono : "../Imagenes/Pics/hombre.png"
}

//AÑADIR A FAVORITOS
divPost.addEventListener("click", e=>{
    if(e.target.id=="btnFavs"){
        e.target.src="https://upload.wikimedia.org/wikipedia/commons/1/18/Estrella_amarilla.png";
        e.target.style.width="40px";
        e.target.style.heigth="40px";

        //
    }
    
})
