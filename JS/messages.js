// IMPORTS
import { RequestHandlerClass } from '../JS/common/dbCalls/requestHandler.js'

// CONSTS
const RequestHandler = new RequestHandlerClass();

const localUser = JSON.parse(localStorage.getItem('Means_userLogued'))

const viewRelations = document.getElementById("viewRelations")
const bodyRL = document.getElementById("bodyRL")
const msgContainer = document.getElementById("rightBodyChat")

const divCreateRate = document.getElementById("divCreateRate")
const divBackTransparent = document.getElementById("divBackTransparent");

let chatId = ""
let rate

// EVENT LISTENER
viewRelations.addEventListener("click", e => {
    if (e.target.src === "https://api.iconify.design/charm/chevron-up.svg?color=%23f8f8f8") {
        viewRelations.src = "https://api.iconify.design/charm/chevron-down.svg?color=%23f8f8f8"
        bodyRL.style.display = "flex"
        divBackTransparent ? divBackTransparent.style.display = "flex" : console.log("divBackTransparent NO EXISTE")

        loadChats(localUser.email)
    }
    else if (e.target.src === "https://api.iconify.design/charm/chevron-down.svg?color=%23f8f8f8") {
        viewRelations.src = "https://api.iconify.design/charm/chevron-up.svg?color=%23f8f8f8"
        bodyRL.style.display = "none"
        divBackTransparent ? divBackTransparent.style.display = "none" : console.log("divBackTransparent NO EXISTE")
    }
})

document.getElementById("leftBody").addEventListener("click", e => {
    if (e.target.className === "userChat") {
        loadMSGS(e.target.id)
        chatId = e.target.id
    }
})

document.getElementById("bodyRL").addEventListener("click", e => {
    if (e.target.className == "menuDivRL" || e.target.className == "menuDivRLOE") {
        if (e.target.id == "closeChat") closeChat()
        if (e.target.id == "rateChat") rateUser()
    }
})

document.getElementById("sendMSGIMG").addEventListener("click", e => {
    addMSG(document.getElementById("sendMSGInput").value)
})
document.getElementById("sendMSGInput").addEventListener("change", e => {
    addMSG(document.getElementById("sendMSGInput").value)
})

// FUNCTIONS
async function addMSG(text) {
    const msg = `
        <div>
            <p class="rightChat">${ text }</p>
        </div> 
    `

    document.getElementById("rightBodyChat").innerHTML += msg

    document.getElementById("sendMSGInput").value = ""

    const msgDoc = {
        sendDate: "", //new Date()
        text: text,
        receiverRead: false,
        sender: localUser._id,
        relationId: chatId
    }

    const msgDB = await RequestHandler.postDefault("http://localhost:8085/relations/msg/create", msgDoc)
    await RequestHandler.putDefault("http://localhost:8085/relations/addMessage/" + chatId +"/" + msgDB._id)
}

export async function loadChats(userEmail) {
    const chats = await RequestHandler.getDefault("http://localhost:8085/relations/user/" + userEmail)

    document.getElementById("leftBody").innerHTML = ""
    chats.forEach(async e => {
        let otherUserEmail
        if (localUser.email === e.userEmail) otherUserEmail = e.inversorEmail
        else if (localUser.email === e.inversorEmail) otherUserEmail = e.userEmail
        else return

        const userChat = await RequestHandler.getDefault("http://localhost:8085/users/" + otherUserEmail)

        const chatDiv = `
            <div class="userChat" id="${e.id}">
                <img class="userChat" id="${e.id}" src="${userChat.icono}">
                <p class="userChat" id="${e.id}">${(userChat.name).split(' ')[0]}</p>
            </div>
        `

        document.getElementById("leftBody").innerHTML += chatDiv
    })

    if (chats[0]?.id) {
        chatId = chats[0].id
        loadMSGS(chats[0].id)
    }
}

async function loadMSGS(idChat) {
    const chat = await RequestHandler.getDefault("http://localhost:8085/relations/" + idChat)
    chat.messagesList.reverse()

    msgContainer.innerHTML = ""
    if (chat.messagesList) {
        chat.messagesList.forEach(async e => {
            const msg = await RequestHandler.getDefault("http://localhost:8085/relations/msg/" + e)
            viewMSG(msg)
        })
    }
}

