// IMPORTS
import { RequestHandlerClass } from './requestHandler.js'

// CONSTS
const RequestHandler = new RequestHandlerClass();

const div = document.getElementById("divPost");
const divMasInfoPost = document.getElementById("divMasInfoPost");

//EVENT LISTENER
// const btnPublicar2 = document.querySelector("#btnPublicar2");
// btnPublicar2.addEventListener("click", e => {
//     e.preventDefault();
//     createPost();
// })
// let img;
// const imgCat = document.querySelector(".imgCat");
// imgCat.addEventListener("click", e => {
//     e.preventDefault();
//     img = e.target;
//     alert("img elegida");
//     alert(img.src)
// })

//FUNCTIONS
export async function getPosts(callOption, postsContainer, ids) {
    // callOption [0] -> POSTS HOME
    // callOption [1] -> POSTS PROFILE
    // callOption [2] -> SEARCH BY ID POST

    let posts
    switch (callOption) {   
        case 0: {
            posts = await RequestHandler.getDefault("http://localhost:8085/post/")
            break
        }
        case 1: {
            if (ids.idUser) posts = await RequestHandler.getDefault("http://localhost:8085/post/user/" + ids.idUser)
            break
        }
        case 2: {
            if (ids.idPost) posts = await RequestHandler.getDefault("http://localhost:8085/post/" + ids.idPost)
            break
        }
    }
    if (posts && posts.length > 1) await posts.forEach(e => { postCall(e, postsContainer) });
    if (posts.length > 1) postCall(posts, postsContainer)
}

async function postCall(post, postContainer) {
    let totalPeople = 0
    if (post.people) post.people.forEach(e => { totalPeople += e.count });
    
    const userPost = await RequestHandler.getDefault("http://localhost:8085/users/id/" + post.idUser)

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
                        <p>${ totalPeople }</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    postContainer.innerHTML += postCard

    document.getElementById("moreInfoPost").addEventListener("click", e=>{
        e.preventDefault();
        // masInfoPost();
    })
}

export async function createPostCall(data) {
    return await RequestHandler.postDefault("http://localhost:8085/post/create", data)
}

async function masInfoPost(idPost) {
    const post = getPosts(2, undefined, {idPost: idPost})

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