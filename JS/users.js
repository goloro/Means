const gridLogin = document.querySelector(".form-login");
const gridRegistro = document.querySelector(".form-registro");
const btnInicioSesion = document.querySelector("#inicioSesion");
const btnRegistro = document.querySelector("#registro");

function inicioSesion(){
    //querySelector() Devuelve el primer elemento del documento
    const gridLogin = document.querySelector(".form-login");
    const gridRegistro = document.querySelector(".form-registro");
    const btnInicioSesion = document.querySelector("#inicioSesion");
    const btnRegistro = document.querySelector("#registro");

    //Superponer login
    gridRegistro.style.display = "none";
    gridLogin.style.display = "block";

    //ini= background: transparente, color: black
    //regis= backgro: azul, color: white
    btnInicioSesion.style.backgroundColor= "transparent";
    btnInicioSesion.style.color="black";
    
    btnRegistro.style.backgroundColor= "#1641EA";
    btnRegistro.style.color="white";

    
}

function registro(){
    const gridLogin = document.querySelector(".form-login");
    const gridRegistro = document.querySelector(".form-registro");

    //Superponer Registro 
    gridLogin.style.display = "none";
    gridRegistro.style.display = "block";

     //ini= background: azul, color: white
    //regis= backgro: transpa, color: black
    const btnInicioSesion = document.querySelector("#inicioSesion");
    const btnRegistro = document.querySelector("#registro");
    
    btnInicioSesion.style.backgroundColor= "#1641EA";
    btnInicioSesion.style.color="white";
    btnInicioSesion.style.borderTopLeftRadius = "6px";
    btnInicioSesion.style.borderBottomRightRadius = "40px";

    btnRegistro.style.backgroundColor = "transparent";
    btnRegistro.style.color= "black";

}