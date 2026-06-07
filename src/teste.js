
const API = "http://localhost:3000"

const listaNoticias  = document.getElementById("listaNoticias")
const msgVazio       = document.getElementById("msgVazio")
const msgCarregando  = document.getElementById("msgCarregando")

let todasNoticias = []

document.getElementById("modalNoticias").addEventListener("show.bs.modal", async () => {
    await carregarNoticias()
    renderizarNoticias()
})

async function carregarNoticias() {
    msgCarregando.style.display = "block"
    listaNoticias.innerHTML = ""
    msgVazio.style.display = "none"

    const res = await fetch(`${API}/noticias`)
    todasNoticias = await res.json()

    msgCarregando.style.display = "none"
}

//Renderização 

function renderizarNoticias() {
    listaNoticias.innerHTML = ""

    if (todasNoticias.length === 0) {
        msgVazio.style.display = "block"
        return
    }

    msgVazio.style.display = "none"
    todasNoticias.forEach(n => listaNoticias.appendChild(criarCard(n)))
}

function criarCard(noticia) {
    const item = document.createElement("div")
    item.className = "noticia-item"

    const imgUrl = noticia.imagems?.["1"]
    const imgHtml = imgUrl
        ? `<img src="${imgUrl}" alt="Imagem da notícia">`
        : `<div class="sem-imagem">IMG</div>`

    item.innerHTML = `
        ${imgHtml}
        <div style="flex:1;min-width:0">
            <div class="noticia-titulo">${noticia.titulo}</div>
            <div class="noticia-resumo">${noticia.resumo}</div>
            <div class="noticia-autor">${noticia.Creditos?.Nome ?? ""} · ${noticia.Creditos?.Profissão ?? ""}</div>
        </div>
    `

    return item
}


document.getElementById("modalNoticias").addEventListener("hidden.bs.modal", () => {
    listaNoticias.innerHTML = ""
    todasNoticias = []
})
