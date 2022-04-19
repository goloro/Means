// IMPORTS
import { RequestHandlerClass } from '../JS/requestHandler.js'

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

    email.value = ""
    password.value = ""

    if (existUser) {
        localStorage.setItem('Means_userLogued', JSON.stringify(existUser))
        localUser = existUser
        window.open("/HTML/app.html", "_self")
    }
}

async function registro() {
    const name = document.getElementById("campoNameR")
    const email = document.getElementById("campoEmailR")
    const phone = document.getElementById("campoPhoneR")
    const password = document.getElementById("campoPasswordR")

    const data = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        password: password.value
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

// EXPORTS
