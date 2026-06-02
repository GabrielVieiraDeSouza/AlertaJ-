const api = "http://localhost:3000/alertas";

const listaAlertas = document.getElementById("lista-alertas");

// CARREGAR ALERTAS

async function carregarAlertas() {

    listaAlertas.innerHTML = "";

    const resposta = await fetch(api);

    const alertas = await resposta.json();

    alertas.forEach(alerta => {

        listaAlertas.innerHTML += `

        <div class="col-lg-6 col-md-6">

            <div class="news-card">

                <img src="${alerta.imagem}">

                <div class="news-content">

                    <span class="badge-custom bg-danger">
                        ${alerta.categoria}
                    </span>

                    <h4 class="news-title">
                        ${alerta.titulo}
                    </h4>

                    <p>
                        ${alerta.descricao}
                    </p>

                    <a 
                        href="${alerta.link}"
                        class="btn-custom"
                    >
                        Ler Matéria
                    </a>

                </div>

            </div>

        </div>

        `;
    });

}

carregarAlertas();