const API = "http://localhost:3000"

const listaNoticias    = document.getElementById("listaNoticias")
const msgVazio         = document.getElementById("msgVazio")
const msgCarregando    = document.getElementById("msgCarregando")
const listaCategorias  = document.getElementById("listaCategorias")
const btnDropdown      = document.getElementById("dropdownCategorias")
const modalNoticias    = document.getElementById("modalNoticias")

let todosAlertas = []


window.addEventListener("load", async () => {
    msgCarregando.style.display = "block"
    await carregarAlertas()
    msgCarregando.style.display = "none"
    montarDropdownCategorias()
})

async function carregarAlertas() {
    const res = await fetch(`${API}/alerta`)
    todosAlertas = await res.json()
}


function montarDropdownCategorias() {
    const unicas = [...new Set(todosAlertas.map(a => a.categoria))].sort()

    unicas.forEach(cat => {
        const li = document.createElement("li")
        li.innerHTML = `<a class="dropdown-item" href="#" data-id="${cat}">${cat}</a>`
        listaCategorias.appendChild(li)
    })
}


listaCategorias.addEventListener("click", e => {
    if (!e.target.matches(".dropdown-item")) return
    e.preventDefault()

    listaCategorias.querySelectorAll(".dropdown-item").forEach(el => el.classList.remove("active"))
    e.target.classList.add("active")

    btnDropdown.textContent = e.target.textContent
    btnDropdown.dataset.idSelecionado = e.target.dataset.id
})


modalNoticias.addEventListener("show.bs.modal", () => {
    renderizarAlertas()
})


function alertasFiltrados() {
    const termo          = document.getElementById("ProcurarNoticia").value.toLowerCase().trim()
    const categoriaAtiva = btnDropdown.dataset.idSelecionado ?? ""

    return todosAlertas.filter(a => {
        const matchCategoria = !categoriaAtiva || a.categoria === categoriaAtiva
        const matchTexto     = !termo
            || a.titulo.toLowerCase().includes(termo)
            || a.descricao.toLowerCase().includes(termo)
        return matchCategoria && matchTexto
    })
}

function renderizarAlertas() {
    const resultado = alertasFiltrados()
    listaNoticias.innerHTML = ""

    if (resultado.length === 0) {
        msgVazio.style.display = "block"
        return
    }

    msgVazio.style.display = "none"
    resultado.forEach(a => listaNoticias.appendChild(criarCard(a)))
}

function criarCard(alerta) {
    const item = document.createElement("div")
    item.className = "noticia-item"

    const imgHtml = alerta.imagem
        ? `<img src="${alerta.imagem}" alt="Imagem do alerta">`
        : `<div class="sem-imagem">IMG</div>`

    item.innerHTML = `
        ${imgHtml}
        <div style="flex:1;min-width:0">
            <div class="noticia-titulo">${alerta.titulo}</div>
            <div class="noticia-resumo">${alerta.descricao}</div>
            <div class="noticia-autor">${alerta.categoria}</div>
        </div>
    `

    // Clicar fecha o modal e navega para a página de detalhes do alerta
    item.addEventListener("click", () => {
        bootstrap.Modal.getInstance(modalNoticias)?.hide()
        window.location.href = `${alerta.link}?id=${alerta.id}`
    })

    return item
}

// Limpa a lista ao fechar o modal para não acumular resultados antigos
modalNoticias.addEventListener("hidden.bs.modal", () => {
    listaNoticias.innerHTML = ""
})