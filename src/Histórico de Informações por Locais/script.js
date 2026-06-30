// CORREÇÃO: Removida a linha 1 que quebrava o script de cara!

const API_URL = "http://localhost:3000/alertas";

let alertas = [];
let alertasExibidos = [];

const lista = document.getElementById("lista-alertas");
const campoBusca = document.getElementById("campo-busca");
const botaoBusca = document.getElementById("botao-busca");

const totalAlertas = document.getElementById("total-alertas");
const totalAlto = document.getElementById("total-alto");
const totalMedio = document.getElementById("total-medio");
const totalBaixo = document.getElementById("total-baixo");

// Mapeamento dos checkboxes estáticos que você já tem no HTML
const filtrosEstaticos = {
    "chuva": document.getElementById("chuva"),
    "enchente": document.getElementById("enchente"),
    "deslizamento": document.getElementById("deslizamento"),
    "seca": document.getElementById("seca"),
    "tempestade": document.getElementById("tempestade")
};

const filtroDataInicio = document.getElementById("data-inicio");
const filtroDataFim = document.getElementById("data-fim");
const filtroRisco = document.getElementById("filtro-risco");

const modal = document.getElementById("modal");
const conteudoModal = document.getElementById("conteudo-modal");
const fecharModal = document.getElementById("fechar-modal");

async function carregarAlertas() {
    try {
        const resposta = await fetch(API_URL);
        alertas = await resposta.json();
        

        gerarFiltrosAdicionais(); 
        mostrarAlertas(alertas);
    } catch (erro) {
        console.error(erro);
        lista.innerHTML = `
            <p class="mensagem-vazia">
                Erro ao carregar os alertas.
            </p>
        `;
    }
}

// CORREÇÃO: Gera checkboxes extras no HTML sem destruir os que já existem no CSS
function gerarFiltrosAdicionais() {
    const container = document.querySelector(".grupo-filtro");
    if (!container) return;

    // Tipos padrão que seu HTML fixo já cobre
    const tiposPadrao = ["chuva", "enchente", "deslizamento", "seca", "tempestade"];
    
    // Mapeia todos os tipos existentes no banco (removendo duplicados e vazios)
    const tiposNoBanco = [...new Set(alertas.map(a => a.tipo).filter(Boolean))];

    tiposNoBanco.forEach(tipo => {
        const tipoMinúsculo = tipo.toLowerCase();
        
        // Se o tipo do banco NÃO for um dos 5 padrões e NÃO existir na tela ainda, adiciona ele
        const jaExisteId = tipoMinúsculo.replace(/\s+/g, '-');
        if (!tiposPadrao.includes(tipoMinúsculo) && !document.getElementById(jaExisteId)) {
            
            // Cria a exata estrutura HTML esperada pelas suas classes CSS
            const novaDiv = document.createElement("div");
            novaDiv.className = "filtro-item";
            novaDiv.innerHTML = `
                <input type="checkbox" id="${jaExisteId}" class="filtro-dinamico" value="${tipo}">
                <label for="${jaExisteId}">${tipo}</label>
            `;
            
            container.appendChild(novaDiv);
            
            // Adiciona o ouvinte para disparar o filtro quando clicado
            novaDiv.querySelector("input").addEventListener("change", aplicarFiltros);
        }
    });
}

function atualizarEstatisticas(listaAlertas){
    totalAlertas.textContent = listaAlertas.length;

    // CORREÇÃO: Tratando caso o item use "risco" ou "nivel"
    totalAlto.textContent = listaAlertas.filter(a => (a.risco || a.nivel) === "alto").length;
    totalMedio.textContent = listaAlertas.filter(a => (a.risco || a.nivel) === "medio").length;
    totalBaixo.textContent = listaAlertas.filter(a => (a.risco || a.nivel) === "baixo").length;
}

function mostrarAlertas(listaAlertas){
    alertasExibidos = listaAlertas;
    atualizarEstatisticas(listaAlertas);
    lista.innerHTML = "";

    if(listaAlertas.length === 0){
        lista.innerHTML = `
            <p class="mensagem-vazia">
                Nenhum alerta encontrado.
            </p>
        `;
        return;
    }

    listaAlertas.forEach((alerta, indice)=>{
        // CORREÇÃO: Garante que vai ler 'risco' ou 'nivel', evitando quebrar o toUpperCase()
        const riscoTratado = alerta.risco || alerta.nivel || "desconhecido";

        lista.innerHTML += `
        <div class="card-alerta">
            <div class="topo-card">
                <h3>${alerta.titulo}</h3>
                <span class="risco ${riscoTratado}">
                    ${riscoTratado.toUpperCase()}
                </span>
            </div>
            <p><strong>Cidade:</strong> ${alerta.cidade || "Não informada"}</p>
            <p><strong>Bairro:</strong> ${alerta.bairro || "Não informado"}</p>
            <p><strong>Data:</strong> ${alerta.data || "Sem data"}</p>
            <p><strong>Descrição:</strong> ${alerta.descricao || "Sem descrição"}</p>
            <p><strong>Status:</strong> ${alerta.status || "Monitoramento"}</p>
            <button onclick="abrirModal(${indice})">
                Ver detalhes
            </button>
        </div>
        `;
    });
}

