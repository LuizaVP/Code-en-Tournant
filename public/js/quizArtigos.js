
    const listaDeQuestoes = [
    {
        pergunta: "Para que serve a redinha?",
        alternativaA: "Colocar nos pés",
        alternativaB: "Acessório para colocar talco",
        alternativaC: "Acessório para o coque",
        alternativaD: "Ajudar em giros",
        alternativaCorreta: "alternativaC",
        imagem: 'assets/redinha.jpeg'
    },
    {
        pergunta: "Para que serve o Porta Figurino?",
        alternativaA: "Guardar os figurinos",
        alternativaB: "Objeto para colocar no cabelo",
        alternativaC: "Ajudar na flexibilidade",
        alternativaD: "Guardar a garrafinha de água",
        alternativaCorreta: "alternativaA",
        imagem: "assets/portafigurino.jpeg"  // Caminho da imagem
    },
    {
        pergunta: "Qual o nome desse acessório?",
        alternativaA: "Grampo",
        alternativaB: "Tutu",
        alternativaC: "Ponteira",
        alternativaD: "Sapatilha de ponta",
        alternativaCorreta: "alternativaD",
        imagem: "assets/ponta.jpeg"  // Caminho da imagem
    },
    {
        pergunta: "Para que serve a ponteira?",
        alternativaA: "Deixar o coque bonito",
        alternativaB: "Alinhar os dedos",
        alternativaC: "Amenizar o atrito da sapatilha de ponta",
        alternativaD: "Melhorar o rendimento",
        alternativaCorreta: "alternativaC",
        imagem: "assets/ponteira.webp"  // Caminho da imagem
    },
    {pergunta: "Qual a finalidade do laquê?",
        alternativaA: "Impedir a sapatilha de escorregar",
        alternativaB: "Deixar o coque alinhado",
        alternativaC: "Fixar acessórios de cabelo",
        alternativaD: "Ajudar nas provas",
        alternativaCorreta: "alternativaB",
        imagem: "assets/laquê.webp"
    },
    {pergunta: "Você sabe para que a fita pode ser útil?",
        alternativaA: "Amolecer a sapatilha, amenizando dores",
        alternativaB: "Ajudar a alongar",
        alternativaC: "Prender a sapatilha",
        alternativaD: "Melhorar a forma de costurar",
        alternativaCorreta: "alternativaB",
        imagem: "assets/elastico.jpg"
    },
    {pergunta: "Para que serve os grampos?",
        alternativaA: "Prender todos os fios no coque",
        alternativaB: "Ajudar na maquiagem",
        alternativaC: "Acessório de performance",
        alternativaD: "Presente para a professora",
        alternativaCorreta: "alternativaA",
        imagem: "assets/grampos.webp"
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
    habilitarAlternativas(true);
    const questaoAtual = listaDeQuestoes[index];
    numeroDaQuestaoAtual = index;
    console.log("questaoAtual", questaoAtual);

    // Atualiza o número da questão
    document.getElementById("spanNumeroDaQuestaoAtual").innerHTML = Number(index) + 1;
    // Atualiza a pergunta
    document.getElementById("spanQuestaoExibida").innerHTML = questaoAtual.pergunta;

    // Atualiza as alternativas
    document.getElementById("labelOpcaoUm").innerHTML = questaoAtual.alternativaA;
    document.getElementById("labelOpcaoDois").innerHTML = questaoAtual.alternativaB;
    document.getElementById("labelOpcaoTres").innerHTML = questaoAtual.alternativaC;
    document.getElementById("labelOpcaoQuatro").innerHTML = questaoAtual.alternativaD;

    // Atualiza a imagem, se houver
    const imagemElemento = document.getElementById("imagemQuestao");  // Referência ao <img> que você vai criar
    if (questaoAtual.imagem) {
        imagemElemento.src = questaoAtual.imagem;  // Define o caminho da imagem
        imagemElemento.style.display = "block";  // Torna a imagem visível
    } else {
        imagemElemento.style.display = "none";  // Esconde a imagem se não houver
    }
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
        document.getElementById('jogo').style.display = "none"
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

        textoParaMensagemFinal += "<br> Você acertou " + Math.round((porcentagemFinalDeAcertos)*100) + "% das questões."
        

        document.getElementById('msgFinal').innerHTML = textoParaMensagemFinal
        document.getElementById('msgFinal').classList.add(classComCoresParaMensagemFinal) 
        document.getElementById('spanPontuacaoFinal').innerHTML = pontuacaoFinal

        document.getElementById('jogo').classList.add("text-new-gray") 

        btnProx.disabled = true
        btnSubmeter.disabled = true
        // btnConcluir.disabled = true
        btnTentarNovamente.disabled = false
        


    }

