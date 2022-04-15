// IMPORTS

// CONSTS
const localUser = JSON.parse(localStorage.getItem('Means_userLogued'))

const insigniasDiv = document.getElementById("insignias")

const nameUser = document.getElementById("nameUser")
const iconProfile = document.getElementById("iconoPerfil")
const backgroundProfile = document.getElementById("imagenPerfil")
const emailUser = document.getElementById("emailUser")
const phoneUser = document.getElementById("phoneUser")

// FUNCTIONS
if (localUser) loadUser()

function loadUser() {
    // Name
    nameUser.innerHTML = localUser.name.toUpperCase()

    // Icon
    iconProfile.src = localUser.icono ? "../Imagenes/Pics/hombre.png" : "../Imagenes/Pics/hombre.png"

    // Background Profile
    backgroundProfile.style.backgroundImage = 'linear-gradient(' + localUser.backgroundProfile[0] + ', ' + localUser.backgroundProfile[1] + ')'

    // Data
    emailUser.innerHTML = localUser.email
    phoneUser.innerHTML = localUser.phone

    // Insignias
    localUser.insignias.forEach(e => {addInsignia(e)});
}

function addInsignia(url) {
    insigniasDiv.innerHTML += `<img src=${url}>`
}

function ppal()
{
    window.open("../html/portada.html")
}

function cambioColor()
{
    var color1 = document.getElementById("miColor1").value
    var rgbColor1 = document.getElementById("color1");

    var color2 = document.getElementById("miColor2").value
    var rgbColor2 = document.getElementById("color2");


    rgbColor1.innerHTML = color1;
    rgbColor2.innerHTML = color2;

    var fondo = document.getElementById("fondo");

    fondo.style.background = 'linear-gradient(' + color1 + ', ' + color2 + ')';
}

function pantallaEmergente()
{
    
    var pantallaEmergente = document.getElementById("pantallaEmergente");
    pantallaEmergente.style.visibility  = "visible";
    
}

var imagenesLogo = document.getElementsByClassName("icono");

for(var i = 0;i<imagenesLogo.length;i++)
{
    imagenesLogo[i].addEventListener("click", cambiarIcono);
    imagenesLogo[i].style.cursor = "pointer";
}
var iconoPerfil = document.getElementById("miIconoPerfil")
var url;
var iconos = document.getElementsByClassName("icono")
var arrayIconos = [];

for ( var i = 0; i < iconos.length;i++)
{
    arrayIconos[i] = iconos[i];
  
}

function cambiarIcono(event)
{
    var icono = event.target;
     url= icono.src;
     icono.style.borderStyle = "solid";
     icono.style.borderWidth = "5px";
     icono.style.borderColor = " #7E16EB";
     for(var i = 0;i < arrayIconos.length;i++)
     {
         if(arrayIconos[i] != icono)
         {
            arrayIconos[i].style.borderColor = "white";


         }
     }
     
    
     
    


}
function guardarCambios()
{
    var pantallaEmergente = document.getElementById("pantallaEmergente");
    var imagenPerfil = document.getElementById("imagenPerfil");
    var color1 = document.getElementById("miColor1").value
    

    var color2 = document.getElementById("miColor2").value
    
    imagenPerfil.style.background = 'linear-gradient(' + color1 + ', ' + color2 + ')';
    pantallaEmergente.style.visibility  = "hidden";
    iconoPerfil.src = url;

}

function cerrarPestaña()
{
    var pantallaEmergente = document.getElementById("pantallaEmergente");
    pantallaEmergente.style.visibility  = "hidden";
}
var categorias = document.getElementsByClassName("categoria");
var arrayCat = [];
for(var i = 0;i < categorias.length;i++)
{
 arrayCat[i] = categorias[i];
 arrayCat[i].addEventListener("click", cambiarCat);
 arrayCat[i].style.cursor = "pointer";
}
function cambiarCat(event)
{
    var cambio = event.target;
    cambio.style.color = "#7E16EB";
    for(var i = 0;i < arrayCat.length;i++)
    {
        if(arrayCat[i] != cambio)
        {
            arrayCat[i].style.color ="black";
        }
    }
}