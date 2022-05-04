// IMPORTS
import { RequestHandlerClass } from '../JS/requestHandler.js'

// CONSTS
const RequestHandler = new RequestHandlerClass();

//div
const div = document.getElementById("divPost");
const divMasInfoPost = document.getElementById("divMasInfoPost");

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
    deleteInfo()
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
    //  let totalPeople = 0
    // post.people.forEach(e => { totalPeople += e.count });
    
    const userPost = await RequestHandler.getDefault("http://localhost:8085/users/" + post.idUser)

    let postCard = `
    <div class="cardPost">
        <div class="postImage">
            <img src="https://www.eventsforce.com/wp-content/uploads/2018/01/onboarding.jpg">
        </div>
        <div class="postBody">
            <div class="postBodyLeft">
                <div id="postBodyLeftTop">
                    <div class="postUser">
                        <img id="iconUser" src="${ userPost.icono }">
                        <img id="insUser" src="${ userPost.insignias[0] }">
                    </div>
                    <p id="titlePost">${ post.name }</p>
                </div> 
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
                        <p>${ 0 }</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    divPost.innerHTML += postCard

    document.getElementById("moreInfoPost").addEventListener("click", e=>{
        e.preventDefault();
        masInfoPost();
    })
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

function deleteInfo() {
    div.innerHTML = "";
    divMasInfoPost.innerHTML="";
}

// async function viewMasInfoPosts() {
//     deleteInfo()
//     const Infopost = await RequestHandler.getDefault("http://localhost:8085/post/")
//     if (Infopost) await Infopost.forEach(e => { masInfoPost(e) });
// }

//VENTANA FLOTANTE CON MAS INFORMACIÓN
async function masInfoPost(Infopost) {
    let infoPost = `
    <div class="divFlotante2">
    <div id="divResenia">
        <img src="../Imagenes/Logos/MeansHexagonoSinFondo.png" width="110px" id="imgLogo">
        <div id="contenido1">
            <h1>Más información</h1><hr>
            <div id="contenido2">
                <h2>Fecha inicio:</h2><br>
                <br><h2>Fecha fin:</h2>
            </div>
            <div id="personal">
                <img src="../Imagenes/Logos/logoUsuarios.png" width="60px">
                <h4>PERSONAL NECESARIO</h4>

            </div>
            <div id="detalles">
                <h4>DETALLES DEL EVENTO</h4>
                <p></p>

            </div>
            <button id="btnPublicar2">Contactar</button>
            <button id="closeFlotante">Cerrar</button>
    </div>
</div>`

divMasInfoPost.innerHTML += infoPost
div.style.opacity="10%";

//CERRAR LA VENTANA FLOTANTE
document.getElementById("closeFlotante").addEventListener("click", e=>{
    e.preventDefault();
    
    div.style.opacity="100%";
    divMasInfoPost.style.opacity="0%";
    
})

}