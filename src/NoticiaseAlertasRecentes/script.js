const api = "http://localhost:3000/alertas";

const listaAlertas = document.getElementById("lista-alertas");

// =========================
// CARREGAR ALERTAS
// =========================

async function carregarAlertas() {

    try {

        listaAlertas.innerHTML = `
            <div class="text-center p-5">
                <div class="spinner-border text-primary"></div>
            </div>
        `;

        const resposta = await fetch(api);

        const alertas = await resposta.json();

        listaAlertas.innerHTML = "";

        if(alertas.length === 0){

            listaAlertas.innerHTML = `
                <div class="alert alert-warning">
                    Nenhum alerta encontrado.
                </div>
            `;

            atualizarEstatisticas();

            return;
        }

        alertas.forEach(alerta => {

            listaAlertas.innerHTML += `

            <div class="col-xl-4 col-lg-6 col-12">

                <div class="news-card">

                    <img src="${alerta.imagem}">

                    <div class="news-content">

                        <span class="badge-custom bg-danger">
                            ${alerta.categoria}
                        </span>

                        <h4 class="news-title">
                            ${alerta.titulo}
                        </h4>

                        <p class="text-secondary">
                            ${alerta.descricao}
                        </p>

                        <div class="d-flex gap-2 mt-3 flex-wrap">

                            <a 
                                href="${definirPagina(alerta.id)}"
                                class="btn-custom text-decoration-none"
                            >
                                Ler Matéria
                            </a>

                            <button 
                                class="btn btn-danger"
                                onclick="deletarAlerta(${alerta.id})"
                            >
                                Excluir
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            `;
        });

        atualizarEstatisticas();

    } catch(erro){

        console.log("Erro ao carregar alertas:", erro);

        listaAlertas.innerHTML = `
            <div class="alert alert-danger">
                Erro ao conectar com a API.
            </div>
        `;
    }
}

// =========================
// DEFINIR HTML DAS MATÉRIAS
// =========================

function definirPagina(id){

    if(id == 1){

        return "seca.html";

    }

    else if(id == 2){

        return "deslizamento.html";

    }

    else if(id == 3){

        return "tempestade.html";

    }

    else if(id == 4){

        return "enchente.html";

    }

    else if(id == 5){

        return "queimada.html";

    }

    else if(id == 6){

        return "vendaval.html";

    }

    else{

        return "#";
    }
}

// =========================
// CRIAR ALERTAS
// =========================

async function criarAlertaPorID(id){

    let novoAlerta = null;

    // ALERTA 1

    if(id == 1){

        novoAlerta = {

            titulo: "Seca Extrema no Nordeste",

            descricao: "Reservatórios entram em nível crítico.",

            categoria: "Seca",

            imagem: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200"
        };
    }

    // ALERTA 2

    else if(id == 2){

        novoAlerta = {

            titulo: "Deslizamento Interdita Rodovia no RJ",

            descricao: "Trecho foi bloqueado após queda de barreira.",

            categoria: "Deslizamento",

            imagem: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?q=80&w=1200"
        };
    }

    // ALERTA 3

    else if(id == 3){

        novoAlerta = {

            titulo: "Tempestade Atinge São Paulo",

            descricao: "Ventos fortes causaram quedas de árvores.",

            categoria: "Tempestade",

            imagem: "https://images.unsplash.com/photo-1500674425229-f692875b0ab7?q=80&w=1200"
        };
    }

    // ALERTA 4

    else if(id == 4){

        novoAlerta = {

            titulo: "Enchente Deixa Famílias Desabrigadas",

            descricao: "Chuvas fortes provocam alagamentos.",

            categoria: "Enchente",

            imagem: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1200"
        };
    }

    // ALERTA 5

    else if(id == 5){

        novoAlerta = {

            titulo: "Queimadas Avançam no Centro-Oeste",

            descricao: "Fumaça cobre cidades da região.",

            categoria: "Queimada",

            imagem: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?q=80&w=1200"
        };
    }

    // ALERTA 6

    else if(id == 6){

        novoAlerta = {

            titulo: "Vendaval Derruba Estruturas no Sul",

            descricao: "Rajadas ultrapassaram 90 km/h.",

            categoria: "Vendaval",

            imagem: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=1200"
        };
    }

    if(!novoAlerta){

        return;
    }

    try {

        await fetch(api, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(novoAlerta)
        });

        carregarAlertas();

    } catch(erro){

        console.log("Erro ao criar alerta:", erro);
    }
}

// =========================
// DELETAR ALERTA
// =========================

async function deletarAlerta(id){

    try {

        await fetch(`${api}/${id}`, {

            method: "DELETE"
        });

        carregarAlertas();

    } catch(erro){

        console.log("Erro ao deletar:", erro);
    }
}

// =========================
// FILTRAR CATEGORIA
// =========================

async function filtrarCategoria(categoria){

    try {

        const resposta = await fetch(api);

        const alertas = await resposta.json();

        const filtrados = alertas.filter(alerta =>
            alerta.categoria === categoria
        );

        listaAlertas.innerHTML = "";

        if(filtrados.length === 0){

            listaAlertas.innerHTML = `
                <div class="alert alert-warning">
                    Nenhum alerta encontrado nessa categoria.
                </div>
            `;

            return;
        }

        filtrados.forEach(alerta => {

            listaAlertas.innerHTML += `

            <div class="col-xl-4 col-lg-6 col-12">

                <div class="news-card">

                    <img src="${alerta.imagem}">

                    <div class="news-content">

                        <span class="badge-custom bg-danger">
                            ${alerta.categoria}
                        </span>

                        <h4 class="news-title">
                            ${alerta.titulo}
                        </h4>

                        <p class="text-secondary">
                            ${alerta.descricao}
                        </p>

                        <div class="d-flex gap-2 mt-3 flex-wrap">

                            <a 
                                href="${definirPagina(alerta.id)}"
                                class="btn-custom text-decoration-none"
                            >
                                Ler Matéria
                            </a>

                            <button 
                                class="btn btn-danger"
                                onclick="deletarAlerta(${alerta.id})"
                            >
                                Excluir
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            `;
        });

    } catch(erro){

        console.log("Erro ao filtrar:", erro);
    }
}

// =========================
// LIMPAR ALERTAS
// =========================

async function limparAlertas(){

    const confirmar = confirm(
        "Deseja realmente apagar todos os alertas?"
    );

    if(!confirmar){

        return;
    }

    try {

        const resposta = await fetch(api);

        const alertas = await resposta.json();

        for(const alerta of alertas){

            await fetch(`${api}/${alerta.id}`, {

                method: "DELETE"
            });
        }

        carregarAlertas();

    } catch(erro){

        console.log("Erro ao limpar:", erro);
    }
}

// =========================
// ESTATÍSTICAS
// =========================

async function atualizarEstatisticas(){

    try {

        const resposta = await fetch(api);

        const alertas = await resposta.json();

        document.getElementById("total-alertas").innerText =
            alertas.length;

        const emergencias = alertas.filter(alerta =>
            alerta.categoria === "Emergência"
        );

        document.getElementById("total-emergencias").innerText =
            emergencias.length;

    } catch(erro){

        console.log("Erro nas estatísticas:", erro);
    }
}

// =========================
// INICIAR
// =========================

carregarAlertas();