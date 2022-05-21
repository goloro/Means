// IMPORTS
import { RequestHandlerClass } from '../JS/common/dbCalls/requestHandler.js'

// CONSTS
const RequestHandler = new RequestHandlerClass();

const localUser = JSON.parse(localStorage.getItem('Means_userLogued'))

const viewRelations = document.getElementById("viewRelations")
const bodyRL = document.getElementById("bodyRL")
const divBackTransparent = document.getElementById("divBackTransparent")

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

document.getElementById("sendMSGIMG").addEventListener("click", e => {
    addMSG(document.getElementById("sendMSGInput").value)
})

// FUNCTIONS
function addMSG(text) {
    const msg = `
        <div>
            <p class="rightChat">${ text }</p>
        </div> 
    `

    document.getElementById("rightBodyChat").innerHTML += msg

    document.getElementById("sendMSGInput").value = ""
}

async function loadChats(userEmail) {
    let url
    alert(localUser.profile)
    switch (localUser.profile) {
        case 0: {
            url = "http://localhost:8085/relations/user/"
            break
        }
        case 1: {
            url = "http://localhost:8085/relations/inversor/"
            break
        }
    }
    const chats = await RequestHandler.getDefault(url + userEmail)
    chats.forEach(async e => {
        const userChat = await RequestHandler.getDefault("http://localhost:8085/users/" + userEmail)

        const chatDiv = `
            <div class="userChat" id="${e._id}">
                <img src="${userChat.image}">
                <p>${userChat.name}</p>
            </div>
        `

        document.getElementById("leftBody").innerHTML += chatDiv
    });
}