// IMPORTS

// CONSTS
const viewRelations = document.getElementById("viewRelations")
const bodyRL = document.getElementById("bodyRL")

// EVENT LISTENER
viewRelations.addEventListener("click", e => {
    if (e.target.src === "https://api.iconify.design/charm/chevron-up.svg?color=%23f8f8f8") {
        viewRelations.src = "https://api.iconify.design/charm/chevron-down.svg?color=%23f8f8f8"
        bodyRL.style.display = "flex"
    }
    else if (e.target.src === "https://api.iconify.design/charm/chevron-down.svg?color=%23f8f8f8") {
        viewRelations.src = "https://api.iconify.design/charm/chevron-up.svg?color=%23f8f8f8"
        bodyRL.style.display = "none"
    }
})

document.getElementById("rightBodySend").addEventListener("submit", e => {
    alert(document.getElementById("sendMSGInput").value)
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