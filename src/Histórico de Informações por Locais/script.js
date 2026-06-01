let alertas = [];

const lista = document.getElementById("lista-alertas");
const campoBusca = document.getElementById("campo-busca");
const botaoBusca = document.getElementById("botao-busca");

fetch("http://localhost:3000/alertas")
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(dados) {
        console.log(dados);

        alertas = dados;
        mostrarAlertas(alertas);
    })
    .catch(function(erro) {
        console.log("Erro ao buscar alertas:", erro);
    });

function mostrarAlertas(listaAlertas) {

    lista.innerHTML = "";

    for(let i = 0; i < listaAlertas.length; i++) {

        lista.innerHTML += `
            <div class="card-alerta">

                <div class="topo-card">

                    <h3>${listaAlertas[i].tipo}</h3>

                    <span class="risco ${listaAlertas[i].risco}">
                        ${listaAlertas[i].risco}
                    </span>

                </div>

                <p><strong>Cidade:</strong> ${listaAlertas[i].cidade}</p>

                <p><strong>Bairro:</strong> ${listaAlertas[i].bairro}</p>

                <p><strong>Data:</strong> ${listaAlertas[i].data}</p>

                <p><strong>Descrição:</strong> ${listaAlertas[i].descricao}</p>

                <p><strong>Status:</strong> ${listaAlertas[i].status}</p>

                <button onclick="abrirModal(${i})">
    Ver detalhes
</button>

            </div>
        `;
    }

}


botaoBusca.addEventListener("click", function() {

    const textoBusca = campoBusca.value.trim().toLowerCase();

    const resultados = alertas.filter(function(alerta) {

        return alerta.cidade.toLowerCase().includes(textoBusca)
            || alerta.bairro.toLowerCase().includes(textoBusca);

    });

    if(resultados.length === 0) {

        lista.innerHTML = `
            <p class="mensagem-vazia">
                Nenhum alerta encontrado.
            </p>
        `;

    }

    else {

        mostrarAlertas(resultados);

    }

});


const filtroChuva = document.getElementById("chuva");

const filtroEnchente = document.getElementById("enchente");

const filtroDeslizamento = document.getElementById("deslizamento");

const filtroSeca = document.getElementById("seca");

const filtroTempestade = document.getElementById("tempestade");

const filtroDataInicio = document.getElementById("data-inicio");

const filtroDataFim = document.getElementById("data-fim");

const filtroCidade = document.getElementById("filtro-cidade");

function aplicarFiltros() {

    let alertasFiltrados = [];

    if(filtroChuva.checked) {
        alertasFiltrados.push("Chuva Forte");
    }

    if(filtroEnchente.checked) {
        alertasFiltrados.push("Enchente");
    }

    if(filtroDeslizamento.checked) {
        alertasFiltrados.push("Deslizamento");
    }

    if(filtroSeca.checked) {
        alertasFiltrados.push("Seca");
    }

    if(filtroTempestade.checked) {
        alertasFiltrados.push("Tempestade");
    }

    const dataInicio = filtroDataInicio.value;
    const dataFim = filtroDataFim.value;
    const cidadeDigitada = filtroCidade.value.trim().toLowerCase();

    const resultados = alertas.filter(function(alerta) {

        const tipoOk =
            alertasFiltrados.length === 0 ||
            alertasFiltrados.includes(alerta.tipo);

        const dataAlerta = new Date(alerta.data);

        const inicioOk =
            dataInicio === "" ||
            dataAlerta >= new Date(dataInicio);

        const fimOk =
            dataFim === "" ||
            dataAlerta <= new Date(dataFim);

        const cidadeOk =
            cidadeDigitada === "" ||
            alerta.cidade.toLowerCase().includes(cidadeDigitada);

        return tipoOk && inicioOk && fimOk && cidadeOk;
    });

    mostrarAlertas(resultados);
}



filtroChuva.addEventListener("change", aplicarFiltros);

filtroEnchente.addEventListener("change", aplicarFiltros);

filtroDeslizamento.addEventListener("change", aplicarFiltros);

filtroSeca.addEventListener("change", aplicarFiltros);

filtroTempestade.addEventListener("change", aplicarFiltros);

filtroDataInicio.addEventListener("change", aplicarFiltros);

filtroDataFim.addEventListener("change", aplicarFiltros);

filtroCidade.addEventListener("input", aplicarFiltros);

const modal = document.getElementById("modal");

const conteudoModal = document.getElementById("conteudo-modal");

const fecharModal = document.getElementById("fechar-modal");

function abrirModal(indice) {

    const alerta = alertas[indice];

    conteudoModal.innerHTML = `
        <h2>${alerta.tipo}</h2>

        <p><strong>Cidade:</strong> ${alerta.cidade}</p>

        <p><strong>Bairro:</strong> ${alerta.bairro}</p>

        <p><strong>Data:</strong> ${alerta.data}</p>

        <p><strong>Descrição:</strong> ${alerta.descricao}</p>

        <p><strong>Status:</strong> ${alerta.status}</p>

        <p><strong>Risco:</strong> ${alerta.risco}</p>
    `;

    modal.style.display = "flex";

}


fecharModal.addEventListener("click", function() {

    modal.style.display = "none";

});