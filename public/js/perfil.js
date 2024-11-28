function buscarDadosUsuario(){
  var acertosHistoria  = [0];
  var acertosArtigos = [0];

  nome.innerHTML = sessionStorage.NOME_USUARIO;

fetch(`/usuarios/buscarDados/${sessionStorage.ID_USUARIO}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
 
  })
  .then(function (resposta) {
    console.log("resposta: ", resposta);

    if (resposta.status != 204) {
      resposta.json().then(function (json) {
        console.log(json);

        var dadoUsuario = json[0];

        kpi1.innerHTML += dadoUsuario.Acertos;
        kpi2.innerHTML += dadoUsuario.Jogadas;

        

        if(dadoUsuario.acertosHistoria != null){
          acertosHistoria[0] = Number(dadoUsuario.acertosHistoria);
        }
        if(dadoUsuario.acertosArtigos != null){
          acertosArtigos[0] = Number(dadoUsuario.acertosArtigos);
        }
        console.log(acertosHistoria, acertosArtigos)

        const ctx = document.getElementById('myChart');

        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Historia', 'artigo'],
            datasets: [{
              label: 'Quantidade de acertos no total',
              data: [acertosHistoria[0],acertosArtigos[0]],
              borderWidth: 2,
              backgroundColor: ['#f3cbcb', '#74331b' ]
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

      })
    }
  })
  
  .catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });


}