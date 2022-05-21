// IMPORTS
import { RequestHandlerClass } from '../JS/common/dbCalls/requestHandler.js'

// CONSTS
const RequestHandler = new RequestHandlerClass();

const localUser = JSON.parse(localStorage.getItem('Means_userLogued'))

const viewRelations = document.getElementById("viewRelations")
const bodyRL = document.getElementById("bodyRL")
const divBackTransparent = document.getElementById("divBackTransparent")
const msgContainer = document.getElementById("rightBodyChat")

let chatId = ""

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
                <img src="${userChat.icono}">
                <p>${(userChat.name).split(' ')[0]}</p>
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