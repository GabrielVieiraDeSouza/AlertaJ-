/* =====================================================================
   config-api.js — Camada de acesso ao json-server (parte do Ferlanio)
   Centraliza os fetch de usuário/configurações e mantém um cache em
   localStorage. Agora também: cria usuário (cadastro) e autentica (login).
   O id do usuário vem da SESSÃO (alertaJa_sessao); se não houver login,
   cai no usuário-exemplo 927202. Expõe window.ConfigAPI.
===================================================================== */
(function () {
  "use strict";
  const API = "http://localhost:3000";
  const CONFIG_ID = "1";
  const CACHE_KEY = "alertaJa_config";
  const SESSAO_KEY = "alertaJa_sessao";

  const PADRAO = {
    temaEscuro: false,
    notificacoesAtivas: true,
    regiaoPadrao: "Belo Horizonte",
    idioma: "pt-BR",
  };

  // id do usuário logado (sessão); fallback para o usuário-exemplo
  function idAtual() {
    try {
      const s = JSON.parse(localStorage.getItem(SESSAO_KEY));
      return s && s.id ? s.id : "927202";
    } catch (e) {
      return "927202";
    }
  }

  const ConfigAPI = {
    idAtual,

    /* ---------- cache local ---------- */
    lerCache() {
      try { return JSON.parse(localStorage.getItem(CACHE_KEY)) || null; }
      catch (e) { return null; }
    },
    gravarCache(cfg) { localStorage.setItem(CACHE_KEY, JSON.stringify(cfg)); },

    /* ---------- configurações ---------- */
    async obterConfig() {
      try {
        const r = await fetch(`${API}/configuracoesUsuario/${CONFIG_ID}`);
        if (!r.ok) throw new Error("HTTP " + r.status);
        const cfg = await r.json();
        this.gravarCache(cfg);
        return cfg;
      } catch (e) {
        return this.lerCache() || { ...PADRAO };
      }
    },
    async salvarConfig(patch) {
      const atual = this.lerCache() || { ...PADRAO };
      const novo = { ...atual, ...patch };
      this.gravarCache(novo);
      try {
        await fetch(`${API}/configuracoesUsuario/${CONFIG_ID}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        });
      } catch (e) {
        console.warn("[Alerta Já] Config salva localmente (servidor offline).");
      }
      return novo;
    },

    /* ---------- usuário logado (Meus Dados) ---------- */
    async obterUsuario() {
      const r = await fetch(`${API}/usuarios/${idAtual()}`);
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    },
    async salvarUsuario(patch) {
      const r = await fetch(`${API}/usuarios/${idAtual()}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    },
    async excluirUsuario() {
      const r = await fetch(`${API}/usuarios/${idAtual()}`, { method: "DELETE" });
      if (!r.ok) throw new Error("HTTP " + r.status);
      return true;
    },

    /* ---------- CADASTRO (CREATE) ---------- */
    async criarUsuario({ nome, email, senha }) {
      // novos usuários nascem comuns (admin: false)
      const r = await fetch(`${API}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, admin: false }),
      });
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    },
    // verifica se já existe alguém com este e-mail (evita duplicado)
    async emailExiste(email) {
      const r = await fetch(`${API}/usuarios?email=${encodeURIComponent(email)}`);
      if (!r.ok) return false;
      const lista = await r.json();
      return Array.isArray(lista) && lista.length > 0;
    },

    /* ---------- LOGIN (autenticação) ---------- */
    async autenticar(email, senha) {
      const r = await fetch(
        `${API}/usuarios?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`
      );
      if (!r.ok) throw new Error("HTTP " + r.status);
      const lista = await r.json();
      return Array.isArray(lista) && lista.length ? lista[0] : null;
    },

    /* ---------- cidades (Região Principal) ---------- */
    async obterCidades() {
      try {
        const r = await fetch(`${API}/cidades`);
        if (!r.ok) throw new Error("HTTP " + r.status);
        return await r.json();
      } catch (e) {
        return [
          { id: "1", Nome: "Belo Horizonte" },
          { id: "0", Nome: "Contagem" },
          { id: "2", Nome: "Betim" },
        ];
      }
    },
  };

  window.ConfigAPI = ConfigAPI;
})();
