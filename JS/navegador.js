// IMPORTS
import { RequestHandlerClass } from "./common/dbCalls/requestHandler.js"
import { postCall, getPosts } from './common/dbCalls/posts.js'

// CONST
const RequestHandler = new RequestHandlerClass();

const localUser = JSON.parse(localStorage.getItem('Means_userLogued'))

const container = document.getElementById("divPost") 

let result = await RequestHandler.getDefault("http://localhost:8085/post/")

// Filtros navegador
document.getElementById("divFiltrosDiv").addEventListener("input", e => {
    document.getElementById(e.target.className).innerHTML = e.target.value

    filtradorMoney({max: document.getElementById("maxMoneyIn").value, min: document.getElementById("minMoneyIn").value})
})

// Abrir menu pulsando en icono
document.getElementById("user").addEventListener("click", function() {
    document.getElementById("idMenu").classList.toggle("show")
})

let Login = document.querySelector("#Login");

Login.addEventListener('click', e=>{
    window.open("../HTML/perfil.html", "_self")
})

let SignUp = document.querySelector("#SignUp");

SignUp.addEventListener('click', e=>{
    const localUser = JSON.parse(localStorage.getItem('Means_userLogued'))
    if (localUser) localStorage.removeItem("Means_userLogued")
    window.open("../HTML/portada.html", "_self");
    //****************************************/
    //CUANDO TENGAMOS LOCAL, ELIMINAR LA SESIÓN AQUI
})

document.getElementById("user").addEventListener("click", e => {
    localStorage.setItem("Means_ViewProfile", localUser.email)
})

// BUSCADOR
document.getElementById("buscador").value = ""
document.getElementById("buscador").addEventListener("input", e => {
    let cadena = e.target.value
    if (cadena != "" && cadena != " ") {
        buscador(cadena)
    } else postHomeDefault()
})

async function postHomeDefault() {
    document.getElementById("searchingPeople").style.display = "none"
    getPosts(3, divPost, {quantity: 10})
    result = await RequestHandler.getDefault("http://localhost:8085/post/")
}

async function buscador(cadena) {
    let resultPL

    result = result.filter(p => p.name.toUpperCase().includes(cadena.trim().toUpperCase()))

    container.innerHTML = ""
    result.forEach(e => {
        postCall(e, container)
    });

    const resultPeople = await RequestHandler.getDefault("http://localhost:8085/users/")
    resultPL = resultPeople.filter(p => p.name.toUpperCase().includes(cadena.trim().toUpperCase()))

    if (resultPL.length != 0) {
        const searchingPeople = document.getElementById("searchingPeople")

        if (resultPL.length > 5) resultPL.length = 5

        searchingPeople.innerHTML = ""
        resultPL.forEach(e => {
            let peopleDiv = `
                <div class="subPeopleDiv" id="${e.email}">
                    <img class="${e.email}" id="subPeopleDiv" src="${e.icono}">
                    <p class="${e.email}" id="subPeopleDiv">${e.name}</p>
                </div>
            `

            searchingPeople.innerHTML += peopleDiv
        });

        searchingPeople.style.display = "grid"
    } else {
        searchingPeople.innerHTML = ""
        searchingPeople.style.display = "none"
    }
}

document.getElementById("searchingPeople").addEventListener("click", e => {
    if (e.target.id == "subPeopleDiv") {
        localStorage.setItem("Means_ViewProfile", e.target.className)
        window.open("/HTML/perfil.html", "_self")
    }

    if (e.target.className == "subPeopleDiv") {
        localStorage.setItem("Means_ViewProfile", e.target.id)
        window.open("/HTML/perfil.html", "_self")
    }
})

async function filtradorMoney(money) {
    let max = money.max ? money.max : 10000
    let min = money.min ? money.min : 500 

    result = result.filter(p => p.money > min && p.money < max)

    if (max == 500 || max < min) {
        result = await RequestHandler.getDefault("http://localhost:8085/post/")
        document.getElementById("maxMoneyIn").value = ""
        document.getElementById("minMoneyIn").value = ""

        document.getElementById("maxMoney").innerHTML = ""
        document.getElementById("minMoney").innerHTML = ""
    }

    container.innerHTML = ""
    result.forEach(e => {
        postCall(e, container)
    });
}
//OCULTAR / MOSTRAR BARRA BUSQUEDA RESPONSIVE

const lupa = document.getElementById("lupa");
lupa.addEventListener("click", barraResponsive);

 function barraResponsive()
 {  
   
    var nav = document.getElementsByClassName("filtrosNav");
    
     
     if (nav[0].style.visibility == "hidden")
     {
        nav[0].style.visibility = "visible";
     }
     else
     {
        nav[0].style.visibility = "hidden";
     }
    
    
 }
 function mostrarBarra()
 {
     
     {
        var nav = document.getElementsByClassName("filtrosNav");
        nav.style.visibility = "visible";
     }

 }
 