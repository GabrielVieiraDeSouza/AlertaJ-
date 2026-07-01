/* =====================================================================
   auth.js — Sessão e controle de acesso (parte do Ferlanio)
   Guarda quem está logado no localStorage (chave alertaJa_sessao) e
   oferece as "travas" (guards) para proteger páginas.
   Expõe window.Auth + atalhos globais exigirLogin()/exigirAdmin().
   NÃO depende de fetch — é só leitura/escrita de sessão local.
===================================================================== */
(function () {
  "use strict";
  const SESSAO_KEY = "alertaJa_sessao";

  const Auth = {
    /* lê a sessão atual (ou null) */
    getSessao() {
      try { return JSON.parse(localStorage.getItem(SESSAO_KEY)); }
      catch (e) { return null; }
    },

    /* grava a sessão a partir do usuário autenticado */
    salvarSessao(usuario) {
      const sessao = {
        id: usuario.id,
        nome: usuario.nome || "Usuário",
        email: usuario.email || "",
        admin: !!usuario.admin,
      };
      localStorage.setItem(SESSAO_KEY, JSON.stringify(sessao));
      return sessao;
    },

    estaLogado() { return !!this.getSessao(); },
    ehAdmin() { const s = this.getSessao(); return !!(s && s.admin); },

    /* encerra a sessão; redireciona se um destino for passado */
    logout(redirect) {
      localStorage.removeItem(SESSAO_KEY);
      if (redirect) window.location.href = redirect;
    },

    /* GUARD: exige usuário logado (qualquer um) */
    exigirLogin(urlLogin) {
      if (!this.estaLogado()) {
        window.location.replace(urlLogin || "login.html");
        return false;
      }
      return true;
    },

    /* GUARD: exige usuário ADMIN.
       Sem sessão -> vai para o login; logado mas não-admin -> volta para a home.
       Usa location.replace para o guard não ficar no histórico (botão Voltar). */
    exigirAdmin(urlLogin, urlHome) {
      const s = this.getSessao();
      if (!s) {
        window.location.replace(urlLogin || "login.html");
        return false;
      }
      if (!s.admin) {
        window.location.replace(urlHome || "../index.html");
        return false;
      }
      return true;
    },
  };

  window.Auth = Auth;
  // atalhos para o guard caber em 1 linha na página protegida
  window.exigirLogin = (urlLogin) => Auth.exigirLogin(urlLogin);
  window.exigirAdmin = (urlLogin, urlHome) => Auth.exigirAdmin(urlLogin, urlHome);
})();
