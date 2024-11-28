function entrar() {

    var emailVar = email_input.value;
    var senhaVar = senha_input.value;

    if (emailVar == "" || senhaVar == "") {

        div_erros_login.innerHTML = "(Mensagem de erro para todos os campos em branco)";
        return false;
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json[0].Email;
                sessionStorage.NOME_USUARIO = json[0].Nome;
                sessionStorage.ID_USUARIO = json[0].idUsuario;

                 setTimeout(function () {
                    window.location = "/home.html"; //COLOCAR O CAMINHO DA DASH
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.json().then(function (mensagem){
                console.error(mensagem);
                div_erros_login.innerHTML =  mensagem;
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}