// IMPORTS
import { RequestHandlerClass } from './requestHandler.js'
import { createAlert } from '../alert.js';
import { loadChats } from '../../messages.js';

// CONSTS
const RequestHandler = new RequestHandlerClass();

const localUser = JSON.parse(localStorage.getItem('Means_userLogued'))

const divBackTransparent = document.getElementById("divBackTransparent");
const divMasInfoPost = document.getElementById("divMasInfoPost");

//EVENT LISTENER
const divPosts = document.getElementById("divPost") ? document.getElementById("divPost") : document.getElementById("divInfo")
if (divPosts) divPosts.addEventListener("click", e=>{
        e.preventDefault();
        if (e.target.id == "moreInfoPost") masInfoPost(e.target.className);

        if (e.target.id == "btnFavs") {
            if (e.target.src == "https://api.iconify.design/uim/favorite.svg?color=%23ffd600") {
                deleteFav(e.target.className)
                e.target.src="https://api.iconify.design/uil/favorite.svg?color=%23ffd600"
            } else {
                addFav(e.target.className)
                e.target.src="https://api.iconify.design/uim/favorite.svg?color=%23ffd600"
            }
        }

        if (e.target.id == "btnChat") createRelation(e.target.className)
    })

//FUNCTIONS
export async function getPosts(callOption, postsContainer, options) {
    // callOption [0] -> POSTS HOME
    // callOption [1] -> POSTS PROFILE
    // callOption [2] -> SEARCH BY ID POST
    // callOption [3] -> SEARCH HOME POSTS
    // callOption [4] -> FAV POSTS

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
        case 4: {
            posts = options.posts
            break
        }
    }
    if (posts && (callOption === 0 || callOption === 1 || callOption === 3 || callOption === 4)) await posts.forEach(e => { postCall(e, postsContainer) });
}

async function postCall(post, postContainer) {
    let totalPeople = 0
    if (post.people) post.people.forEach(e => { totalPeople += e.count });

    let totalMoney = post.money ? post.money : 0
    
    const userPost = await RequestHandler.getDefault("http://localhost:8085/users/" + post.idUser, "getUserPost")

    let fav = localUser.favs ? localUser.favs.find((fav) => fav == post._id) : undefined
    const favIcon = fav ? "https://api.iconify.design/uim/favorite.svg?color=%23ffd600" : "https://api.iconify.design/uil/favorite.svg?color=%23ffd600"

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
                <button id="moreInfoPost" class="${ post._id }">Más Información</button>
            </div>
            <div class="postBodyRight">
                <div class="postBodyRightTop">
                    <div>
                        <img id="btnFavs" class="${ post._id }" src="${favIcon}">
                        <img id="btnChat" class="${ post.idUser }" src="https://api.iconify.design/bi/chat-square-dots-fill.svg?color=%23514f4f">
                    </div>
                </div>
                <div class="postBodyRightBot">
                    <div class="postBodyRightBotDiv">
                        <img src="https://api.iconify.design/healthicons/money-bag.svg?color=%23514f4f">
                        <p>${ totalMoney + " €" }</p>
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
}

export async function createPostCall(post) {
    return await RequestHandler.postDefault("http://localhost:8085/post/create", post)
}

async function masInfoPost(idPost) {
    const post = await RequestHandler.getDefault("http://localhost:8085/post/" + idPost)

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
                            <p>${ post.money ? post.money + " €" : "No solicita" }</p>
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

    divMasInfoPost.style.display = "flex"
    divMasInfoPost.innerHTML = infoPost
    divBackTransparent ? divBackTransparent.style.display = "flex" : console.log("divBackTransparent NO EXISTE")

    if(post.people)
        post.people.forEach(e => {
            let peopleDiv = `
                <div>
                    <p id="tipoMI">${ e.type }</p>
                    <p id="countMI">${ e.count }</p>
                </div>
            `

            document.getElementById("peopleDivMI").innerHTML += peopleDiv
        })
    else document.getElementById("peopleDivMI").innerHTML += `<p id="noPeople">No solicita</p>`

    // CLOSE MORE INFO
    document.getElementById("closeMI").addEventListener("click", e=>{
        e.preventDefault();
        
        divMasInfoPost.style.display="none";
        divBackTransparent ? divBackTransparent.style.display = "none" : console.log("divBackTransparent NO EXISTE")
    })
}

async function createRelation(idOtherUser) {
    if (idOtherUser != localUser.email) {
        const find = await RequestHandler.getDefault("http://localhost:8085/relations/find/" + localUser.email + "/" + idOtherUser)
        const otherUser = await RequestHandler.getDefault("http://localhost:8085/users/" + idOtherUser)
        if (!find) {
            const todayDate = new Date()
            const relation = {
                creationDate: `${todayDate.getFullYear()}-${todayDate.getMonth()}-${todayDate.getDate()}`,
                userEmail: localUser.email,
                inversorEmail: idOtherUser,
                userAccepted: false,
                inversorAccepted: false,
                messagesList: []
            }
            
            const create = await RequestHandler.postDefault("http://localhost:8085/relations/create", relation)
            if (create) createAlert("https://api.iconify.design/bx/message-alt-add.svg?color=white", "Relation creada con " + otherUser.name, "#65CE76")

            viewRelations.src = "https://api.iconify.design/charm/chevron-down.svg?color=%23f8f8f8"
            bodyRL.style.display = "flex"
            divBackTransparent ? divBackTransparent.style.display = "flex" : console.log("divBackTransparent NO EXISTE")

            loadChats(localUser.email)
        } else createAlert("https://api.iconify.design/bxs/error.svg?color=white", "Ya hay una relation creada con " + otherUser.name, "#e65353")
    }
}

async function addFav(idPost) {
    if (!localUser.favs) localUser.favs = []
    const fav = localUser.favs.find((fav) => fav == idPost)

    if (!fav) {
        localUser.favs.push(idPost)

        localStorage.setItem('Means_userLogued', JSON.stringify(localUser))
        await RequestHandler.putDefault("http://localhost:8085/users/edit/" + localUser.email, localUser)

        createAlert("https://api.iconify.design/uim/favorite.svg?color=white", "Añadido a Favoritos!", "#ffc700")
    }
}

async function deleteFav(idPost) {
    if (!localUser.favs) localUser.favs = []
    const fav = localUser.favs.find((fav) => fav == idPost)

    if (fav) {
        localUser.favs = localUser.favs.filter((fav) => fav != idPost)

        localStorage.setItem('Means_userLogued', JSON.stringify(localUser))
        await RequestHandler.putDefault("http://localhost:8085/users/edit/" + localUser.email, localUser)

        createAlert("https://api.iconify.design/uil/favorite.svg?color=white", "Eliminado de Favoritos!", "#e65353")

        if (document.getElementById("vNavFavs")) {
            const posts = []
            localUser.favs.forEach(async e => {
                let post = await RequestHandler.getDefault("http://localhost:8085/post/" + e)
                posts.push(post)
            })
        
            document.getElementById("divInfo").innerHTML = ""

            setTimeout(getPosts, 500, 4, document.getElementById("divInfo"), { posts: posts })
        }
    }
}