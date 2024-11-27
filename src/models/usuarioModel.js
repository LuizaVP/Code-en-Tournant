var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, Nome, Email FROM usuario WHERE Email = '${email}' AND Senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (Nome, Email, Senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarKPI(idUsuario){
    var instrucaoSql = `SELECT

                        (SELECT SUM(historico.QtdAcertos)
                        FROM historico WHERE Fkusuario = ${idUsuario})AS Acertos,
                        
                        (SELECT COUNT(historico.id_historico) FROM historico
                        WHERE Fkusuario = ${idUsuario}) AS Jogadas, 
                        
                        (SELECT SUM(historico.QtdAcertos)
                        FROM historico WHERE Fkusuario = ${idUsuario}
                        AND historico.fkQuiz = 1) AS acertosHistoria,

                        (SELECT SUM(historico.QtdAcertos)
                        FROM historico WHERE Fkusuario = ${idUsuario}
                        AND historico.fkQuiz = 2) AS acertosArtigos

                        FROM historico WHERE FkUsuario = ${idUsuario};

                       `

    return database.executar(instrucaoSql);


}

module.exports = {
    autenticar,
    cadastrar,
    buscarKPI
};
