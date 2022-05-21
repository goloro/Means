// IMPORTS
import { RequestHandlerClass } from '../JS/common/dbCalls/requestHandler.js'

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
        createProblem("La contraseña es incorrecta")
        return
    }


    if (existUser) {
        localStorage.setItem('Means_userLogued', JSON.stringify(existUser))
        localUser = existUser
        window.open("/HTML/app.html", "_self")
    }

    email.value = ""
    password.value = ""
}

async function registro() {
    const name = document.getElementById("campoNameR")
    const email = document.getElementById("campoEmailR")
    const phone = document.getElementById("campoPhoneR")
    const password = document.getElementById("campoPasswordR")

    if(!name.value || name.value.length > 40){
        createProblem("El nombre de usuario no es válido")
        return
    }

    if(!email.value){
        createProblem("El email de usuario no es válido")
        return
    }
    if(!phone.value || phone.value.length > 9 ){
        createProblem("El teléfono no es válido")
        return
    }
    if(!password.value){
        createProblem("No has introducido una contraseña")
        return
    }

    problemCard.style.visibility = "hidden"

    const data = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
        profile: 0
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
        createProblemIn("El nombre de empresa no es válido")
        return
    }

    if(!email.value){
        createProblemIn("El email empresarial no es válido")
        return
    }
    if(!phone.value || phone.value.length > 9 ){
        createProblemIn("El teléfono no es válido")
        return
    }
    if(!password.value){
        createProblemIn("No has introducido una contraseña")
        return
    }

    problemCardIn.style.visibility = "hidden"

    const data = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
        profile: 1
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

const problemCard = document.querySelector(".problemCard")
const msgProblem = document.getElementById("problemMsg")

const problemCardIn = document.querySelector(".problemCardIn")
const msgProblemIn = document.getElementById("problemMsgIn")

function createProblem(msg) {
    msgProblem.innerHTML = msg
    problemCard.style.visibility = "visible"
}


function createProblemIn(msg) {
    msgProblemIn.innerHTML = msg
    problemCardIn.style.visibility = "visible"
}


// EXPORTS
