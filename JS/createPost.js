// IMPORTS
import { RequestHandlerClass } from './common/dbCalls/requestHandler.js'
import { createPostCall } from './common/dbCalls/posts.js'
import { createAlert } from '/JS/common/alert.js';

// CONSTS
const RequestHandler = new RequestHandlerClass();

const localUser = JSON.parse(localStorage.getItem('Means_userLogued'))
const editPost = localStorage.getItem('Means_editPost')

let previousIMGCat
let selectedIMGCat

// EVENT LISTENERS
document.getElementById("btnCP").addEventListener("click", e => {
    e.preventDefault()
    createPost()
})
document.getElementById("btnEPEdit").addEventListener("click", e => {
    e.preventDefault()
    createPost(editPost)
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
if (editPost) {
    const post = await RequestHandler.getDefault("http://localhost:8085/post/" + editPost)

    document.getElementById("namePost").value = post.name
    document.getElementById("descShortPost").value = post.smallDescription
    document.getElementById("descLargePost").value = post.largeDescription
    document.getElementById("startDatePost").value = post.startDate
    document.getElementById("finishDatePost").value = post.finishDate

    const childIMGs = document.getElementById("imgCatCP").childNodes
    childIMGs.forEach(e => {
        if (e.src == post.image) {
            e.style.border = "1px solid black"
            e.style.boxShadow = "2px 2px 10px 1px rgba(0, 0, 0, 0.2)"

            previousIMGCat = e
        }
    });
    selectedIMGCat = post.image

    if (post.money) {
        document.getElementById("moneyPost").style.display = "flex"
        changeColorYes(document.getElementById("moneyYes"), document.getElementById("moneyNo"))
        document.getElementById("moneyPost").value = post.money
    }

    if (post.people) {
        document.getElementById("peopleTable").style.display = "flex"
        changeColorYes(document.getElementById("peopleYes"), document.getElementById("peopleNo"))

        post.people.forEach(e => {
            const divPeopleLines = document.getElementById("divPeopleLines")
            divPeopleLines.innerHTML = ""
            const peopleLine = document.createElement("div")
            let lines = divPeopleLines.childElementCount
            peopleLine.id = lines
            peopleLine.innerHTML += `
                <img id="delete${lines}" class="${lines}" src="https://api.iconify.design/akar-icons/trash-can.svg?color=%23fb5050">
                <input id="tipo${lines}" class="leftItemPeopleTable" type="text" value="${e.type}">
                <input id="number${lines}" class="rigthItemPeopleTable" type="number" value="${e.count}">
            `
            divPeopleLines.appendChild(peopleLine)
        });
    }

    document.getElementById("titleCPh1").innerHTML = "Edit Post"

    document.getElementById("btnCP").style.display = "none"
    document.getElementById("btnEPEdit").style.display = "flex"
}
localStorage.removeItem('Means_editPost')

function changeColorYes(btnYes, btnNo) {
    btnYes.style.backgroundColor = "rgb(88, 216, 52)"
    btnNo.style.backgroundColor = "rgb(244, 98, 98)"
}
function changeColorNo(btnYes, btnNo) {
    btnYes.style.backgroundColor = "rgb(156, 222, 138)"
    btnNo.style.backgroundColor = "rgb(245, 41, 41)"
}

async function createPost(edit) {
    const name = document.getElementById("namePost")
    const descShort = document.getElementById("descShortPost")
    const descLarge = document.getElementById("descLargePost")
    const startDate = document.getElementById("startDatePost")
    const finishDate = document.getElementById("finishDatePost")
    const money = document.getElementById("moneyPost")
    const people = []

    if (!name.value) {
        createAlert("https://api.iconify.design/bi/exclamation-triangle.svg?color=white", "Falta ponerle un nombre a tu post!", "#e65353")
        return
    }
    if (!descShort.value) {
        createAlert("https://api.iconify.design/bi/exclamation-triangle.svg?color=white", "Falta ponerle una descripción breve a tu post!", "#e65353")
        return
    }
    if (!descLarge.value) {
        createAlert("https://api.iconify.design/bi/exclamation-triangle.svg?color=white", "Falta ponerle una descripción extensa a tu post!", "#e65353")
        return
    }
    if (!startDate.value) {
        createAlert("https://api.iconify.design/bi/exclamation-triangle.svg?color=white", "Falta ponerle una fecha de inicio a tu post!", "#e65353")
        return
    }
    if (!finishDate.value) {
        createAlert("https://api.iconify.design/bi/exclamation-triangle.svg?color=white", "Falta ponerle una fecha de fin a tu post!", "#e65353")
        return
    }
    if (!selectedIMGCat) {
        createAlert("https://api.iconify.design/bi/exclamation-triangle.svg?color=white", "Debes elegir una imagen para tu post!", "#e65353")
        return
    }
    if (document.getElementById("peopleTable").style.display != "flex" && document.getElementById("moneyPost").style.display != "flex") {
        createAlert("https://api.iconify.design/bi/exclamation-triangle.svg?color=white", "Debes solicitar dinero o personas para tu post!", "#e65353")
        return
    }

    if(finishDate.value<startDate.value){
        createAlert("https://api.iconify.design/bi/exclamation-triangle.svg?color=white", "La fecha de fin del evento tiene que ser después de la fecha de inicio!", "#e65353")
        return;
    }

    const postDoc = {
        idUser: localUser.email,
        name: name.value,
        smallDescription: descShort.value,
        largeDescription: descLarge.value,
        startDate: startDate.value,
        finishDate: finishDate.value,
        image: selectedIMGCat,
        visibilities: 0
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
        createAlert("https://api.iconify.design/bi/exclamation-triangle.svg?color=white", "Rellena el tipo y el número de las personas solicitadas!", "#e65353")
        return
    }
    let moneyFlag = false
    if (document.getElementById("moneyPost").style.display == "flex") {
        if (money.value == "" || money.value == "" || money.value == 0) moneyFlag = true
        postDoc.money = money.value
    }
    if (moneyFlag) {
        createAlert("https://api.iconify.design/bi/exclamation-triangle.svg?color=white", "Debes introducir una cantidad mayor a 0 en el dinero solicitado!", "#e65353")
        return
    }

    if (!edit) createPostCall(postDoc)
    else await RequestHandler.putDefault("http://localhost:8085/post/edit/" + edit, postDoc)

    localStorage.removeItem("Means_editPost")

    name.value = ""
    descShort.value = ""
    descLarge.value = ""
    money.value = ""
    startDate.value = ""
    finishDate.value = ""
    people.value = ""

    window.open("/HTML/app.html", "_self")
}