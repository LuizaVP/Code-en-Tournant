const listaDeQuestoes = [

    {
        pergunta: "Em que país surgiu o ballet?",
        alternativaA: "Brasil",
        alternativaB: "Espanha",
        alternativaC: "Itália",
        alternativaD: "França",
        alternativaCorreta: "alternativaC"
    },

    {
        pergunta: "Quem levou o Ballet à França?",
        alternativaA: "Catarina de Médici",
        alternativaB: "Ana Botafogo",
        alternativaC: "Ivete Sangalo",
        alternativaD: "Michael Jackson",
        alternativaCorreta: "alternativaA"
    },

    {
        pergunta: "Qual foi o rei que foi um de seus grandes apoiadores, inclusive se tornando bailarino?",
        alternativaA: "Pelé, rei do futebol",
        alternativaB: "Dom João VI",
        alternativaC: "Rei Arthur",
        alternativaD: "Rei Luís XIV",
        alternativaCorreta: "alternativaD"
    },

    {
        pergunta: "Quem foi Jean Georges Noverre?",
        alternativaA: "Baterista",
        alternativaB: 'Pedreiro',
        alternativaC: 'Mestre de Ballet',
        alternativaD: 'Músico Clássico',
        alternativaCorreta: 'alternativaC'
    },
    {   pergunta: "Qual foi a metodologia criada pela bailarina russa Agrippina?",
        alternativaA: "Vaganova",
        alternativaB: 'Royal',
        alternativaC: 'Cubana',
        alternativaD: 'Scrum',
        alternativaCorreta: 'alternativaA'
    },
    {   pergunta: "Qual metodologia é conhecida por ser progressiva e técnica?",
        alternativaA: "Cubana",
        alternativaB: 'Itil',
        alternativaC: 'Vaganova',
        alternativaD: 'Royal',
        alternativaCorreta: 'alternativaC'
    },
    {   pergunta: "Em qual país o Ballet Bolshoi possui outra unidade?",
        alternativaA: "Inglaterra",
        alternativaB: 'Brasil',
        alternativaC: 'Japão',
        alternativaD: 'Coréia do Sul',
        alternativaCorreta: 'alternativaB'
    },
    {   pergunta: "Qual metodologia é mais utilizada?",
        alternativaA: "Documentação",
        alternativaB: 'GMUD',
        alternativaC: 'Cubana',
        alternativaD: 'Vaganova',
        alternativaCorreta: 'alternativaD'
    },
    {   pergunta: "Qual metodologia foi criada por ALicia Alonso?",
        alternativaA: "Scrum",
        alternativaB: 'Royal',
        alternativaC: 'Kanban',
        alternativaD: 'Cubana',
        alternativaCorreta: 'alternativaD'
    }
    
    

]

// variáveis globais    
let numeroDaQuestaoAtual = 0
let pontuacaoFinal = 0
let tentativaIncorreta = 0
let certas = 0
let erradas = 0
let quantidadeDeQuestoes = listaDeQuestoes.length
// let isUltima = numeroDaQuestaoAtual == quantidadeDeQuestoes-1 ? true : false

function onloadEsconder() {
    document.getElementById('pontuacao').style.display = "none"
    document.getElementById('jogo').style.display = "none"
}

function iniciarQuiz() {
    document.getElementById('pontuacao').style.display = "none"
    document.getElementById('jogo').style.display = "flex"
    document.getElementById('btnIniciarQuiz').style.display = "none"

    document.getElementById('qtdQuestoes').innerHTML = quantidadeDeQuestoes

    preencherHTMLcomQuestaoAtual(0)

    btnSubmeter.disabled = false
    btnProx.disabled = true
    // btnConcluir.disabled = true
    btnTentarNovamente.disabled = true
}

function preencherHTMLcomQuestaoAtual(index) {
    habilitarAlternativas(true)
    const questaoAtual = listaDeQuestoes[index]
    numeroDaQuestaoAtual = index
    console.log("questaoAtual")
    console.log(questaoAtual)
    document.getElementById("spanNumeroDaQuestaoAtual").innerHTML = Number(index) + 1 // ajustando porque o index começa em 0
    document.getElementById("spanQuestaoExibida").innerHTML = questaoAtual.pergunta;
    document.getElementById("labelOpcaoUm").innerHTML = questaoAtual.alternativaA;
    document.getElementById("labelOpcaoDois").innerHTML = questaoAtual.alternativaB;
    document.getElementById("labelOpcaoTres").innerHTML = questaoAtual.alternativaC;
    document.getElementById("labelOpcaoQuatro").innerHTML = questaoAtual.alternativaD;
}

function submeter() {
    const options = document.getElementsByName("option"); // recupera alternativas no html

    let hasChecked = false
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            hasChecked = true
            break
        }
    }

    if (!hasChecked) {
        alert("Não há alternativas escolhidas. Escolha uma opção.")
    } else {
        btnSubmeter.disabled = true
        btnProx.disabled = false

        habilitarAlternativas(false)

        checarResposta()
    }
}

