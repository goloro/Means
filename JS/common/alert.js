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