# README - V1 (Salvo em 24/10/2025)

## 🎬 Lista de Filmes App

### 🎯 Proposta do Projeto

Este projeto está sendo desenvolvido como parte do **Desafio Elite Dev 2025** da Verzel. O objetivo principal é construir uma aplicação Full-Stack que permita aos usuários pesquisar filmes, visualizar seus detalhes e gerenciar uma lista de favoritos, utilizando a API pública do The Movie Database (TMDB).

### 💻 Tecnologias Utilizadas

Este projeto é uma aplicação Full-Stack que utiliza a arquitetura de **Monorepo**, dividindo a responsabilidade entre o Front-End e o Back-End.

| Camada | Tecnologia | Framework/Biblioteca Principal |
| :--- | :--- | :--- |
| **Front-End** | JavaScript | React |
| **Back-End** | JavaScript | Node.js (Express) |
| **Banco de Dados** | A definir | A definir |

---

### ⚙️ Requisitos Funcionais

A aplicação foi estruturada para cumprir os seguintes requisitos:

#### Front-End (React)

* **Interface de Pesquisa:** Tela dedicada para busca de filmes.
* **Exibição de Detalhes:** Apresentação clara do título, sinopse e, principalmente, a **nota do TMDB (rating)** de forma destacada.
* **Gerenciamento de Favoritos:** Funcionalidade para adicionar e remover filmes da lista de favoritos do usuário.

#### Back-End (Node.js/Express)

* **Gestão de API:** Responsável por intermediar todas as chamadas para a API do TMDB.
* **Armazenamento de Dados:** Persistência da lista de filmes favoritos no Banco de Dados.
* **Compartilhamento:** Implementação de lógica para gerar um *link* único que permita ao usuário compartilhar sua lista de favoritos.

---

### 🧱 Estrutura do Projeto

O projeto adota uma estrutura de Monorepo com duas pastas principais:

1.  `frontend/`: Contém todo o código da interface do usuário (React Components).
2.  `backend/`: Contém o código da API (Rotas, Services e Models em Node.js).

#### Próximos Passos (Para Implementação e Detalhamento)

* Definir e documentar as rotas da API.
* Incluir instruções de instalação e execução para as camadas Front-End e Back-End.
* Detalhar a configuração e o uso do Banco de Dados escolhido.
