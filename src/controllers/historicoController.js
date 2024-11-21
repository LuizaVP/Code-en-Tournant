var historicoModel = require("../models/historicoModel");

function finalizarQuiz(req, res) {

   const idQuiz = req.params.idQuiz;
   const idUsuario = req.params.idUsuario;
   const qtdPerguntas  = req.body.QtdPerguntas;
   const qtdAcertos = req.body.Acertos;

   console.log(qtdPerguntas);


    historicoModel.finalizarQuiz(idQuiz, idUsuario, qtdPerguntas, qtdAcertos).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Houve um erro ao finalizar o quiz")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao finalizar o quiz.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var idAquario = req.params.idAquario;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idAquario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    finalizarQuiz,
    buscarMedidasEmTempoReal

}