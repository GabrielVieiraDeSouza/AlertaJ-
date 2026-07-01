# Alerta Já — Prevenção de Desastres Naturais

`Trabalho Interdisciplinar: Aplicações Web Front-End`

`Sistemas de Informação — 1º Semestre (Manhã)`

`PUC Minas — Campus São Gabriel`

**Equipe:** T1-G6 — *Alerta Já!*

## Participantes

| Integrante | Módulo / Responsabilidade | Tipo |
|---|---|:--:|
| Rafael Almeida | Cadastro de Alertas de Risco | CI |
| Ferlânio José Duarte Nascimento | Sidebar de Configurações, Perfil (Meus Dados), Cadastro/Login e Tema Claro/Escuro | CI |
| Tiago Malta Leão | Notícias e Alertas Recentes | AI |
| Gabriel Vieira de Souza | MiniHub de Temperaturas e integração da Homepage | AI |
| Dan Lucca Angotti Duarte | Histórico de Informações por Locais | AI |

> **CI** = Cadastro de Informação · **AI** = Apresentação de Informação

---

## Sumário

1. [Contexto do Projeto](#1-contexto-do-projeto)
2. [Processo de Product Discovery](#2-processo-de-product-discovery)
3. [Processo de Product Design](#3-processo-de-product-design)
4. [Metodologia](#4-metodologia)
5. [Solução Implementada](#5-solução-implementada)
6. [Referências Bibliográficas](#6-referências-bibliográficas)

---

# 1. Contexto do Projeto

## 1.1. Problema

Desastres naturais como **chuvas intensas, enchentes e deslizamentos** atingem com frequência **Minas Gerais**, causando perdas materiais e colocando vidas em risco. Nesses momentos, as pessoas que moram em **áreas de risco** enfrentam um problema recorrente: **a falta de informação clara, confiável e no momento certo**.

As informações costumam chegar de forma **fragmentada, confusa ou tardia**, muitas vezes misturadas a **notícias falsas (fake news)** e a **termos técnicos** difíceis de entender. O resultado é a **dúvida na hora de decidir**: sair de casa ou ficar? Para onde ir? O que já aconteceu na minha região?

Esse problema acontece no dia a dia de **moradores comuns**, que precisam de uma fonte simples e centralizada para acompanhar alertas e riscos da sua localidade. É nesse contexto — de **prevenção e apoio à tomada de decisão em situações de emergência** — que a aplicação será utilizada.

## 1.2. Objetivo do Projeto

**Objetivo geral:** desenvolver uma **plataforma web** que centralize informações e alertas sobre desastres naturais, apresentando o conteúdo de forma **simples, rápida e confiável** para auxiliar a população na **prevenção e na tomada de decisão**.

**Objetivos específicos:**

1. **Apresentar alertas e notícias de risco por localidade**, com linguagem acessível e destaque para as ocorrências mais urgentes.
2. **Disponibilizar consultas de apoio** — histórico de ocorrências por local e dados climáticos (temperatura e umidade) por cidade.
3. **Oferecer personalização e segurança de acesso** — permitir que o usuário ajuste suas preferências (região, tema, notificações) e restringir o cadastro de alertas apenas a **administradores**.

## 1.3. Justificativa

Segundo a Defesa Civil, boa parte das mortes e prejuízos em episódios de enchentes e deslizamentos poderia ser reduzida com **informação preventiva e tempo hábil para agir**. A motivação do grupo nasceu da percepção de que, embora existam fontes oficiais, elas **nem sempre são simples ou centralizadas** para o morador comum.

O grupo escolheu concentrar a prática investigativa em dois aspectos: **(1) a clareza da informação** (linguagem simples, sem termos técnicos, para combater a confusão e as fake news) e **(2) a personalização por localidade** (para que o usuário veja o que é relevante para a sua região). Essas escolhas se justificam pelo perfil do público-alvo, detalhado a seguir, e foram sustentadas pelo levantamento do problema conduzido na fase de *Discovery* (storytelling, persona e mapa de stakeholders).

## 1.4. Público-alvo

A solução é voltada para **cidadãos que vivem em áreas sujeitas a desastres naturais** e para quem precisa acompanhar riscos na sua região:

- **Moradores de áreas de risco** e **famílias** que podem perder suas casas em desabamentos, deslizamentos ou enchentes;
- **Agricultores** e **comunidades inteiras** afetadas por chuvas, secas e temporais;
- **Administradores/Defesa Civil**, responsáveis por cadastrar e manter os alertas de risco.

**Perfil dos usuários:** em geral têm **pouca familiaridade técnica**, acessam a internet **pelo celular** e precisam de uma interface **objetiva e com linguagem simples**. Não há relação hierárquica complexa: a maioria são usuários finais (consulta), e um grupo restrito atua como administrador (cadastro de alertas).

---

# 2. Processo de Product Discovery

Durante a fase de Estratégia, o grupo aplicou técnicas de **Design Thinking** para entender o problema antes de projetar a solução.

## 2.1. Matriz CSD (Matriz de Alinhamento)

| Certezas | Suposições | Dúvidas |
|---|---|---|
| Desastres naturais são recorrentes em Minas Gerais. | O usuário prefere linguagem simples a termos técnicos. | Qual o canal ideal de alerta (site, app, notificação)? |
| A informação hoje é confusa, dispersa e às vezes tardia. | A personalização por região aumenta o engajamento. | Com que frequência o usuário consultaria a plataforma? |
| Existe demanda por uma fonte centralizada e confiável. | Fake news atrapalham a decisão em emergências. | Quem deve poder cadastrar/validar os alertas? |

> 🔴 **[GRUPO]** Se o quadro real da Matriz de Alinhamento (feito pelo Dan Lucca) tiver itens diferentes, ajuste esta tabela ou insira a imagem do artefato.

## 2.2. Mapa de Stakeholders

- **Usuários finais** — moradores de áreas de risco, famílias, agricultores (consomem alertas e informações).
- **Administradores** — responsáveis por cadastrar e manter os alertas de risco.
- **Defesa Civil / Prefeitura** — fontes de informação oficial e potenciais parceiros.
- **Equipe de desenvolvimento** — o grupo T1-G6.

> 🔴 **[GRUPO]** Insira aqui a imagem do Mapa de Stakeholders (feito pelo Tiago Malta), se disponível.

## 2.3. Entrevistas Qualitativas e Highlights de Pesquisa

O levantamento do problema foi conduzido por meio de **storytelling** (a história da Maria, moradora de área de risco) e da **construção da persona**, complementados por conversas informais com pessoas do perfil-alvo. Principais *highlights*:

- As pessoas se sentem **inseguras para decidir** (sair ou ficar) por falta de informação clara.
- **Termos técnicos e fake news** aumentam a confusão em momentos críticos.
- Há forte valor em **avisos antecipados** e em **informação por localidade**.

> 🔴 **[GRUPO]** Se foram realizadas entrevistas formais, inclua aqui o roteiro, os participantes e os resultados.

## 2.4. Personas

**Maria da Silva** — 45 anos, costureira autônoma.

- **Perfil:** batalhadora, conectada com os vizinhos, mora em área de risco; fica ansiosa em dias de chuva forte.
- **Objetivos:** receber alertas com antecedência, proteger a família e ter tempo para agir.
- **Dores:** informações confusas, fake news, alertas atrasados e linguagem difícil.
- **Preferências:** informação simples e clara, comunicação rápida e sem termos técnicos.

---

# 3. Processo de Product Design

## 3.1. Histórias de Usuário

**Contexto: Alertas e prevenção**
- Como **moradora de área de risco**, quero **receber alertas antes dos desastres**, para **ter tempo de proteger minha família**.
- Como **usuária**, quero **ver informações simples e claras**, para **não me confundir com termos técnicos**.
- Como **usuária**, quero **saber onde ficam os abrigos e as rotas seguras**, para **me proteger em caso de enchente**.

**Contexto: Consulta de informações**
- Como **moradora do bairro**, quero **consultar o histórico de ocorrências da minha cidade**, para **entender os riscos da região**.
- Como **usuária**, quero **ver a temperatura e a umidade da minha cidade**, para **acompanhar as condições do tempo**.
- Como **usuária**, quero **ler as notícias e alertas mais recentes**, para **me manter informada**.

**Contexto: Conta e personalização**
- Como **novo usuário**, quero **criar uma conta e fazer login**, para **acessar a plataforma de forma personalizada**.
- Como **usuária**, quero **escolher minha região principal, o tema (claro/escuro) e as notificações**, para **adequar o sistema às minhas necessidades**.
- Como **administrador**, quero **cadastrar, editar e remover alertas de risco**, para **manter a informação atualizada e confiável**.

## 3.2. Proposta de Valor

A plataforma **Alerta Já** entrega:

- ✅ **Alertas rápidos e confiáveis** de desastres naturais;
- ✅ **Informações simples e fáceis de entender**, sem termos técnicos;
- ✅ **Orientação em situações de emergência** (histórico, clima, notícias por localidade);
- ✅ **Apoio à tomada de decisão** em momentos críticos.

Transformações entregues: *informação confusa → alertas claros*; *falta de tempo → avisos antecipados*; *insegurança → mais confiança para agir*.

> 🔴 **[GRUPO]** Insira aqui o diagrama do Mapa da Proposta de Valor (feito pelo Ferlânio), se houver a imagem.

## 3.3. Requisitos do Projeto

### Requisitos Funcionais (RF)

| ID | Requisito | Responsável |
|---|---|---|
| RF-01 | Permitir o **cadastro de novos usuários** | Ferlânio |
| RF-02 | Permitir **login/autenticação** com e-mail e senha | Ferlânio |
| RF-03 | **Restringir o acesso** ao cadastro de alertas apenas a administradores | Ferlânio / Rafael |
| RF-04 | Permitir **cadastrar, consultar, editar e excluir alertas de risco (CRUD)** | Rafael |
| RF-05 | Permitir **consultar o histórico de ocorrências por local**, com filtros (tipo, período, cidade) | Dan |
| RF-06 | Permitir **consultar temperatura e umidade por cidade**, com gráfico de histórico | Gabriel |
| RF-07 | **Apresentar notícias e alertas recentes**, com página de detalhe da matéria | Tiago |
| RF-08 | Permitir **gerenciar o perfil** do usuário (Meus Dados) — visualizar, editar e excluir | Ferlânio |
| RF-09 | Permitir **configurar preferências** — tema, notificações e região principal | Ferlânio |
| RF-10 | Aplicar **tema claro/escuro global** a toda a aplicação | Ferlânio |

### Requisitos Não Funcionais (RNF)

| ID | Requisito |
|---|---|
| RNF-01 | A interface deve ser **responsiva** (desktop e celular). |
| RNF-02 | A aplicação deve priorizar **usabilidade e linguagem simples**. |
| RNF-03 | Os dados devem ser **persistidos** por meio de uma API REST (json-server). |
| RNF-04 | A solução deve ser desenvolvida com **tecnologias web front-end** (HTML, CSS e JavaScript). |
| RNF-05 | As preferências de tema devem persistir mesmo **após recarregar a página**. |
| RNF-06 | A aplicação deve funcionar nos **principais navegadores** (Chrome, Edge, Firefox). |

## 3.4. Projeto de Interface

### Fluxo do Usuário

```
                        ┌───────────────┐
                        │   HOMEPAGE     │  Destaques + Últimas Notícias + MiniHub
                        └──────┬────────┘
        ┌──────────────┬───────┼────────────┬─────────────────┐
        ▼              ▼       ▼            ▼                 ▼
   Configurações   Histórico  Notícia   MiniHub          (Admin)
   (Sidebar)       por Local  (detalhe) Temperaturas     Cadastro de Alertas
        │
        ├─► Entrar / Cadastrar ─► Login ─► sessão
        ├─► Meus Dados (Perfil: editar / excluir)
        └─► Tema, Notificações, Região Principal
```

A **Sidebar de Configurações** é acessível de qualquer tela (link "Configurações" ou engrenagem ⚙️) e concentra login, perfil e preferências. O acesso ao **Cadastro de Alertas** é protegido: apenas administradores entram.

### Wireframes

O grupo produziu wireframes de baixa fidelidade das telas principais (home, perfil/"Meus Dados", histórico e cadastro de alertas).

> 🔴 **[GRUPO]** Insira as **imagens dos wireframes** (do deck inicial e do arquivo `wireframe.html`).

### Protótipo Interativo

> 🔴 **[GRUPO]** Inclua aqui o **link do protótipo interativo** (Figma), se houver. Caso não exista Figma, é possível usar o próprio site publicado/rodando localmente como protótipo navegável.

---

# 4. Metodologia

## 4.1. Ferramentas

| Categoria | Ferramenta | Justificativa |
|---|---|---|
| Editor de código | **Visual Studio Code** | Leve, gratuito, com extensões (Live Server) e integração com Git. |
| Execução local | **Live Server** | Serve o site localmente com recarregamento automático. |
| Backend simulado | **json-server** | Cria uma API REST completa a partir de um `db.json`, sem back-end real. |
| Versionamento | **Git + GitHub** | Controle de versão e colaboração entre os integrantes (branches e Pull Requests). |
| Interface/Responsividade | **Bootstrap 5.3** | Componentes prontos (grid, carrossel, modal) e responsividade. |
| Tipografia | **Google Fonts** (Montserrat, Poppins) | Padronização visual e legibilidade. |
| Dados climáticos | **OpenWeatherMap API** | Fornece temperatura, umidade e coordenadas reais das cidades. |
| Design / Slides | **Canva** | Criação do material visual e da apresentação. |
| Comunicação | **WhatsApp / Discord** | Alinhamento diário e combinação de tarefas. |
| Gestão de tarefas | **[GRUPO: Trello / GitHub Projects]** | Organização das tarefas no quadro Kanban. |

## 4.2. Organização da Equipe e Divisão de Papéis (Scrum)

O grupo adotou o framework **Scrum** de forma adaptada ao contexto acadêmico, dividindo o trabalho em **três Sprints** (Sprint 1, Sprint 2 e Sprint 3 — final). A cada Sprint, cada integrante ficou responsável por um **módulo/artefato** da solução, integrado ao repositório comum:

- **Gabriel Vieira** atuou também como **integrador** (montagem da homepage e junção dos módulos no GitHub);
- Reuniões de alinhamento (dailies adaptadas) foram feitas pelos canais de comunicação;
- Cada módulo foi desenvolvido em **branch própria** e integrado via **Pull Request** na branch de trabalho (`sprint3teste-dan`).

> 🔴 **[GRUPO]** Se houver papéis formais (Product Owner, Scrum Master), cite-os aqui.

## 4.3. Quadro de Controle de Tarefas (Kanban)

O acompanhamento das tarefas (a fazer, em andamento, concluídas) foi feito em um quadro Kanban.

> 🔴 **[GRUPO]** Insira **prints do quadro Kanban preenchido** (Trello ou GitHub Projects), mostrando as tarefas realizadas e as pendentes, e o **link** do quadro.

---

# 5. Solução Implementada

A solução é uma aplicação web **front-end** (HTML5, CSS3 e JavaScript puro) integrada a uma **API REST** via `json-server`. A seguir, as funcionalidades por módulo.

## 5.1. Funcionalidades

### 🔐 Cadastro, Login e Controle de Acesso *(Ferlânio)*
- **Descrição:** permite criar conta, autenticar-se e diferencia **usuário comum** de **administrador**. Apenas administradores acessam o Cadastro de Alertas de Risco (proteção de página).
- **Estrutura de dados associada:** coleção `usuarios`.
- **Acesso e uso:** na Sidebar (Configurações), clicar em **"Entrar"** → login com e-mail e senha; ou **"Cadastre-se"** para criar conta (nasce como usuário comum). Contas de teste: **admin** `admin@alertaja.com` / `admin123`; **comum** `user@alertaja.com` / `user123`.

### ⚙️ Sidebar de Configurações e Tema Claro/Escuro *(Ferlânio)*
- **Descrição:** painel lateral, presente em todas as telas, com **tema claro/escuro global**, **notificações de alerta** e **região principal**. O tema é aplicado a toda a aplicação e persiste após recarregar.
- **Estrutura de dados associada:** coleção `configuracoesUsuario`.
- **Acesso e uso:** clicar em **"Configurações"** (ou na engrenagem ⚙️) e usar os interruptores/seleção.

### 👤 Meus Dados (Perfil) *(Ferlânio)*
- **Descrição:** gerenciamento do perfil do usuário logado — **visualizar, editar e excluir** conta (operações Read/Update/Delete do CRUD).
- **Estrutura de dados associada:** coleção `usuarios`.
- **Acesso e uso:** Sidebar → **"Meus Dados"**.

### 🚨 Cadastro de Alertas de Risco *(Rafael)*
- **Descrição:** **CRUD completo** de alertas preventivos (título, tipo, cidade, bairro, nível de risco, descrição, data). Restrito a administradores.
- **Estrutura de dados associada:** coleção `alertas`.
- **Acesso e uso:** logado como administrador, acessar a página de Cadastro de Alertas; preencher o formulário e **Cadastrar**; editar/excluir na lista.

### 📍 Histórico de Informações por Locais *(Dan)*
- **Descrição:** lista o histórico de alertas por cidade/bairro, com **filtros** por tipo de risco, período (datas) e cidade, além de **estatísticas** por nível de risco.
- **Estrutura de dados associada:** coleção `alertas`.
- **Acesso e uso:** no menu, acessar **"Histórico"** e aplicar os filtros desejados.

### 🌡️ MiniHub de Consulta de Temperaturas *(Gabriel)*
- **Descrição:** consulta de **temperatura, umidade e vento** por cidade (dados reais da OpenWeatherMap) e **gráfico** do histórico de 30 dias (desenhado em `<canvas>`).
- **Estrutura de dados associada:** coleções `clima` e `cidades`.
- **Acesso e uso:** na homepage, seção **"MiniHub de Temperaturas"**; buscar a cidade e clicar nos cards para ver o gráfico.

### 📰 Notícias e Alertas Recentes *(Tiago)*
- **Descrição:** exibição das **notícias/alertas recentes** em cards (imagem, categoria, título, descrição), com **página de detalhe** da matéria.
- **Estrutura de dados associada:** coleção `alerta`.
- **Acesso e uso:** na homepage, seção **"Últimas Notícias"**; clicar em **"Ler Matéria"**.

## 5.2. Estruturas de Dados

As estruturas são servidas pelo `json-server` a partir do arquivo `src/db.json`.

**`usuarios`** — contas de acesso (essência da autenticação):
```json
{
  "id": "927202",
  "nome": "Ferlanio",
  "email": "admin@alertaja.com",
  "senha": "admin123",
  "admin": true
}
```

**`configuracoesUsuario`** — preferências do usuário (configuração):
```json
{
  "id": "1",
  "usuarioId": "927202",
  "temaEscuro": true,
  "notificacoesAtivas": true,
  "regiaoPadrao": "Minas Gerais",
  "idioma": "pt-BR"
}
```

**`alertas`** — alertas de risco cadastrados (Cadastro do Rafael e Histórico do Dan):
```json
{
  "id": "1",
  "titulo": "Chuva Forte",
  "tipo": "Chuva",
  "cidade": "Belo Horizonte",
  "bairro": "Centro",
  "descricao": "Previsão de fortes pancadas de chuva com raios e rajadas de vento.",
  "data": "2026-06-30",
  "risco": "medio",
  "status": "Monitoramento",
  "criadoEm": "2026-06-30T12:00:00.000Z",
  "fonte": "Cadastro Manual"
}
```

**`alerta`** — notícias/alertas recentes (módulo do Tiago):
```json
{
  "id": "1",
  "titulo": "Risco de chuva na área do Minas Shopping",
  "descricao": "Defesa Civil alerta para chuvas intensas na região...",
  "conteudo": "A Defesa Civil de Belo Horizonte emitiu um alerta preventivo...",
  "categoria": "Chuva",
  "imagem": "https://images.unsplash.com/...",
  "link": "detalhes.html"
}
```

**`clima`** — histórico de temperatura e umidade por cidade (MiniHub do Gabriel):
```json
{
  "cidadeId": 1,
  "Temperatura": { "1": 12, "2": 10, "3": 15, "...": "...", "30": 30 },
  "Umidade": { "1": 12, "2": 10, "3": 15, "...": "...", "30": 80 },
  "id": "E6tKTmo_KWM"
}
```

**`cidades`** — cidades monitoradas:
```json
{ "id": "1", "Nome": "Belo Horizonte" }
```

## 5.3. Módulos e APIs

**Frameworks, bibliotecas e módulos:**
- **HTML5, CSS3 e JavaScript (Vanilla)** — base da aplicação;
- **Bootstrap 5.3** — grid responsivo, carrossel, modal e componentes de UI;
- **Google Fonts** (Montserrat, Poppins) — tipografia;
- **Canvas API** — gráficos de temperatura/umidade do MiniHub;
- **Fetch API** — comunicação assíncrona com a API REST;
- **Web Storage API (localStorage)** — cache das preferências e da sessão do usuário (chaves `alertaJa_config` e `alertaJa_sessao`).

**APIs utilizadas para acesso a dados/serviços:**
- **json-server** — API REST local (porta `3000`) que expõe as coleções do `db.json` (`/usuarios`, `/configuracoesUsuario`, `/alertas`, `/alerta`, `/clima`, `/cidades`, `/noticias`, `/categorias`);
- **OpenWeatherMap API** — dados reais de clima (temperatura, umidade) e geocodificação das cidades.

### Como executar o projeto
1. Instale as dependências (uma vez): na pasta `src`, rode `npm install` (o `json-server` já vem no repositório).
2. Inicie a API: na pasta `src`, rode `npx json-server db.json` (porta 3000).
3. Abra a aplicação: com o **Live Server** (VS Code), clique com o botão direito em `src/index.html` → **"Open with Live Server"**.

---

# 6. Referências Bibliográficas

- MDN Web Docs — *HTML, CSS e JavaScript*. Disponível em: https://developer.mozilla.org
- Bootstrap — *Documentação oficial (v5.3)*. Disponível em: https://getbootstrap.com
- json-server — *Repositório oficial*. Disponível em: https://github.com/typicode/json-server
- OpenWeatherMap — *API Documentation*. Disponível em: https://openweathermap.org/api
- Google Fonts. Disponível em: https://fonts.google.com
- Defesa Civil de Minas Gerais — *Orientações de prevenção a desastres naturais*.
- GOTHELF, J.; SEIDEN, J. *Lean UX*. (Design Thinking, personas e histórias de usuário).

> 🔴 **[GRUPO]** Acrescente livros/artigos/sites específicos que vocês consultaram.

---

<sub>Documento da Entrega Final — Sprint 3 · Alerta Já · T1-G6 · PUC Minas</sub>
