var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).json({ mensagem: "Seu email da requisição está undefined!" });
    } else if (senha == undefined) {
        res.status(400).json({ mensagem: "Sua senha da requisição está indefinida!" });
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        res.status(200).json(resultadoAutenticar)
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).json({ mensagem: "Email e/ou senha inválido(s)" });
                    } else {
                        res.status(401).json({ mensagem: "Mais de um usuário com o mesmo email e senha!" });
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).json({ mensagem: 'O nome da requisição está undefined!' })
    } else if (email == undefined) {
        res.status(400).json({ mensagem: 'O email da requisição está undefined!' });
    } else if (senha == undefined) {
        res.status(400).json({ mensagem: 'A senha da requisição está undefined!' });
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.status(201).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarDados(req, res) {
    var idUsuario = req.params.idUsuario
    
    usuarioModel.buscarKPI(idUsuario).then(function (resultado) {
        return res.status(200).json(resultado)
    })
    .catch(function (erro) {
        console.log(erro);
        console.log(erro.sqlMessage)
        return res.status(500).json(erro.sqlMessage);
    })
    
}




module.exports = {
    autenticar,
    cadastrar,
    buscarDados
}