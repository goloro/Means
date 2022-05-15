// IMPORTS
import { createPostCall } from './common/dbCalls/posts.js'

// CONSTS
const localUser = JSON.parse(localStorage.getItem('Means_userLogued'))

const problemCard = document.querySelector(".problemCard")
const msgProblem = document.getElementById("problemMsg")

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
        const peopleLine = document.createElement("div")
        let lines = divPeopleLines.childElementCount
        peopleLine.id = lines
        peopleLine.innerHTML += `
            <img id="delete${lines}" class="${lines}" src="https://api.iconify.design/akar-icons/trash-can.svg?color=%23fb5050">
            <input id="tipo${lines}" class="leftItemPeopleTable" type="text">
            <input id="number${lines}" class="rigthItemPeopleTable" type="number">
        `
        divPeopleLines.appendChild(peopleLine)
    }

    if (e.target.tagName === "IMG" && e.target.className !== "addLine") {
        divPeopleLines.removeChild(document.getElementById(e.target.className))
        let cont = 
        divPeopleLines.childNodes.forEach(e => {
            e.id = cont
            cont++
        });
        cont = 0
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
let previousIMGCat
let selectedIMGCat
document.getElementById("imgCatCP").addEventListener("click", e => {
    let target = e.target
    if (target.tagName === "IMG") {
        if (previousIMGCat) {
            if (previousIMGCat.src != target.src) {
                previousIMGCat.style.border = "1px solid transparent"
                previousIMGCat.style.boxShadow = "none"

                target.style.border = "1px solid black"
                target.style.boxShadow = "2px 2px 10px 1px rgba(0, 0, 0, 0.2)"

                previousIMGCat = target
            } else {
                target.style.border = "1px solid transparent"
                target.style.boxShadow = "none" 
                previousIMGCat = null
            }
        } else {
            target.style.border = "1px solid black"
            target.style.boxShadow = "2px 2px 10px 1px rgba(0, 0, 0, 0.2)"

            previousIMGCat = target
        }
        selectedIMGCat = target.src
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

function createPost() {
    const name = document.getElementById("namePost")
    const descShort = document.getElementById("descShortPost")
    const descLarge = document.getElementById("descLargePost")
    const startDate = document.getElementById("startDatePost")
    const finishDate = document.getElementById("finishDatePost")
    const money = document.getElementById("moneyPost")
    const people = []

    if (!name.value) {
        createProblem("Falta ponerle un nombre a tu post!")
        return
    }
    if (!descShort.value) {
        createProblem("Falta ponerle una descripción breve a tu post!")
        return
    }
    if (!descLarge.value) {
        createProblem("Falta ponerle una descripción extensa a tu post!")
        return
    }
    if (!startDate.value) {
        createProblem("Falta ponerle una fecha de inicio a tu post!")
        return
    }
    if (!finishDate.value) {
        createProblem("Falta ponerle una fecha de fin a tu post!")
        return
    }
    if (!selectedIMGCat) {
        createProblem("Debes elegir una imagen para tu post!")
        return
    }
    if (document.getElementById("peopleTable").style.display != "flex" && document.getElementById("moneyPost").style.display != "flex") {
        createProblem("Debes solicitar dinero o personas para tu post!")
        return
    }

    const postDoc = {
        idUser: localUser.email,
        name: name,
        smallDescription: descShort,
        largeDescription: descLarge,
        startDate: startDate,
        finishDare: finishDate,
        image: selectedIMGCat,
    }

    let peopleFlag = false
    if (document.getElementById("peopleTable").style.display == "flex") {
        document.getElementById("divPeopleLines").childNodes.forEach(e => {
            if (e.tagName === "DIV") {
                let tipo = document.getElementById("tipo"+e.id).value
                let count = document.getElementById("number"+e.id).value
                if (tipo == "" || count == "" || tipo == " " || count == " " || count == 0) peopleFlag = true
                people.push({
                    type: tipo,
                    count: count
                })
            }
        })
        postDoc.people = people
    }
    if (peopleFlag) {
        createProblem("Rellena el tipo y el número de las personas solicitadas!")
        return
    }
    let moneyFlag = false
    if (document.getElementById("moneyPost").style.display == "flex") {
        if (money.value == "" || money.value == "" || money.value == 0) moneyFlag = true
        postDoc.money = money.value
    }
    if (moneyFlag) {
        createProblem("Debes introducir una cantidad mayor a 0 en el dinero solicitado!")
        return
    }

    problemCard.style.visibility = "hidden"
    createPostCall(postDoc)

    name.value = ""
    descShort.value = ""
    descLarge.value = ""
    money.value = ""
    startDate.value = ""
    finishDate.value = ""
}

function createProblem(msg) {
    msgProblem.innerHTML = msg
    problemCard.style.visibility = "visible"
}