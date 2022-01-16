function inicioSesion(){
    //querySelector() Devuelve el primer elemento del documento
    const gridLogin = document.querySelector(".form-login");
    const gridRegistro = document.querySelector(".form-registro");
    const btnInicioSesion = document.querySelector("#inicioSesion");
    const btnRegistro = document.querySelector("#registro");

    //Doy estilo a cada uno de los grid del login para superponer el grid del registro 
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
    //querySelector() Devuelve el primer elemento del documento
    const gridLogin = document.querySelector(".form-login");
    const gridRegistro = document.querySelector(".form-registro");

    //Doy estilo a cada uno de los grid del login para superponer el grid del registro 
    gridLogin.style.display = "none";
    gridRegistro.style.display = "block";

     //ini= background: azul, color: white
    //regis= backgro: transpa, color: black
    const btnInicioSesion = document.querySelector("#inicioSesion");
    const btnRegistro = document.querySelector("#registro");
    
    btnInicioSesion.style.backgroundColor= "#1641EA";
    btnInicioSesion.style.color="white";
    btnInicioSesion.style.borderBottomRightRadius = "6px";
    btnInicioSesion.style.borderTopRightRadius = "40px";

    btnRegistro.style.backgroundColor = "transparent";
    btnRegistro.style.color= "black";

}