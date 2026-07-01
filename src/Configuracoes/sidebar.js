/* =====================================================================
   sidebar.js — Sidebar de Configurações (parte do Ferlanio)
   Injeta a sidebar em qualquer página, carrega/salva as configurações
   no json-server (via ConfigAPI) e aplica o tema global.
   Expõe window.AlertaConfig para os outros módulos integrarem.
   Basta incluir <script src=".../sidebar.js" defer></script> na página
   (e o config-api.js antes dele).
===================================================================== */
(function () {
  "use strict";

  // Resolve o caminho da pasta Configuracoes/ a partir da tag <script>
  // para que o link "Meus Dados" funcione em páginas de subpastas.
  const meuScript = document.currentScript;
  const BASE = meuScript ? meuScript.src.replace(/sidebar\.js.*$/, "") : "";

  const ouvintes = [];
  let estado = { temaEscuro: false, notificacoesAtivas: true, regiaoPadrao: "" };

  /* ---------- Tema global ---------- */
  function aplicarTema(escuro) {
    const html = document.documentElement;
    if (escuro) {
      html.setAttribute("data-theme", "dark");
      html.setAttribute("data-bs-theme", "dark"); // componentes Bootstrap
    } else {
      html.removeAttribute("data-theme");
      html.removeAttribute("data-bs-theme");
    }
  }

  function notificar(tipo, detail) {
    document.dispatchEvent(new CustomEvent(tipo, { detail }));
    ouvintes.forEach((cb) => { try { cb(estado); } catch (e) {} });
  }

  /* ---------- Markup da sidebar ---------- */
  function montarSidebar() {
    const overlay = document.createElement("div");
    overlay.id = "aj-overlay";

    const aside = document.createElement("aside");
    aside.id = "aj-sidebar";
    aside.innerHTML = `
      <div class="aj-sb-header">
        <h2>⚙️ Configurações</h2>
        <button class="aj-sb-fechar" id="aj-fechar" aria-label="Fechar">✖</button>
      </div>

      <div class="aj-sb-perfil">
        <div class="aj-sb-avatar" id="aj-avatar">👤</div>
        <div>
          <div class="nome" id="aj-nome">Olá!</div>
          <a class="link-perfil" href="${BASE}perfil.html">⚙️ Meus Dados</a>
        </div>
      </div>

      <div class="aj-sb-body">
        <div class="aj-item">
          <label for="aj-notif">🔔 Notificações de Alerta</label>
          <label class="aj-switch"><input type="checkbox" id="aj-notif"><span class="slider"></span></label>
        </div>

        <div class="aj-item">
          <label for="aj-tema">🌙 Tema Escuro</label>
          <label class="aj-switch"><input type="checkbox" id="aj-tema"><span class="slider"></span></label>
        </div>

        <div class="aj-item coluna">
          <label for="aj-regiao">📍 Região Principal</label>
          <select id="aj-regiao"></select>
        </div>
      </div>

      <div class="aj-sb-footer">
        <button class="aj-btn-sair" id="aj-sair">🚪 Sair</button>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(aside);
    return { overlay, aside };
  }

  /* ---------- Abrir / Fechar ---------- */
  function abrir() {
    document.getElementById("aj-sidebar").classList.add("aberta");
    document.getElementById("aj-overlay").classList.add("ativo");
  }
  function fechar() {
    document.getElementById("aj-sidebar").classList.remove("aberta");
    document.getElementById("aj-overlay").classList.remove("ativo");
  }

  /* ---------- Liga o gatilho "Configurações" do header ---------- */
  function ligarGatilhos() {
    let achou = false;
    document.querySelectorAll("a").forEach((a) => {
      if (a.textContent.trim().toLowerCase() === "configurações") {
        a.addEventListener("click", (e) => { e.preventDefault(); abrir(); });
        achou = true;
      }
    });
    if (!achou) {
      // fallback: botão flutuante
      const fab = document.createElement("button");
      fab.id = "aj-fab";
      fab.textContent = "⚙️";
      fab.title = "Configurações";
      fab.addEventListener("click", abrir);
      document.body.appendChild(fab);
    }
  }

  /* ---------- Preenche o select de regiões (cidades) ---------- */
  async function preencherRegioes(atual) {
    const sel = document.getElementById("aj-regiao");
    const cidades = await ConfigAPI.obterCidades();
    sel.innerHTML = "";
    // garante que o valor salvo apareça mesmo se não estiver na lista
    if (atual && !cidades.some((c) => c.Nome === atual)) {
      sel.appendChild(new Option(atual, atual, true, true));
    }
    cidades
      .slice()
      .sort((a, b) => a.Nome.localeCompare(b.Nome))
      .forEach((c) => sel.appendChild(new Option(c.Nome, c.Nome)));
    if (atual) sel.value = atual;
  }

  /* ---------- Inicialização ---------- */
  async function init() {
    montarSidebar();
    ligarGatilhos();

    document.getElementById("aj-fechar").addEventListener("click", fechar);
    document.getElementById("aj-overlay").addEventListener("click", fechar);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") fechar(); });

    // carrega configurações (servidor -> cache -> padrão)
    estado = await ConfigAPI.obterConfig();

    const notif = document.getElementById("aj-notif");
    const tema = document.getElementById("aj-tema");

    notif.checked = !!estado.notificacoesAtivas;
    tema.checked = !!estado.temaEscuro;
    aplicarTema(tema.checked);
    await preencherRegioes(estado.regiaoPadrao);

    // eventos de mudança
    tema.addEventListener("change", async (e) => {
      estado.temaEscuro = e.target.checked;
      aplicarTema(estado.temaEscuro);
      await ConfigAPI.salvarConfig({ temaEscuro: estado.temaEscuro });
      notificar("alertaja:tema-changed", { tema: estado.temaEscuro ? "escuro" : "claro" });
    });

    notif.addEventListener("change", async (e) => {
      estado.notificacoesAtivas = e.target.checked;
      await ConfigAPI.salvarConfig({ notificacoesAtivas: estado.notificacoesAtivas });
      if (e.target.checked) {
        // feedback discreto
        const fb = document.getElementById("aj-nome");
        // (sem alert intrusivo: apenas log)
        console.log("[Alerta Já] Notificações ativadas para a sua região.");
      }
    });

    document.getElementById("aj-regiao").addEventListener("change", async (e) => {
      estado.regiaoPadrao = e.target.value;
      await ConfigAPI.salvarConfig({ regiaoPadrao: estado.regiaoPadrao });
      notificar("alertaja:regiao-changed", { regiao: estado.regiaoPadrao });
    });

    document.getElementById("aj-sair").addEventListener("click", (ev) => {
      // se estiver logado, encerra a sessão; em ambos os casos vai para o login
      if (ev.currentTarget.dataset.acao === "sair") {
        try { localStorage.removeItem("alertaJa_sessao"); } catch (e) {}
      }
      window.location.href = BASE + "login.html";
    });

    // reflete o estado de login (logado x visitante)
    let sess = null;
    try { sess = JSON.parse(localStorage.getItem("alertaJa_sessao")); } catch (e) {}
    const linkPerfil = document.querySelector("#aj-sidebar .link-perfil");
    const btnSair = document.getElementById("aj-sair");
    if (sess) {
      const primeiro = (sess.nome || "Usuário").split(" ")[0];
      document.getElementById("aj-nome").textContent = "Olá, " + primeiro + (sess.admin ? " (Admin)" : "");
      document.getElementById("aj-avatar").textContent = (sess.nome || "U").trim().charAt(0).toUpperCase();
      linkPerfil.textContent = "⚙️ Meus Dados";
      linkPerfil.setAttribute("href", BASE + "perfil.html");
      btnSair.textContent = "🚪 Sair";
      btnSair.dataset.acao = "sair";
    } else {
      document.getElementById("aj-nome").textContent = "Visitante";
      document.getElementById("aj-avatar").textContent = "👤";
      linkPerfil.textContent = "🔑 Entrar / Cadastrar";
      linkPerfil.setAttribute("href", BASE + "login.html");
      btnSair.textContent = "🔓 Entrar";
      btnSair.dataset.acao = "entrar";
    }
  }

  /* ---------- API pública para os outros módulos ---------- */
  window.AlertaConfig = {
    getRegiao: () => estado.regiaoPadrao,
    getTema: () => (estado.temaEscuro ? "escuro" : "claro"),
    onChange: (cb) => { if (typeof cb === "function") ouvintes.push(cb); },
    abrir,
    fechar,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
