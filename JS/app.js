// IMPORTS

// CONSTS
const localUser = JSON.parse(localStorage.getItem('Means_userLogued'))

const backgroundProfileCreatePost = document.getElementById("topCreate")
const imgProfileCreatePost = document.getElementById("createImg")

// EVENT LISTENERS

// FUNCTIONS
if (localUser) loadUser()

function loadUser() {
    // Background Create Post Profile
    backgroundProfileCreatePost.style.backgroundImage = 'linear-gradient(' + localUser.backgroundProfile[0] + ', ' + localUser.backgroundProfile[1] + ')'

    // Image Create Post Profile
    imgProfileCreatePost.src = localUser.icono ? localUser.icono : "../Imagenes/Pics/hombre.png"
}