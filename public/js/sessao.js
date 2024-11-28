function validarSessao(){
    var idUsuario = sessionStorage.ID_USUARIO;
    console.log(idUsuario);
    if(idUsuario != null || idUsuario != undefined){
        menu.innerHTML += `<a href='/perfil.html'>PERFIL</a>`;
        boxLogin.innerHTML = "";
    }else{
        location.replace("/login1.html")
    }

}