function viewMSG(msg) {
    let msgClass
    if (msg.sender != localUser._id) msgClass = "leftChat"
    else if (msg.sender == localUser._id) msgClass = "rightChat"

    msgContainer.innerHTML += `
        <div>
            <p class="${msgClass}" id="${msg._id}">${msg.text}</p>
        </div>
    `
}

async function closeChat() {
    await RequestHandler.deleteDefault("http://localhost:8085/relations/delete/" + chatId)

    loadChats(localUser.email)
}

async function rateUser() {
    const chat = await RequestHandler.getDefault("http://localhost:8085/relations/" + chatId)
    let otherUserEmail
    if (chat.userEmail == localUser.email) otherUserEmail = localUser.email
    else if(chat.inversorEmail == localUser.email) otherUserEmail = localUser.email
    const otherUser = await RequestHandler.getDefault("http://localhost:8085/users/" + otherUserEmail)

    let rateDiv = `
    <div class="subDivCR">
        <div id="divReseniaMI">
            <div id="tituloMI">
                <img src="../Imagenes/Logos/MeansHexagonoSinFondo.png">
                <h1>Valorar a ${otherUser.name}</h1>
            </div>
            <hr>
            <div id="contenidoMI">
                <div id="contenidoValoracion">
                    <p>Valoración:</p>
                    <div id="starsContainer">
                        <img id="star1" class="star" src="https://api.iconify.design/uil/favorite.svg?color=%23ffd600">
                        <img id="star2" class="star" src="https://api.iconify.design/uil/favorite.svg?color=%23ffd600">
                        <img id="star3" class="star" src="https://api.iconify.design/uil/favorite.svg?color=%23ffd600">
                        <img id="star4" class="star" src="https://api.iconify.design/uil/favorite.svg?color=%23ffd600">
                        <img id="star5" class="star" src="https://api.iconify.design/uil/favorite.svg?color=%23ffd600">
                    </div>
                </div>
                <div id="contenidoText">
                    <p>Tu opinión sobre este usuario:</p>
                    <textarea id="rateText" rows="9" maxlength="500" placeholder="Escriba su opinió sobre el usuario a valorar"></textarea>
                </div>
            </div>
            <div id="divBTNSMI">
                <button id="enviarRate">Enviar</button>
                <button id="closeCR">Cerrar</button>
            </div>
        </div>
    </div>`
    
    divCreateRate.style.display = "flex"
    divCreateRate.innerHTML = rateDiv
    divBackTransparent ? divBackTransparent.style.display = "flex" : console.log("divBackTransparent NO EXISTE")

    // VALORAR USUARIO
    document.getElementById("starsContainer").addEventListener("click", e => {
        let id = e.target.id
        let idRate = id.charAt((id.length)-1)
        if (idRate != 1) for (let i=1; i<=5; i++) document.getElementById("star" + i).src = "https://api.iconify.design/uil/favorite.svg?color=%23ffd600"
        
        for (let i=1; i<=idRate; i++) {
            let star = document.getElementById("star" + i)
            if (star.src == "https://api.iconify.design/uim/favorite.svg?color=%23ffd600") star.src = "https://api.iconify.design/uil/favorite.svg?color=%23ffd600"
            else star.src = "https://api.iconify.design/uim/favorite.svg?color=%23ffd600"
        }

        rate = e.target.className
    })

    // ENVIAR RATE
    document.getElementById("enviarRate").addEventListener("click", e =>{
        e.preventDefault();

        const text = document.getElementById("rateText").value

        let rateDoc = {
            user: localUser._id,
            valoratedUser: otherUser._id,
            rating: rate,
            text: text
        }

        RequestHandler.postDefault("http://localhost:8085/review/create", rateDoc)
        
        divCreateRate.style.display="none";
        divBackTransparent ? divBackTransparent.style.display = "none" : console.log("divBackTransparent NO EXISTE")
    })

    // CLOSE CREATE RATE
    document.getElementById("closeCR").addEventListener("click", e=>{
        e.preventDefault();
        
        divCreateRate.style.display="none";
        divBackTransparent ? divBackTransparent.style.display = "none" : console.log("divBackTransparent NO EXISTE")
    })
}