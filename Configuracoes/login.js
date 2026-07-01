/* =====================================================================
   login.js — Tela de Login (parte do Ferlanio)
   Autentica o e-mail+senha contra /usuarios (via ConfigAPI.autenticar),
   salva a sessão (Auth.salvarSessao) e leva para a Home.
===================================================================== */
(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);

  function feedback(msg, tipo) {
    const el = $("feedback");
    el.textContent = msg;
    el.className = "feedback " + tipo; // 'ok' | 'erro'
  }

  async function entrar(e) {
    e.preventDefault();
    const email = $("email").value.trim();
    const senha = $("senha").value;

    if (!email || !senha) { feedback("Preencha e-mail e senha.", "erro"); return; }

    try {
      const usuario = await ConfigAPI.autenticar(email, senha);
      if (!usuario) { feedback("E-mail ou senha incorretos.", "erro"); return; }

      Auth.salvarSessao(usuario);
      feedback("✅ Bem-vindo(a), " + (usuario.nome || "") + "! Entrando...", "ok");
      setTimeout(() => { window.location.href = "../index.html"; }, 600);
    } catch (err) {
      feedback("❌ Erro ao conectar. O json-server está rodando na porta 3000?", "erro");
    }
  }

  function init() {
    $("form-login").addEventListener("submit", entrar);
    // se já estiver logado, mostra um aviso amistoso (opcional)
    const s = Auth.getSessao();
    if (s) feedback("Você já está logado como " + s.nome + ".", "ok");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
