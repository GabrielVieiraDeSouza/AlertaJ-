const API = "http://localhost:3000"

const listaNoticias = document.getElementById("listaNoticias")
const msgVazio = document.getElementById("msgVazio")
const msgCarregando = document.getElementById("msgCarregando")
const listaCategorias = document.getElementById("listaCategorias")
const btnDropdown = document.getElementById("dropdownCategorias")

let todasNoticias = []

//carrega os botão do header

window.onload = async function () {
    await carregarCategoriasHeader()
}

async function carregarCategoriasHeader() {
    const res = await fetch(`${API}/categorias`)
    const categorias = await res.json()

    categorias.forEach(cat => {
        const li = document.createElement("li")
        li.innerHTML = `<a class="dropdown-item" href="#" data-id="${cat.id}">${cat.nome}</a>`
        listaCategorias.appendChild(li)
    })
}

//Atualiza o butão das categorias
listaCategorias.addEventListener("click", e => {
    if (!e.target.matches(".dropdown-item")) return
    e.preventDefault()

    listaCategorias.querySelectorAll(".dropdown-item").forEach(el => el.classList.remove("active"))
    e.target.classList.add("active")

    btnDropdown.textContent = e.target.textContent
    btnDropdown.dataset.idSelecionado = e.target.dataset.id
})

// carrega notícias e filtra 

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

// ── Lê os filtros dos campos do header 

function noticiasFiltradas() {
    const termo = document.getElementById("ProcurarNoticia").value.toLowerCase()
    const categoriaAtiva = btnDropdown.dataset.idSelecionado ?? ""

    return todasNoticias.filter(n => {
        const matchCategoria = !categoriaAtiva || String(n.categoriaId) === categoriaAtiva
        const matchTexto = !termo || n.titulo.toLowerCase().includes(termo) || n.resumo.toLowerCase().includes(termo)
        return matchCategoria && matchTexto
    })
}

// ── Renderização 

function renderizarNoticias() {
    const resultado = noticiasFiltradas()
    listaNoticias.innerHTML = ""

    if (resultado.length === 0) {
        msgVazio.style.display = "block"
        return
    }
    msgVazio.style.display = "none"
    resultado.forEach(n => listaNoticias.appendChild(criarCard(n)))
}

function criarCard(noticia) {
    const item = document.createElement("div")
    item.className = "noticia-item"
    const imgUrl  = noticia.imagems?.["1"]
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