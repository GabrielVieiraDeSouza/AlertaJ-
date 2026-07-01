/* =====================================================================
   perfil.js — Tela "Meus Dados" (parte do Ferlanio)
   CRUD do perfil do usuário via json-server (camada ConfigAPI):
   - Read   : carrega /usuarios/927202 e a região de /configuracoesUsuario
   - Update : PATCH /usuarios/927202 (+ salva a região nas configurações)
   - Delete : DELETE /usuarios/927202
===================================================================== */
(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  let regiaoOriginal = "";

  function feedback(msg, tipo) {
    const el = $("feedback");
    el.textContent = msg;
    el.className = "feedback " + tipo; // 'ok' | 'erro'
  }

  function setAvatar(nome) {
    const a = $("avatar");
    const n = (nome || "").trim();
    a.textContent = n ? n.charAt(0).toUpperCase() : "👤";
  }

  /* ---------- READ: preenche a tela ---------- */
  async function carregar() {
    // região (select) — cidades + valor atual das configurações
    try {
      const [cidades, cfg] = await Promise.all([
        ConfigAPI.obterCidades(),
        ConfigAPI.obterConfig(),
      ]);
      const sel = $("regiao");
      sel.innerHTML = "";
      regiaoOriginal = cfg.regiaoPadrao || "";
      if (regiaoOriginal && !cidades.some((c) => c.Nome === regiaoOriginal)) {
        sel.appendChild(new Option(regiaoOriginal, regiaoOriginal, true, true));
      }
      cidades
        .slice()
        .sort((a, b) => a.Nome.localeCompare(b.Nome))
        .forEach((c) => sel.appendChild(new Option(c.Nome, c.Nome)));
      if (regiaoOriginal) sel.value = regiaoOriginal;
    } catch (e) {
      console.warn("[Meus Dados] não foi possível carregar cidades/config:", e);
    }

    // dados do usuário
    try {
      const u = await ConfigAPI.obterUsuario();
      $("nomeCompleto").value = u.nomeCompleto || u.nome || "";
      $("email").value = u.email || "";
      setAvatar($("nomeCompleto").value);
    } catch (e) {
      feedback("Não foi possível carregar seus dados. O servidor (json-server) está rodando?", "erro");
    }
  }

  /* ---------- UPDATE: salvar alterações ---------- */
  async function salvar(e) {
    e.preventDefault();
    const nome = $("nomeCompleto").value.trim();
    const email = $("email").value.trim();
    const senha = $("senha").value;
    const regiao = $("regiao").value;

    if (!nome) { feedback("Informe o nome completo.", "erro"); return; }
    if (!email) { feedback("Informe o e-mail de contato.", "erro"); return; }

    const patch = { nome: nome, email: email };
    if (senha) patch.senha = senha; // só altera a senha se foi digitada

    try {
      await ConfigAPI.salvarUsuario(patch);
      if (regiao && regiao !== regiaoOriginal) {
        await ConfigAPI.salvarConfig({ regiaoPadrao: regiao });
        regiaoOriginal = regiao;
        document.dispatchEvent(new CustomEvent("alertaja:regiao-changed", { detail: { regiao } }));
      }
      setAvatar(nome);
      $("senha").value = "";
      feedback("✅ Dados salvos com sucesso!", "ok");
    } catch (err) {
      feedback("❌ Erro ao salvar. Verifique se o json-server está ativo.", "erro");
    }
  }

  /* ---------- DELETE: excluir conta ---------- */
  async function excluir() {
    if (!confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) return;
    try {
      await ConfigAPI.excluirUsuario();
      $("form-perfil").reset();
      setAvatar("");
      feedback("Conta excluída com sucesso.", "ok");
    } catch (err) {
      feedback("❌ Erro ao excluir. Verifique se o json-server está ativo.", "erro");
    }
  }

  function init() {
    $("form-perfil").addEventListener("submit", salvar);
    $("btn-excluir").addEventListener("click", excluir);
    $("btn-foto").addEventListener("click", () =>
      feedback("📷 Upload de foto será implementado em uma próxima versão.", "ok")
    );
    carregar();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
