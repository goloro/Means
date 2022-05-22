// CONST
const alert = document.getElementById("alert")
const alertIcon = document.getElementById("alertIcon")
const alertText = document.getElementById("alertText")

function deleteAlert() {
    alert.style.display = "none"
    alertIcon.src = "https://api.iconify.design/fluent/alert-12-regular.svg?color=white"
    alertText.innerHTML = "Alerta"
}

export function createAlert(icon, text, color) {
    alert.style.display = "flex"
    document.getElementById("alertBox").style.backgroundColor = color
    alertIcon.src = icon
    alertText.innerHTML = text

    setTimeout(deleteAlert, 2000)
}

//Lo he tenido que hacer así porque me daba problemas con los id
const alert2 = document.getElementById("alert2")
const alertIcon2 = document.getElementById("alertIcon2")
const alertText2 = document.getElementById("alertText2")

function deleteAlert2() {
    alert2.style.display = "none"
    alertIcon2.src = "https://api.iconify.design/fluent/alert-12-regular.svg?color=white"
    alertText2.innerHTML = "Alerta"
}
export function createAlert2(icon, text, color) {
    alert2.style.display = "flex"
    document.getElementById("alertBox").style.backgroundColor = color
    alertIcon2.src = icon
    alertText2.innerHTML = text

    setTimeout(deleteAlert2, 2000)
}