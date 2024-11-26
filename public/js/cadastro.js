
function cadastrar() {
  // aguardar();

  //Recupere o valor da nova input pelo nome do id
  // Agora vá para o método fetch logo abaixo
  var nomeVar = nome_input.value;
  var emailVar = email_input.value;
  var senhaVar = senha_input.value;
  var confirmacaoSenhaVar = confirmacao_senha_input.value;
  var caracteresEspeciais = "!@#$%^&*()_+-=[]{};':,.<>/?"


  // Verificando se há algum campo em branco
  if (
    nomeVar == "" ||
    emailVar == "" ||
    senhaVar == "" ||
    confirmacaoSenhaVar == "") {

    div_erro_cadastro.innerHTML =
      "Por favor, preencha todos os campos!";

    return false;
  } else if (senhaVar.length < 5) {
    div_erro_cadastro.innerHTML =
      "A senha deve ter mais de 5 caracteres"
  } else if (senhaVar != confirmacaoSenhaVar) {
    div_erro_cadastro.innerHTML = 'As senhas não conferem'
  } else {
    for (var i = 0; i < senhaVar.length; i++) {
      if (caracteresEspeciais.includes(senhaVar[i])) {
        console.log(div_erro_cadastro.innerHTML = 'Tem caractere')
      }
      div_erro_cadastro.innerHTML = "A senha deve conter pelo menos um caractere especial";

    }
    requisitos.style.display = 'none';

  }
  
// Enviando o valor da nova input
fetch("/usuarios/cadastrar", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    // crie um atributo que recebe o valor recuperado aqui
    // Agora vá para o arquivo routes/usuario.js
    nomeServer: nomeVar,
    emailServer: emailVar,
    senhaServer: senhaVar,
  }),
})
  .then(function (resposta) {
    console.log("resposta: ", resposta);

    if (resposta.ok) {

      div_erro_cadastro.innerHTML =
        "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

      setTimeout(() => {
        window.location = "/login1.html";
      }, "2000");
    } else {
      resposta.json().then(function (erro) {
        div_erro_cadastro.innerHTML = JSON.parse(erro)
      })
    }
  })
  .catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
    return true;
  });

}

