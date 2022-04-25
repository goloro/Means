// IMPORTS
import { RequestHandlerClass } from '../JS/requestHandler.js'

// CONSTS
const RequestHandler = new RequestHandlerClass();

//div
const divInfo = document.getElementById("divInfoPost");

//METODOS

//BUSCAR TODOS LOS POST @GetMapping("/") HECHO
//BUSCAR POST POR IDPOST @GetMapping("/{idPost}")
// BUSCAR POR ID USUARIO @GetMapping("/user/{idUser}") HECHO EN PERFIL.JS
//CREAR POST @PostMapping("/create")
//EDITAR POST @PutMapping("/edit/{idPost}")
//BORRAR POST @DeleteMapping("/delete/{idPost}")

//FUNCTIONS
viewPosts();

//EVENT LISTENER
const btnPublicar2 = document.querySelector("#btnPublicar2");
btnPublicar2.addEventListener("click", e => {
    e.preventDefault();
    alert("creado");
    createPost();
})
//PARA COGER LA URL DE LA IMG PARA EL POST
let img;
const imgCat = document.querySelector(".imgCat");
imgCat.addEventListener("click", e => {
    e.preventDefault();
    img = e.target;
    alert("img elegida");
    alert(img.src)
})

//FUNCION GENERICA PARA VER TODOS LOS POST
async function viewPosts() {
    
    const post = await RequestHandler.getDefault("http://localhost:8085/post/")
    if (post) await post.forEach(e => { getAllPost(e) });
}

//— Primera llamada —
//Devuelve los resultados y un true en caso de que la longitud del array de posts encontrados sea mayor al límite (20).

//— Siguientes llamadas —
//Se hacen en caso de que en la primera devuelva un true y se envía como parámetro true indicando que tiene que skipear 20 resultados al total de encontrados

// Get
//BUSCAR TODOS LOS POST @GetMapping("/") 
//SOLO SE MUESTRAN DOS POST????
 async function getAllPost(post) {
     let totalPeople = 0
    post.people.forEach(e => { totalPeople += e.count });
    const Allpost = await RequestHandler.getDefault("http://localhost:8085/post/")
    let postCard = `
    <div class="cardPost">
        <div class="postImage">
            <img src="https://www.eventsforce.com/wp-content/uploads/2018/01/onboarding.jpg">
        </div>
        <div class="postBody">
            <div class="postBodyLeft">
                <p id="titlePost">${ post.name }</p>
                <p id="textPost">${ post.smallDescription }</p>
                <button id="moreInfoPost">Más Información</button>
            </div>
            <div class="postBodyRight">
                <div class="postBodyRightTop">
                    <div>
                        <img src="https://api.iconify.design/uil/favorite.svg?color=%23ffd600">
                        <img src="https://api.iconify.design/bi/chat-square-dots-fill.svg?color=%23514f4f">
                    </div>
                </div>
                <div class="postBodyRightBot">
                    <div class="postBodyRightBotDiv">
                        <img src="https://api.iconify.design/healthicons/money-bag.svg?color=%23514f4f">
                        <p>${ post.money }</p>
                    </div>
                    <div class="postBodyRightBotDiv">
                        <img src="https://api.iconify.design/fluent/people-20-filled.svg?color=%23514f4f" >
                        <p>${ totalPeople }</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    divInfoPost.innerHTML += postCard
}

//FALTA COGER EL USUARIO DE LA SESION (idUser)
async function createPost() {
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

    const crearPost = await RequestHandler.postDefault("http://localhost:8085/post/create", data)

        inputNombrePost.value="",
        inputDescBr.value="",
        inputDescEx.value="",
        inputPers.value="",
        inputDinero.value="",
        inputFechaIni.value="",
        inputFechaFin.value=""

}