function habilitarAlternativas(trueOrFalse) {
    let opcaoEscolhida = trueOrFalse ? false : true

    primeiraOpcao.disabled = opcaoEscolhida
    segundaOpcao.disabled = opcaoEscolhida
    terceiraOpcao.disabled = opcaoEscolhida
    quartaOpcao.disabled = opcaoEscolhida

}

function avancar() {
    btnProx.disabled = true
    btnSubmeter.disabled = false

    desmarcarRadioButtons()

    if (numeroDaQuestaoAtual < quantidadeDeQuestoes - 1) {
        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual)
    } else if (numeroDaQuestaoAtual == quantidadeDeQuestoes - 1) {
        alert("Atenção... a próxima é a ultima questão!")
        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual)
    } else {
        finalizarJogo()
    }
    limparCoresBackgroundOpcoes()
}

function tentarNovamente() {
    // atualiza a página
    window.location.reload()
}

function checarResposta() {
    const questaoAtual = listaDeQuestoes[numeroDaQuestaoAtual] // questão atual 
    const respostaQuestaoAtual = questaoAtual.alternativaCorreta // qual é a resposta correta da questão atual

    const options = document.getElementsByName("option"); // recupera alternativas no html

    let alternativaCorreta = null // variável para armazenar a alternativa correta

    options.forEach((option) => {
        if (option.value === respostaQuestaoAtual) {
            console.log("alternativaCorreta está no componente: " + alternativaCorreta)
            alternativaCorreta = option.labels[0].id
        }
    })

    // verifica se resposta assinalada é correta
    options.forEach((option) => {
        if (option.checked === true && option.value === respostaQuestaoAtual) {
            document.getElementById(alternativaCorreta).classList.add("text-success-with-bg")
            pontuacaoFinal++
            certas++
            document.getElementById("spanCertas").innerHTML = certas
            numeroDaQuestaoAtual++
        } else if (option.checked && option.value !== respostaQuestaoAtual) {
            const wrongLabelId = option.labels[0].id

            document.getElementById(wrongLabelId).classList.add("text-danger-with-bg")
            document.getElementById(alternativaCorreta).classList.add("text-success-with-bg")
            tentativaIncorreta++
            erradas++
            document.getElementById("spanErradas").innerHTML = erradas
            numeroDaQuestaoAtual++
        }
    })
}

function limparCoresBackgroundOpcoes() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).classList.remove("text-danger-with-bg")
        document.getElementById(option.labels[0].id).classList.remove("text-success-with-bg")
    })
}

function desmarcarRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function finalizarJogo() {
    
    document.getElementById('pontuacao').style.display = "flex"
    let textoParaMensagemFinal = null
    let classComCoresParaMensagemFinal = null
    const porcentagemFinalDeAcertos = pontuacaoFinal / quantidadeDeQuestoes

    if (porcentagemFinalDeAcertos <= 0.3) {
        textoParaMensagemFinal = "Parece que você não estudou..."
        classComCoresParaMensagemFinal = "text-danger-with-bg"
    }
    else if (porcentagemFinalDeAcertos > 0.3 && porcentagemFinalDeAcertos < 0.9) {
        textoParaMensagemFinal = "Pode melhorar na próxima, hein!"
        classComCoresParaMensagemFinal = "text-warning-with-bg"
    }
    else if (porcentagemFinalDeAcertos >= 0.9) {
        textoParaMensagemFinal = "Uau, parabéns!"
        classComCoresParaMensagemFinal = "text-success-with-bg"
    }
    var idUsuario = JSON.parse(sessionStorage.ID_USUARIO);
        
    fetch(`/historicos/finalizarQuiz/${1}/${idUsuario}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Especifica que o corpo da requisição é JSON
        },
        body: JSON.stringify({
            QtdPerguntas: 9,
            Acertos: certas
        })
    }).then((resposta) => {
        if(resposta.ok){
            console.log("deu certo");
        }
    })


    

    textoParaMensagemFinal += "<br> Você acertou " + Math.round((porcentagemFinalDeAcertos)*100) + "% das questões."


    document.getElementById('msgFinal').innerHTML = textoParaMensagemFinal
    document.getElementById('msgFinal').classList.add(classComCoresParaMensagemFinal) 
    document.getElementById('spanPontuacaoFinal').innerHTML = pontuacaoFinal

    document.getElementById('jogo').classList.add("text-new-gray") 

    btnProx.disabled = true
    btnSubmeter.disabled = true
    // btnConcluir.disabled = true
    btnTentarNovamente.disabled = false
    
    setTimeout(function () {
        window.location = "/home.html"; //COLOCAR O CAMINHO DA DASH
    }, 3000); // apenas para exibir o loading


}
