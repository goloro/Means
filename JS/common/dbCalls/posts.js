// IMPORTS
import { RequestHandlerClass } from './requestHandler.js'

// CONSTS
const RequestHandler = new RequestHandlerClass();

const divBackTransparent = document.getElementById("divBackTransparent");
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
export async function getPosts(callOption, postsContainer, options) {
    // callOption [0] -> POSTS HOME
    // callOption [1] -> POSTS PROFILE
    // callOption [2] -> SEARCH BY ID POST
    // callOption [3] -> SEARCH HOME POSTS

    let posts
    switch (callOption) {   
        case 0: {
            posts = await RequestHandler.getDefault("http://localhost:8085/post/")
            break
        }
        case 1: {
            if (options.idUser) posts = await RequestHandler.getDefault("http://localhost:8085/post/user/" + options.idUser)
            break
        }
        case 2: {
            if (options.idPost) posts = await RequestHandler.getDefault("http://localhost:8085/post/" + options.idPost)
            return posts
        }
        case 3: {
            posts = await RequestHandler.getDefault("http://localhost:8085/post/home/" + options.quantity + "?nextPage=" + false)
            break
        }
    }
    if (posts) await posts.forEach(e => { postCall(e, postsContainer) });
}

async function postCall(post, postContainer) {
    let totalPeople = 0
    if (post.people) post.people.forEach(e => { totalPeople += e.count });

    let totalMoney = post.money ? post.money : 0
    
    const userPost = await RequestHandler.getDefault("http://localhost:8085/users/" + post.idUser, "getUserPost")

    let postCard = `
    <div class="cardPost">
        <div class="postImage">
            <img src="${ post.image }">
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
                <button class="moreInfoPost" id="${ post._id }">Más Información</button>
            </div>
            <div class="postBodyRight">
                <div class="postBodyRightTop">
                    <div>
                        <img id="btnFavs" src="https://api.iconify.design/uil/favorite.svg?color=%23ffd600">
                        <img id="btnChat" src="https://api.iconify.design/bi/chat-square-dots-fill.svg?color=%23514f4f" width="30px">
                    </div>
                </div>
                <div class="postBodyRightBot">
                    <div class="postBodyRightBotDiv">
                        <img src="https://api.iconify.design/healthicons/money-bag.svg?color=%23514f4f">
                        <p>${ totalMoney }</p>
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

    //NO FUNCIONA SIEMPRE. 
    document.querySelector(".moreInfoPost").addEventListener("click", e=>{
        e.preventDefault();
        masInfoPost(e.target.id);
    })
}

export async function createPostCall(post) {
    return await RequestHandler.postDefault("http://localhost:8085/post/create", post)
}

async function masInfoPost(idPost) {
    const post = getPosts(2, undefined, {idPost: idPost})
    console.log(idPost)
    console.log(post)

    let infoPost = `
    <div class="subDivMInfo">
        <div id="divReseniaMI">
            <div id="tituloMI">
                <img src="../Imagenes/Logos/MeansHexagonoSinFondo.png" id="imgLogo">
                <h1>Más información</h1>
            </div>
            <hr>
            <div id="contenidoMI">
                <div id="contenidoFechas">
                    <p>Fecha Inicio: ${ post.startDate }</p>
                    <p>Fecha Fin: ${ post.finishDate }</p>
                </div>
                <div id="contenidoInfo">
                    <div id="recursos">
                        <div id="moneyMI">
                            <img src="https://api.iconify.design/healthicons/money-bag.svg?color=%23e4a951">
                            <p>${ post.money ? post.money : 0 }</p>
                        </div>
                        <div id="peopleMI">
                            <img src="https://api.iconify.design/fluent/people-48-filled.svg?color=%23699bf7">
                            <div id="peopleDivMI">
                            
                            </div>
                        </div>
                    </div>
                    <div id="desc">
                        <p>${ post.largeDescription }</p>
                    </div>
                </div>
            </div>
            <div id="divBTNSMI">
                <button id="contactarMI">Contactar</button>
                <button id="closeMI">Cerrar</button>
            </div>
        </div>
    </div>`

    if(post.people)
        post.people.forEach(e => {
            let peopleDiv = `
                <div>
                    <p id="tipoMI">${ e.tipo }</p>
                    <p id="countMI">${ e.count }</p>
                </div>
            `

            document.getElementById("peopleMI").innerHTML = peopleDiv
        });

    divMasInfoPost.style.display = "flex"
    divMasInfoPost.innerHTML = infoPost

    //CERRAR LA VENTANA FLOTANTE
    document.getElementById("closeMI").addEventListener("click", e=>{
        e.preventDefault();
        
        // div.style.opacity="100%";
        divMasInfoPost.style.display="none";
    })

}