const alertas = [
    {
        tipo: "Enchente",
        cidade: "Contagem - MG",
        bairro: "Eldorado",
        data: "10/04/2026",
        descricao: "Risco de alagamento em áreas baixas.",
        status: "Encerrado",
        risco: "alto"
    },

    {
        tipo: "Deslizamento",
        cidade: "Belo Horizonte - MG",
        bairro: "Barreiro",
        data: "02/05/2026",
        descricao: "Solo instável após chuvas intensas.",
        status: "Monitoramento",
        risco: "medio"
    },

    {
    tipo: "Chuva Forte",
    cidade: "Ribeirão das Neves - MG",
    bairro: "Justinópolis",
    data: "28/03/2026",
    descricao: "Chuvas intensas na região.",
    status: "Encerrado",
    risco: "baixo"
}
];

const lista = document.getElementById("lista-alertas");
const campoBusca = document.getElementById("campo-busca");

const botaoBusca = document.getElementById("botao-busca");

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

mostrarAlertas(alertas);

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

    const resultados = alertas.filter(function(alerta) {

        return alertasFiltrados.includes(alerta.tipo);

    });

    if(alertasFiltrados.length === 0) {

        mostrarAlertas(alertas);

    }

    else {

        mostrarAlertas(resultados);

    }

}

filtroChuva.addEventListener("change", aplicarFiltros);

filtroEnchente.addEventListener("change", aplicarFiltros);

filtroDeslizamento.addEventListener("change", aplicarFiltros);


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