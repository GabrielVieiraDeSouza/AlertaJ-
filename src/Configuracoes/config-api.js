/* =====================================================================
   config-api.js — Camada de acesso ao json-server (parte do Ferlanio)
   Centraliza os fetch de usuário e configurações e mantém um cache em
   localStorage (para o tema aplicar instantaneamente e funcionar mesmo
   se o servidor estiver offline). Expõe window.ConfigAPI.
===================================================================== */
(function () {
  const API = "http://localhost:3000";
  const USUARIO_ID = "927202";        // sem login: usuário fixo (premissa documentada)
  const CONFIG_ID = "1";              // id do registro em /configuracoesUsuario
  const CACHE_KEY = "alertaJa_config";

  const PADRAO = {
    temaEscuro: false,
    notificacoesAtivas: true,
    regiaoPadrao: "Belo Horizonte",
    idioma: "pt-BR",
  };

  const ConfigAPI = {
    USUARIO_ID,

    /* ---------- cache local ---------- */
    lerCache() {
      try { return JSON.parse(localStorage.getItem(CACHE_KEY)) || null; }
      catch (e) { return null; }
    },
    gravarCache(cfg) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cfg));
    },

    /* ---------- configurações ---------- */
    async obterConfig() {
      try {
        const r = await fetch(`${API}/configuracoesUsuario/${CONFIG_ID}`);
        if (!r.ok) throw new Error("HTTP " + r.status);
        const cfg = await r.json();
        this.gravarCache(cfg);
        return cfg;
      } catch (e) {
        // servidor offline: usa cache ou padrão
        return this.lerCache() || { ...PADRAO };
      }
    },

    async salvarConfig(patch) {
      const atual = this.lerCache() || { ...PADRAO };
      const novo = { ...atual, ...patch };
      this.gravarCache(novo); // salva já no cache (resposta instantânea)
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

    /* ---------- usuário (Meus Dados) ---------- */
    async obterUsuario() {
      const r = await fetch(`${API}/usuarios/${USUARIO_ID}`);
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    },

    async salvarUsuario(patch) {
      const r = await fetch(`${API}/usuarios/${USUARIO_ID}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    },

    async excluirUsuario() {
      const r = await fetch(`${API}/usuarios/${USUARIO_ID}`, { method: "DELETE" });
      if (!r.ok) throw new Error("HTTP " + r.status);
      return true;
    },

    /* ---------- cidades (para a Região Principal) ---------- */
    async obterCidades() {
      try {
        const r = await fetch(`${API}/cidades`);
        if (!r.ok) throw new Error("HTTP " + r.status);
        return await r.json();
      } catch (e) {
        // fallback caso o servidor esteja fora
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
