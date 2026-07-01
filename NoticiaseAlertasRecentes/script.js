const api = "https://alerta-ja-api.onrender.com/alerta";

const listaAlertas = document.getElementById("lista-alertas");

async function carregarAlertas() {

    try {

        const resposta = await fetch(api);
        const alertas = await resposta.json();

        listaAlertas.innerHTML = "";

        alertas.forEach(alerta => {

            listaAlertas.innerHTML += `

            <div class="col-lg-6 col-md-6">

                <div class="news-card">

                    <img src="${alerta.imagem}" alt="${alerta.titulo}">

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
                            href="detalhes.html?id=${alerta.id}"
                            class="btn-custom text-decoration-none"
                        >
                            Ler Matéria
                        </a>

                    </div>

                </div>

            </div>

            `;

        });

    } catch (erro) {

        listaAlertas.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                    Erro ao carregar os alertas.
                </div>
            </div>
        `;

        console.error(erro);

    }

}

carregarAlertas();
