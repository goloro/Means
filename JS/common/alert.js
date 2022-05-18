export function createAlert(icon, text) {
    document.getElementById("alert").style.display = "flex"
    document.getElementById("alertIcon").src = icon
    document.getElementById("alertText").innerHTML = text

    // setTimeout(deleteAlert(), 5000)
}

function deleteAlert() {
    document.getElementById("alert").style.display = "none"
    document.getElementById("alertIcon").src = "https://api.iconify.design/fluent/alert-12-regular.svg?color=white"
    document.getElementById("alertText").innerHTML = "Alerta"
}