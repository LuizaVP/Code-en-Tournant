var database = require("../database/config");

function finalizarQuiz(idQuiz, idUsuario,qtdPerguntas, qtdAcertos) {

    var instrucaoSql = `INSERT INTO historico VALUES
    (default, ${qtdPerguntas}, ${qtdAcertos}, ${idUsuario}, ${idQuiz});`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    var instrucaoSql = `SELECT 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        FROM medida WHERE fk_aquario = ${idAquario} 
                    ORDER BY id DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    finalizarQuiz,
    buscarMedidasEmTempoReal
}
