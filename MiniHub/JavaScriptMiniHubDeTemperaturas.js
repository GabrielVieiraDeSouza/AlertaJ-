
/* c48b261a83b3c9b641a788c19a747d5d */
const ContainerDasCartas = document.getElementById("ContainerdasCartas");
const PesquisarCidadeInput = document.getElementById("PesquisaCidade");
const PesquisarCidadeBotao = document.getElementById("BotaoPesquisarCidade")
let CidadesAtivas = []

window.onload = function () {
    console.log(document,"AA")
    CriarCardAoCarregarAPagina()
}

PesquisarCidadeBotao.addEventListener("click", () => {
    const Texto = PesquisarCidadeInput.value
    PesquisarCidade(Texto.toLowerCase())
})

async function CriarModalGraficoTemperatura(CidadeId,NomeCidade) {

    const Resultado = await fetch('https://alerta-ja-api.onrender.com/clima');
    const dados = await Resultado.json();
    const modalTitulo = document.getElementById("TituloCidadeGrafico")
    const modalDescricao = document.getElementById("MensagemHistorico")
    modalTitulo.innerHTML = NomeCidade
    modalDescricao.innerHTML = "Historico de Temperatura nos ultimos 30 dias"

    const canvas = document.getElementById("CanvasHistorico");

    /*-10 pro grafico não ficar grudado na borda da tela*/
    canvas.width = canvas.offsetWidth-10;
    canvas.height = 625;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const dadosCidade = dados[CidadeId];
    const diasData = dadosCidade.Temperatura;
    const dias = [];
    const temperaturas = [];
    for (const dia in diasData) {
        dias.push(dia);
        temperaturas.push(diasData[dia]);
    }

    const paddingLeft = 60;
    const paddingRight = 30;
    const paddingTop = 50;
    const paddingBottom = 90;

    /*define a largura pra adaptar a quantos dias o grafico tem*/
    const larguraUtil = canvas.width - paddingLeft - paddingRight;
    /*define a altura pra adaptar a quantos dias o grafico tem*/
    const alturaUtil = canvas.height - paddingTop - paddingBottom;
    const baseY = canvas.height - paddingBottom;
    const baseX = canvas.height;

    const maxTemp = Math.max(...temperaturas);
    const minTemp = Math.min(...temperaturas);

    const diferenca = Math.max(maxTemp - minTemp, 1);

    //define o espaçamento entre cada ponto ex: 700px / 25 (numero de dias) = 28px de espaçamento entre os pontos
    const espacamento = larguraUtil / Math.max(dias.length - 1, 1);

    //o incremento de cada pontinho de ilustração no eixo y
    const passo = 1;

    /*define o inicio e fim do desenho da linha do eixo y*/
    const inicio = minTemp / passo * passo;
    const fim = maxTemp / passo * passo;

    ctx.font = "12px Arial";

    /*Desenha as grades horizontais*/
    for (let temp = inicio; temp <= fim; temp += passo) {
        const y = baseY -((temp - minTemp) / diferenca) * alturaUtil;

        ctx.strokeStyle = "#CCCCCC";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(paddingLeft, y);
        ctx.lineTo(canvas.width - paddingRight, y);
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.fillText(`${temp}°C`, 10, y + 4);
    }

    ctx.beginPath();

    const primeiroY =baseY - ((temperaturas[0] - minTemp) / diferenca) * alturaUtil;


    ctx.moveTo(paddingLeft, primeiroY);

    for (let i = 1; i < temperaturas.length; i++) {

        const x = paddingLeft + i * espacamento;

        const y = baseY - ((temperaturas[i] - minTemp) / diferenca) * alturaUtil;
        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = "#444";
    ctx.lineWidth = 3;
    ctx.stroke();

    /*Criação dos pontos no grafico*/
    for (let i = 0; i < temperaturas.length; i++) {
        const x = paddingLeft + i * espacamento;
        const y = baseY -((temperaturas[i] - minTemp) / diferenca) * alturaUtil;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#000";
        ctx.fill();
    }


    /*faz as legendas*/
    for (let i = 0; i < dias.length; i++) {
        const x = paddingLeft + i * espacamento;
        ctx.fillStyle = "black";
        ctx.fillText(dias[i], x - 5,canvas.height - 60);
    }

    /* Titulo do eixo x */

    ctx.font = "14px Arial";

    ctx.fillText("Dias atras",canvas.width / 2 -30,canvas.height - 35);

    ctx.save();
                /*eixo x da legenda, dps o y*/
    ctx.translate(200, canvas.height / 2);
    /*rotaciona o texto*/
    ctx.rotate(-Math.PI / 2);
                /* Altura, eixo x, positivo direita esquerda negativo*/
    ctx.fillText("Temperatura (°C)", 0, -190);
    ctx.restore();
}

async function CriarModalGraficoUmidade(CidadeId,NomeCidade) {

    const Resultado = await fetch('https://alerta-ja-api.onrender.com/clima');
    const dados = await Resultado.json();

    const canvas = document.getElementById("CanvasHistorico");
    const modalTitulo = document.getElementById("TituloCidadeGrafico")
    const modalDescricao = document.getElementById("MensagemHistorico")
    modalTitulo.innerHTML = NomeCidade
    modalDescricao.innerHTML = "Historico de Umidade nos ultimos 30 dias"
    canvas.width = canvas.offsetWidth - 50;
    canvas.height = 625;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const dadosCidade = dados[CidadeId];
    

    const diasData = dadosCidade.Umidade;

    const dias = [];
    const umidades = [];

    for (const dia in diasData) {
        dias.push(Number(dia));
        umidades.push(diasData[dia]);
    }

    dias.sort((a, b) => a - b);

    const paddingLeft = 60;
    const paddingRight = 30;
    const paddingTop = 50;
    const paddingBottom = 80;
    const larguraUtil = canvas.width - paddingLeft - paddingRight;
    const alturaUtil = canvas.height - paddingTop - paddingBottom;
    const baseY = canvas.height - paddingBottom;

    const maxUmidade = Math.max(...umidades);
    const minUmidade = Math.min(...umidades);

    const diferenca = Math.max(maxUmidade - minUmidade, 1);

    const espacamento = larguraUtil / Math.max(dias.length - 1, 1);


    const passo = 5;

    const inicio = Math.floor(minUmidade / passo) * passo;
    const fim = Math.ceil(maxUmidade / passo) * passo;

    ctx.font = "12px Arial";
    ctx.fillStyle = "black";

    for (let umidade = inicio; umidade <= fim; umidade += passo) {

        const y = baseY -((umidade - minUmidade) / diferenca) * alturaUtil;
        ctx.strokeStyle = "#444";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(paddingLeft, y);
        ctx.lineTo(canvas.width - paddingRight, y);
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.fillText(`${umidade}%`, 10, y + 4);
    }
    ctx.beginPath();

    const primeiroY = baseY -((umidades[0] - minUmidade) / diferenca) * alturaUtil;
    ctx.moveTo(paddingLeft, primeiroY);

    for (let i = 1; i < umidades.length; i++) {

        const x = paddingLeft + i * espacamento;

        const y = baseY -((umidades[i] - minUmidade) / diferenca) * alturaUtil;
        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.stroke();

    for (let i = 0; i < umidades.length; i++) {

        const x = paddingLeft + i * espacamento;

        const y =baseY -((umidades[i] - minUmidade) / diferenca) * alturaUtil;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);

        ctx.filleStyle = "#444";
        ctx.fill();
    }

    for (let i = 0; i < dias.length; i++) {

        const x = paddingLeft + i * espacamento;
        ctx.fillStyle = "black";
        ctx.fillText(dias[i],x - 5,canvas.height - 30);
    }
    ctx.font = "14px Arial";
    ctx.fillText("Dias Atras",canvas.width / 2 - 20,canvas.height - 5);

    ctx.save();
    ctx.translate(20, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Umidade (%)", 0, -12);
    ctx.restore();
}

function CriarCardAoCarregarAPagina() {
    CriarCardsDasCidades()
}

async function PesquisarCidade(Texto) {
    CidadesAtivas = []
    const Resultado = await fetch("https://alerta-ja-api.onrender.com/cidades")
    const Dados = await Resultado.json()
    ContainerDasCartas.innerHTML = ''
    Dados.forEach(Cidade => {
        const Inclui = (Cidade.Nome.toLowerCase()).includes(Texto)
        if (Inclui & !CidadesAtivas[Cidade.cidadeId]) {
            CriarCard(Cidade.Nome)
            console.log(CidadesAtivas)
        }
    })
}

async function CriarCardsDasCidades() {
    const Dados = await fetch("https://alerta-ja-api.onrender.com/cidades")
    const Cidades = await Dados.json()
    Cidades.forEach(Cidade => {
        CriarCard(Cidade.Nome)
    });
}

async function CriarCard(Cidade) {
    const TemplateDoCard = document.getElementById("Templatecardcidade").content
    const Card = TemplateDoCard.cloneNode(true)
    const DadosClimaticos = await PegarDadosClimaticos(Cidade)
    const ResultadoCidades = await fetch("https://alerta-ja-api.onrender.com/cidades")
    const Cidades = await ResultadoCidades.json()
    
    const CidadeId = Cidades.find(cidade => cidade.Nome === Cidade).id
    Card.querySelector(".TituloCidade").textContent = Cidade
    Card.querySelector(".Temperatura").textContent = DadosClimaticos.main.feels_like + "°C"
    Card.querySelector(".Umidade").textContent = DadosClimaticos.main.humidity + "%"
    Card.querySelector(".VelocidadeVento").textContent = (DadosClimaticos.wind.speed * 3.6).toFixed(1) + " km/h"
    Card.querySelector(".BotaoTemperatura").addEventListener("click", () => {
        const modal = document.getElementById("GraficoTemperatura");
        modal.addEventListener("shown.bs.modal", function handler() {
        CriarModalGraficoTemperatura(CidadeId,Cidade);

        modal.removeEventListener("shown.bs.modal", handler);
    });
});
    Card.querySelector(".BotaoUmidade").addEventListener("click", () => {
        const modal = document.getElementById("GraficoTemperatura");
        modal.addEventListener("shown.bs.modal", function handler() {
        CriarModalGraficoUmidade(CidadeId,Cidade);

        modal.removeEventListener("shown.bs.modal", handler);
    });
});
    CidadesAtivas.push(Cidade)
    ContainerDasCartas.appendChild(Card)
}

async function PegarDadosClimaticos(Cidade) {
    let CoordenadasLatLong = await PegarCoordernadasgeocoding(Cidade)
    const Resultados = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${CoordenadasLatLong[0]}&lon=${CoordenadasLatLong[1]}&appid=15ee17bcb2deda2323ebee3856ede172&units=metric`)
    const data = await Resultados.json();
    console.log(data)
    return data;
}

async function PegarCoordernadasgeocoding(Cidade) {
    const Resultados = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${Cidade}&limit=5&appid=15ee17bcb2deda2323ebee3856ede172`)
    const data = await Resultados.json();
    return [data[0].lat, data[0].lon];
}
