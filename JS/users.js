// IMPORTS
import { RequestHandlerClass } from '../JS/requestHandler.js'

// CONSTS
const RequestHandler = new RequestHandlerClass()

const gridLogin = document.querySelector(".form-login")
const gridRegistro = document.querySelector(".form-registro")
const btnInicioSesionForm = document.querySelector("#inicioSesionForm")
const btnRegistroForm = document.querySelector("#registroForm")


// EVENT LISTENERS
document.getElementById("btnLogin").addEventListener("click", e => {
    e.preventDefault()
    login()
})
document.getElementById("btnRegistro").addEventListener("click", e => {
    e.preventDefault()
    registro()
})

// FUNCTIONS
async function login() {
    const email = document.getElementById("campoEmailL").value
    const password = document.getElementById("campoPasswordL").value

    const existUser = await RequestHandler.getDefault("http://localhost:8085/users/" + email + "/" + password)

    if (existUser) {alert("Users exists")}
}

function inicioSesionForm(){
    //querySelector() Devuelve el primer elemento del documento
    const gridLogin = document.querySelector(".form-login");
    const gridRegistro = document.querySelector(".form-registro");
    const btnInicioSesionForm = document.querySelector("#inicioSesion");
    const btnRegistroForm = document.querySelector("#registro");

    //Superponer login
    gridRegistro.style.display = "none";
    gridLogin.style.display = "block";

    //ini= background: transparente, color: black
    //regis= backgro: azul, color: white
    btnInicioSesion.style.backgroundColor= "transparent";
    btnInicioSesion.style.color="black";
    
    btnRegistro.style.backgroundColor= "#1641EA";
    btnRegistro.style.color="white";

    
}

function registroForm(){
    const gridLogin = document.querySelector(".form-login");
    const gridRegistro = document.querySelector(".form-registro");

    //Superponer Registro 
    gridLogin.style.display = "none";
    gridRegistro.style.display = "block";

     //ini= background: azul, color: white
    //regis= backgro: transpa, color: black
    const btnInicioSesionForm = document.querySelector("#inicioSesion");
    const btnRegistroForm = document.querySelector("#registro");
    
    btnInicioSesion.style.backgroundColor= "#1641EA";
    btnInicioSesion.style.color="white";
    btnInicioSesion.style.borderTopLeftRadius = "6px";
    btnInicioSesion.style.borderBottomRightRadius = "40px";

    btnRegistro.style.backgroundColor = "transparent";
    btnRegistro.style.color= "black";

}