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
var iconoPerfil
var url;
function cambiarIcono(event)
{
    var icono = event.target;
     url= icono.src;
     
     
     iconoPerfil = document.getElementById("miIconoPerfil");
     
    


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