// IMPORTS
import { createPost } from './common/dbCalls/posts.js'

// CONSTS
const localUser = JSON.parse(localStorage.getItem('Means_userLogued'))

// EVENT LISTENERS
document.getElementById("btnCP").addEventListener("click", e => {
    e.preventDefault()
    createPost()
})
document.getElementById("peopleField").addEventListener("click", e => {
    e.preventDefault()
    const targetId = e.target.id
    const peopleTable = document.getElementById("peopleTable")
    if (targetId == "peopleYes") {
        peopleTable.style.display = "flex"
        changeColorYes(document.getElementById("peopleYes"), document.getElementById("peopleNo"))
    }
    if (targetId === "peopleNo") {
        peopleTable.style.display = "none"
        changeColorNo(document.getElementById("peopleYes"), document.getElementById("peopleNo"))
    }
    if (targetId === "addPeopleLine") {
        const divPeopleLines = document.getElementById("divPeopleLines")
        divPeopleLines.innerHTML += `
        <div id="${divPeopleLines.childElementCount}">
            <input id="tipo${divPeopleLines.childElementCount}" class="leftItemPeopleTable" type="text">
            <input id="number${divPeopleLines.childElementCount}" class="rigthItemPeopleTable" type="number">
        </div>
        `
    }
})
document.getElementById("moneyButtons").addEventListener("click", e => {
    e.preventDefault()
    const targetId = e.target.id
    const moneyInput = document.getElementById("moneyPost")
    if (targetId == "moneyYes") {
        moneyInput.style.display = "flex"
        changeColorYes(document.getElementById("moneyYes"), document.getElementById("moneyNo"))
    }
    if (targetId === "moneyNo") {
        moneyInput.style.display = "none"
        changeColorNo(document.getElementById("moneyYes"), document.getElementById("moneyNo"))
    }
})

// FUNCTIONS
function changeColorYes(btnYes, btnNo) {
    btnYes.style.backgroundColor = "rgb(88, 216, 52)"
    btnNo.style.backgroundColor = "rgb(244, 98, 98)"
}
function changeColorNo(btnYes, btnNo) {
    btnYes.style.backgroundColor = "rgb(156, 222, 138)"
    btnNo.style.backgroundColor = "rgb(245, 41, 41)"
}

function createPostCall() {
    const name = document.getElementById("namePost")
    const descShort = document.getElementById("descShortPost")
    const descLarge = document.getElementById("descLargePost")
    const money = document.getElementById("moneyPost")
    const startDate = document.getElementById("startDatePost")
    const finishDate = document.getElementById("finishDatePost")
}