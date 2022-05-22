// IMPORTS
import { RequestHandlerClass } from '../JS/common/dbCalls/requestHandler.js'
import { calculateINS } from '../JS/common/insignias.js'
import { createAlert } from '/JS/common/alert.js';
import { createAlert2 } from '/JS/common/alert.js';

// CONSTS
const RequestHandler = new RequestHandlerClass()

const gridLogin = document.querySelector(".form-login")
const gridRegistro = document.querySelector(".form-registro")
const btnInicioSesionForm = document.getElementById("inicioSesionForm")
const btnRegistroForm = document.getElementById("registroForm")


// EVENT LISTENERS
document.getElementById("btnLogin").addEventListener("click", e => {
    e.preventDefault()
    login()
})
document.getElementById("btnRegistro").addEventListener("click", e => {
    e.preventDefault()
    registro()
})
btnInicioSesionForm.addEventListener("click", e => {
    e.preventDefault()
    inicioSesionForm()
})
btnRegistroForm.addEventListener("click", e => {
    e.preventDefault()
    registroForm()
})


// FUNCTIONS
let localUser = JSON.parse(localStorage.getItem('Means_userLogued'))
if (localUser) window.open("/HTML/app.html", "_self")

const localOption = localStorage.getItem('Means_userOption')
if (localOption == "registro") registroForm()
localStorage.removeItem("Means_userOption")

async function login() {
    const email = document.getElementById("campoEmailL")
    const password = document.getElementById("campoPasswordL")

    const existUser = await RequestHandler.getDefault("http://localhost:8085/users/" + email.value + "/" + password.value)
   
    if(!password.value){
        createAlert("https://api.iconify.design/bi/exclamation-triangle.svg?color=white", "La contraseña es incorrecta!", "#e65353")
        return
    }


    if (existUser) {
        localStorage.setItem('Means_userLogued', JSON.stringify(existUser))
        localUser = existUser
        window.open("/HTML/app.html", "_self")
    }

    email.value = ""
    password.value = ""

    await calculateINS(email)
}

async function registro() {
    const name = document.getElementById("campoNameR")
    const email = document.getElementById("campoEmailR")
    const phone = document.getElementById("campoPhoneR")
    const password = document.getElementById("campoPasswordR")

    if(!name.value || name.value.length > 40){
        createAlert("https://api.iconify.design/bi/exclamation-triangle.svg?color=white", "El nombre de usuario no es válido!", "#e65353")
        return
    }

    if(!email.value){
        createAlert("https://api.iconify.design/bi/exclamation-triangle.svg?color=white", "El email de usuario no es válido!", "#e65353")
        return
    }
    if(!phone.value || phone.value.length > 9 ){
        createAlert("https://api.iconify.design/bi/exclamation-triangle.svg?color=white", "El teléfono no es válido!", "#e65353")
        return
    }
    if(!password.value){
        createAlert("https://api.iconify.design/bi/exclamation-triangle.svg?color=white", "No has introducido una contraseña", "#e65353")
        return
    }


    const data = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
        profile: 0,
        insignias: ["../Imagenes/Logos/MeansWhiteBronce.png"],
        icono:"http://127.0.0.1:5501/Imagenes/Pics/3474952.jpg",
        backgroundProfile: ["#254EEC", "#8A26EC"]
    }

    const registUser = await RequestHandler.postDefault("http://localhost:8085/users/register", data)

    name.value = ""
    email.value = ""
    phone.value = ""
    password.value = ""

    if (registUser == true) {
        inicioSesionForm()
    }
}

function inicioSesionForm(){
    //Superponer login
    gridRegistro.style.display = "none";
    gridLogin.style.display = "block";

    btnInicioSesionForm.style.backgroundColor= "transparent";
    btnInicioSesionForm.style.color="black";
    
    btnRegistroForm.style.backgroundColor= "#1641EA";
    btnRegistroForm.style.color="white";
}

function registroForm(){
    //Superponer Registro 
    gridLogin.style.display = "none";
    gridRegistro.style.display = "block";
    
    btnInicioSesionForm.style.backgroundColor= "#1641EA";
    btnInicioSesionForm.style.color="white";
    btnInicioSesionForm.style.borderTopLeftRadius = "6px";
    btnInicioSesionForm.style.borderBottomRightRadius = "40px";

    btnRegistroForm.style.backgroundColor = "transparent";
    btnRegistroForm.style.color= "black";

}

//SUPERPONER EL REGISTRO INVERSORES
const btnInv = document.getElementById("btnInv");
const btnUsuarios = document.getElementById("btnUsuarios");
const divFormInversores = document.getElementById("div-form-inversores");
const divformUser = document.getElementById("div-form-user");

btnInv.addEventListener("click", e=>{
    e.preventDefault;
    divFormInversores.style.display="block";
    divformUser.style.display="none";

})

btnUsuarios.addEventListener("click", e=>{
    e.preventDefault();
    divFormInversores.style.display="none";
    divformUser.style.display="block";
})

async function registroInversores() {
    const name = document.getElementById("campoNameRI")
    const email = document.getElementById("campoEmailRI")
    const phone = document.getElementById("campoPhoneRI")
    const password = document.getElementById("campoPasswordRI")

    if(!name.value || name.value.length > 40){
        createAlert2("https://api.iconify.design/bi/exclamation-triangle.svg?color=white", "El nombre de empresa no es válido!", "#e65353")
        return
    }

    if(!email.value){
        createAlert2("https://api.iconify.design/bi/exclamation-triangle.svg?color=white", "El email empresarial no es válido", "#e65353")
        return
    }
    if(!phone.value || phone.value.length > 9 ){
        createAlert2("https://api.iconify.design/bi/exclamation-triangle.svg?color=white", "El teléfono no es válido", "#e65353")
        return
    }
    if(!password.value){
        createAlert2("https://api.iconify.design/bi/exclamation-triangle.svg?color=white", "No has introducido una contraseña", "#e65353")
        return
    }

    const data = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
        profile: 1, 
        insignias: ["../Imagenes/Logos/MeansLogoInversor.png", "../Imagenes/Logos/MeansWhiteBronce.png"],
        icono:"http://127.0.0.1:5501/Imagenes/Pics/3474952.jpg",
        backgroundProfile: ["#254EEC", "#8A26EC"]
    }

    const registUser = await RequestHandler.postDefault("http://localhost:8085/users/register", data)

    name.value = ""
    email.value = ""
    phone.value = ""
    password.value = ""

    if (registUser == true) {
        divFormInversores.style.display="none";
        divformUser.style.display="block";
    }
}
document.getElementById("btnRegistroInversores").addEventListener("click", e=>{
    e.preventDefault()
    registroInversores()
})
