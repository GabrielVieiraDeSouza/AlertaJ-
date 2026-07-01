let idEditando = null;

const API_URL = "https://alerta-ja-api.onrender.com/alertas";

const form = document.getElementById("formAlerta");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // CORREÇÃO: Removido o campo 'titulo' e capturado o valor do select 'tipo'
    const tipo = document.getElementById("tipo").value.trim();
    const cidade = document.getElementById("cidade").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const data = document.getElementById("data").value;

    const risco = document.getElementById("nivel").value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    // CORREÇÃO: Tanto 'titulo' quanto 'tipo' agora salvam a mesma informação do select
    const alerta = {
        titulo: tipo, 
        tipo: tipo,
        cidade: cidade,
        bairro: bairro || "Não informado",
        descricao: descricao,
        data: data,
        risco: risco,
        status: "Monitoramento",
        criadoEm: new Date().toISOString(),
        imagem: "",
        fonte: "Cadastro Manual"
    };

    if (idEditando === null) {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(alerta)
        });
        alert("Alerta cadastrado com sucesso!");
    } else {
        await fetch(`${API_URL}/${idEditando}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(alerta)
        });
        alert("Alerta atualizado com sucesso!");
        idEditando = null;
    }

    form.reset();
    carregarAlertas();
});

async function carregarAlertas() {
    const response = await fetch(API_URL);
    const alertas = await response.json();
    const lista = document.getElementById("listaAlertas");

    lista.innerHTML = "";

    alertas.forEach(alerta => {
        lista.innerHTML += `
        <div class="alerta">
            <h3>${alerta.titulo}</h3>
            <p><strong>Cidade:</strong> ${alerta.cidade}</p>
            <p><strong>Bairro:</strong> ${alerta.bairro}</p>
            <p><strong>Risco:</strong> ${alerta.risco}</p>
            <p><strong>Status:</strong> ${alerta.status}</p>
            <p><strong>Descrição:</strong> ${alerta.descricao}</p>
            <p><strong>Data:</strong> ${alerta.data}</p>
            <div class="acoes">
                <button onclick="editarAlerta('${alerta.id}')">
                    Editar
                </button>
                <button onclick="excluirAlerta('${alerta.id}')">
                    Excluir
                </button>
            </div>
        </div>
        `;
    });
}

carregarAlertas();

async function excluirAlerta(id) {
    if (!confirm("Deseja realmente excluir este alerta?")) return;

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    carregarAlertas();
}

async function editarAlerta(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const alerta = await response.json();

    // CORREÇÃO: Altera o select de 'tipo' com o valor salvo no banco
    document.getElementById("tipo").value = alerta.tipo || alerta.titulo || "";
    
    document.getElementById("cidade").value = alerta.cidade;
    document.getElementById("bairro").value = alerta.bairro;
    document.getElementById("descricao").value = alerta.descricao;
    document.getElementById("data").value = alerta.data;

    // CORREÇÃO: Trata o risco para que a primeira letra fique maiúscula (ex: "alto" -> "Alto")
    // Isso garante que o select encontre o valor correspondente no HTML
    if (alerta.risco) {
        const riscoTratado = alerta.risco.charAt(0).toUpperCase() + alerta.risco.slice(1);
        document.getElementById("nivel").value = riscoTratado;
    } else {
        document.getElementById("nivel").value = "";
    }

    idEditando = id;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