botaoBusca.addEventListener("click", ()=>{
    const texto = campoBusca.value.trim().toLowerCase();
    if(texto === ""){
        mostrarAlertas(alertas);
        return;
    }

    const resultados = alertas.filter(alerta=>{
        return (alerta.cidade || "").toLowerCase().includes(texto)
        ||
        (alerta.bairro || "").toLowerCase().includes(texto)
        ||
        (alerta.titulo || "").toLowerCase().includes(texto);
    });
    mostrarAlertas(resultados);
});

function aplicarFiltros(){
    const tiposSelecionados = [];
    
    // 1. Verifica os filtros estáticos do seu HTML original
    if(filtrosEstaticos.chuva && filtrosEstaticos.chuva.checked) tiposSelecionados.push("chuva");
    if(filtrosEstaticos.enchente && filtrosEstaticos.enchente.checked) tiposSelecionados.push("enchente");
    if(filtrosEstaticos.deslizamento && filtrosEstaticos.deslizamento.checked) tiposSelecionados.push("deslizamento");
    if(filtrosEstaticos.seca && filtrosEstaticos.seca.checked) tiposSelecionados.push("seca");
    if(filtrosEstaticos.tempestade && filtrosEstaticos.tempestade.checked) tiposSelecionados.push("tempestade");

    // 2. CORREÇÃO: Verifica também os novos filtros criados dinamicamente
    const checkboxesDinamicos = document.querySelectorAll(".filtro-dinamico:checked");
    checkboxesDinamicos.forEach(cb => tiposSelecionados.push(cb.value.toLowerCase()));

    const risco = filtroRisco.value;
    const inicio = filtroDataInicio.value;
    const fim = filtroDataFim.value;

    const resultados = alertas.filter(alerta=>{
        const tipoAlerta = (alerta.tipo || "").toLowerCase();
        const tituloAlerta = (alerta.titulo || "").toLowerCase();

        // Se nenhuma caixa estiver marcada, exibe tudo. Se tiver marcada, o item precisa corresponder
        const tipoOk = tiposSelecionados.length === 0 || tiposSelecionados.some(tipo =>
            tipoAlerta.includes(tipo) || tituloAlerta.includes(tipo)
        );

        // CORREÇÃO: Filtro de risco adaptado para aceitar as duas propriedades antigas/novas
        const riscoAlerta = alerta.risco || alerta.nivel || "";
        const riscoOk = risco === "" || riscoAlerta === risco;

        const data = new Date(alerta.data);
        const inicioOk = inicio === "" || data >= new Date(inicio);
        const fimOk = fim === "" || data <= new Date(fim);

        return tipoOk && riscoOk && inicioOk && fimOk;
    });

    mostrarAlertas(resultados);
}

// Ouvintes para os filtros fixos que vieram do HTML
[
filtrosEstaticos.chuva,
filtrosEstaticos.enchente,
filtrosEstaticos.deslizamento,
filtrosEstaticos.seca,
filtrosEstaticos.tempestade,
filtroDataInicio,
filtroDataFim,
filtroRisco
].forEach(elemento=>{
    if (elemento) elemento.addEventListener("change", aplicarFiltros);
});

function abrirModal(indice){
    const alerta = alertasExibidos[indice];
    const riscoTratado = alerta.risco || alerta.nivel || "desconhecido";

    conteudoModal.innerHTML = `
        <h2>${alerta.titulo}</h2>
        <hr>
        <p><strong>Cidade:</strong> ${alerta.cidade || "Não informada"}</p>
        <p><strong>Bairro:</strong> ${alerta.bairro || "Não informado"}</p>
        <p><strong>Data:</strong> ${alerta.data || "Sem data"}</p>
        <p><strong>Status:</strong> ${alerta.status || "Monitoramento"}</p>
        <p><strong>Risco:</strong> ${riscoTratado.toUpperCase()}</p>
        <p><strong>Descrição:</strong></p>
        <p>${alerta.descricao || "Sem descrição"}</p>
    `;
    modal.style.display = "flex";
}

fecharModal.addEventListener("click", ()=>{
    modal.style.display = "none";
});

window.addEventListener("click",(event)=>{
    if(event.target === modal){
        modal.style.display = "none";
    }
});

// Inicializa a busca de dados
carregarAlertas();