/* =====================================================================
   cadastro.js — Tela de Cadastro de Usuário (parte do Ferlanio)
   CREATE do CRUD de usuário: valida, evita e-mail duplicado, cria via
   ConfigAPI.criarUsuario (POST /usuarios, admin:false), faz login
   automático e leva para a Home.
===================================================================== */
(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);

  function feedback(msg, tipo) {
    const el = $("feedback");
    el.textContent = msg;
    el.className = "feedback " + tipo;
  }

  function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function cadastrar(e) {
    e.preventDefault();
    const nome = $("nome").value.trim();
    const email = $("email").value.trim();
    const senha = $("senha").value;

    if (!nome) { feedback("Informe seu nome.", "erro"); return; }
    if (!emailValido(email)) { feedback("Informe um e-mail válido.", "erro"); return; }
    if (senha.length < 4) { feedback("A senha deve ter pelo menos 4 caracteres.", "erro"); return; }

    try {
      if (await ConfigAPI.emailExiste(email)) {
        feedback("Já existe uma conta com este e-mail. Tente fazer login.", "erro");
        return;
      }
      const novo = await ConfigAPI.criarUsuario({ nome, email, senha });
      Auth.salvarSessao(novo); // login automático após o cadastro
      feedback("✅ Conta criada! Entrando...", "ok");
      setTimeout(() => { window.location.href = "../index.html"; }, 700);
    } catch (err) {
      feedback("❌ Erro ao cadastrar. O json-server está rodando na porta 3000?", "erro");
    }
  }

  function init() {
    $("form-cadastro").addEventListener("submit", cadastrar);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
