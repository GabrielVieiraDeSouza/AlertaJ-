const btnGerar = document.getElementById("btnGerar");
const painel = document.getElementById("painelRelatorio");
const historico = document.getElementById("historico");

let ultimoRelatorio = null;

btnGerar.addEventListener("click", async () => {

    const cidade = document.getElementById("cidade").value;
    const data = document.getElementById("data").value;

    const response = await fetch(
        `http://localhost:3001/relatoriosClimaticos?cidade=${cidade}&data=${data}`
    );

    const dados = await response.json();

    if(dados.length === 0){

        painel.innerHTML = "<h3>Nenhum relatório encontrado.</h3>";
        return;
    }

    const relatorio = dados[0];

    ultimoRelatorio = relatorio;

    painel.innerHTML = `

    <div class="card">

    <h3>📍 ${relatorio.cidade}</h3>

    <p><strong>📅 Data:</strong> ${relatorio.data}</p>

    <hr>

    <p>🌡 <strong>Temperatura:</strong> ${relatorio.temperatura}</p>

    <p>💧 <strong>Umidade:</strong> ${relatorio.umidade}</p>

    <p>🌧 <strong>Chance de chuva:</strong> ${relatorio.chanceChuva}</p>

    <p>💨 <strong>Vento:</strong> ${relatorio.vento}</p>

    <p>🍃 <strong>Qualidade do ar:</strong> ${relatorio.qualidadeAr}</p>

    <hr>

    <h4>⚠ Alertas Climáticos</h4>

    <ul>

        ${relatorio.alertas
            .map(alerta => `<li>${alerta}</li>`)
            .join("")}

    </ul>

    </div>

    `;

    historico.innerHTML += `

    <li>

        📍 <strong>${relatorio.cidade}</strong>

    <br>

        📅 ${relatorio.data}

    </li>

    `;
});

document.getElementById("btnPDF").addEventListener("click", () => {

    if(!ultimoRelatorio){
        alert("Gere um relatório primeiro.");
        return;
    }

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.text("Relatório Climático Diário", 10, 10);

    doc.text(`Cidade: ${ultimoRelatorio.cidade}`, 10, 25);
    doc.text(`Data: ${ultimoRelatorio.data}`, 10, 35);
    doc.text(`Temperatura: ${ultimoRelatorio.temperatura}`, 10, 45);
    doc.text(`Umidade: ${ultimoRelatorio.umidade}`, 10, 55);
    doc.text(`Chance de chuva: ${ultimoRelatorio.chanceChuva}`, 10, 65);
    doc.text(`Vento: ${ultimoRelatorio.vento}`, 10, 75);
    doc.text(`Qualidade do ar: ${ultimoRelatorio.qualidadeAr}`, 10, 85);

    doc.save("relatorio-climatico.pdf");
});