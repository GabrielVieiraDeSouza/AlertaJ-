let idEditando = null;

const form = document.getElementById("formAlerta");

form.addEventListener("submit", async function(event){

    event.preventDefault();

    const alerta = {
        titulo: document.getElementById("titulo").value,
        cidade: document.getElementById("cidade").value,
        nivel: document.getElementById("nivel").value,
        descricao: document.getElementById("descricao").value,
        data: document.getElementById("data").value
    };

    if(idEditando === null){

        // CREATE
        await fetch("http://localhost:3001/alertas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(alerta)
        });

        alert("Alerta cadastrado!");

    } else {

        // UPDATE
        await fetch(`http://localhost:3001/alertas/${idEditando}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(alerta)
        });

        alert("Alerta atualizado!");
        idEditando = null;
    }

    form.reset();
    carregarAlertas();

});


async function carregarAlertas(){

    const response = await fetch("http://localhost:3001/alertas");

    const alertas = await response.json();

    const lista = document.getElementById("listaAlertas");

    lista.innerHTML = "";

    alertas.forEach(alerta => {

        lista.innerHTML += `
        
            <div class="card">

                <h3>${alerta.titulo}</h3>

                <p><strong>Cidade:</strong> ${alerta.cidade}</p>

                <p><strong>Nível:</strong> ${alerta.nivel}</p>

                <p><strong>Descrição:</strong> ${alerta.descricao}</p>

                <p><strong>Data:</strong> ${alerta.data}</p>

                <button  onclick="excluirAlerta('${alerta.id}')">
                    Excluir
                </button>

                <button onclick="editarAlerta('${alerta.id}', '${alerta.titulo}', '${alerta.cidade}', '${alerta.nivel}', '${alerta.descricao}', '${alerta.data}')">
                    Editar
                </button>

            </div>

        `;

    });

}

carregarAlertas();


async function excluirAlerta(id){

    await fetch(`http://localhost:3001/alertas/${id}`, {

        method: "DELETE"

    });

    carregarAlertas();

}


document.addEventListener("click", function(event){

    if(event.target.classList.contains("btn-excluir")){

        const id = event.target.getAttribute("data-id");

        excluirAlerta(id);
    }

});


function editarAlerta(id, titulo, cidade, nivel, descricao, data){

    document.getElementById("titulo").value = titulo;
    document.getElementById("cidade").value = cidade;
    document.getElementById("nivel").value = nivel;
    document.getElementById("descricao").value = descricao;
    document.getElementById("data").value = data;

    idEditando = id;
}