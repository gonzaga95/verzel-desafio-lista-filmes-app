# Lista de Filmes – Desafio Verzel Elite Dev 2025 🚀

Este repositório contém uma aplicação completa (Front-End + Back-End) para pesquisar filmes, visualizar detalhes (incluindo a nota do TMDb), favoritar e compartilhar a lista de favoritos por link público.

## 💻 Tecnologias utilizadas

| Camada                 | Tecnologia | Framework/Biblioteca     |
| :--------------------- | :--------- | :----------------------- |
| **Front-End**          | JavaScript | React                    |
| **Back-End**           | JavaScript | Node.js + Express.js     |
| **Banco de Dados**     | NoSQL      | MongoDB Atlas + Mongoose |
| **Integração Externa** | TMDB API   | Axios                    |

## 📄 Estrutura do projeto

```
lista-de-filmes-app/
├─ backend-lista-de-filmes-app/
│  ├─ .env                     # Variáveis do servidor (conexão com API externa)
│  ├─ package.json             # Scripts e dependências do back-end
│  └─ src/
│     ├─ app.js                # Bootstrap do Express e montagem das rotas
│     ├─ database/db.js        # Conexão com MongoDB via Mongoose
│     ├─ middlewares/
│     │  └─ authMiddlewere.js  # Extrai X-User-ID do header
│     ├─ routes/
│     │  ├─ movieRoutes.js     # Rotas de busca e favoritos
│     │  └─ sharedListRoutes.js# Rotas da lista compartilhada
│     ├─ controllers/
│     │  ├─ movieController.js # Lógica de busca/favoritos
│     │  └─ sharedListController.js # Lógica de compartilhamento
│     ├─ models/
│     │  ├─ favoriteMovieModel.js # Schema de filmes favoritos
│     │  └─ sharedListModel.js    # Schema da lista compartilhada
│     └─ services/tmdbService.js  # Cliente para TMDb
│
├─ frontend-lista-de-filmes-app/
│  ├─ .env                     # Variáveis do front (ex: conexão com backend)
│  ├─ package.json             # Scripts e dependências do front-end
│  ├─ vite.config.js           # Configuração Vite
│  └─ src/
│     ├─ App.jsx, main.jsx
|     ├─ layouts/              # Layout básico
│     ├─ pages/                # Páginas da aplicação
│     ├─ components/           # Componentes
│     ├─ hooks/                # Hooks
│     ├─ services/             # api.js e services REST (movies, favorites, shared-list)
│     ├─ utils/userIdStorage.js# Gera e persiste o X-User-ID no localStorage
│     └─ styles/               # Estilos
│
└─ readmehistory/              # Históricos de README anteriores
```

## 📄 Documentação das rotas (Back-End)

Base URL do back-end (desenvolvimento): `http://localhost:3001` (ou a porta definida em `PORT`).

⚠️ Observação importante: rotas que manipulam dados do usuário exigem o header `X-User-ID`. O front já gera e persiste esse identificador em `localStorage` (`utils/userIdStorage.js`).

### Filmes

- GET `/movies/search`

  - Query params: `query` (string, obrigatório)
  - Descrição: Busca filmes na API do TMDb e retorna o payload da própria API (`results`, paginação etc.).
  - Exemplo: `/movies/search?query=matrix`

- GET `/movies/favorites`

  - Headers: `X-User-ID: <uuid>`
  - Descrição: Lista os filmes favoritos do usuário (ordenados por `addDate` desc).
  - Resposta (200): array de documentos FavoriteMovie

- POST `/movies/favorites`

  - Headers: `X-User-ID: <uuid>`
  - Body JSON:
    - `tmdb_id` (number, obrigatório)
    - `title` (string, obrigatório)
    - `rating` (number, opcional; se omitido, padrão 0)
  - Descrição: Adiciona um filme aos favoritos do usuário. É único por (`userId`, `tmdb_id`).
  - Respostas:
    - 201: documento criado
    - 409: já existente

- DELETE `/movies/favorites/:tmdb_id`
  - Headers: `X-User-ID: <uuid>`
  - Params: `tmdb_id` (number)
  - Descrição: Remove um filme dos favoritos do usuário.
  - Respostas:
    - 200: `{ message: 'Filme removido...' }`
    - 404: não encontrado

### Lista Compartilhada

- POST `/shared-lists/create-link`

  - Headers: `X-User-ID: <uuid>`
  - Body JSON: `{ listName?: string }`
  - Descrição: Cria (ou retorna) o link de compartilhamento do usuário. Se já existir, pode atualizar o `listName`.
  - Resposta (200/201): `{ shareToken, isActive, listName }`

- PATCH `/shared-lists/toggle-share-status`

  - Headers: `X-User-ID: <uuid>`
  - Body JSON: `{ isActive: boolean }`
  - Descrição: Ativa/Desativa o compartilhamento público da lista.
  - Respostas: `{ message, isActive }`

- PATCH `/shared-lists/update-name`

  - Headers: `X-User-ID: <uuid>`
  - Body JSON: `{ listName: string }`
  - Descrição: Atualiza o nome da lista compartilhada.

- GET `/shared-lists/:shareToken`
  - Pública (sem `X-User-ID`).
  - Descrição: Retorna o nome da lista e os filmes favoritos do dono do token, se `isActive === true`.
  - Respostas:
    - 200: `{ listName, movies: FavoriteMovie[] }`
    - 403: lista não está pública
    - 404: token não encontrado

## 🗄️ Modelos de dados (Mongoose)

### FavoriteMovie (`src/models/favoriteMovieModel.js`)

```javascript
{
  userId: String,        // Identificador do usuário
  tmdb_id: Number,       // ID do filme no TMDB
  title: String,         // Título do filme
  rating: Number,        // Nota do filme
  addDate: Date          // Data de adição (auto)
}
```

### SharedList (`src/models/sharedListModel.js`)

```javascript
{
  userId: String,        // Dono da lista
  shareToken: String,    // UUID único para compartilhamento
  isActive: Boolean,     // Controle de visibilidade
  listName: String       // Nome da lista compartilhada
}
```

## ⬇️ Instalação e execução

Pré-requisitos:

- Node.js e npm. [Disponível aqui 📄](https://nodejs.org/pt/download)
- Uma instância MongoDB (ex.: MongoDB Atlas) e a connection string. [Docs 📄](https://www.mongodb.com/pt-br/docs/drivers/php/laravel-mongodb/current/quick-start/create-a-connection-string/)
- Um Bearer Token válido do TMDb. [Docs 📄](https://developer.themoviedb.org/docs/getting-started)

#### 1) Clone o repositório

```bash
git clone https://github.com/gonzaga95/verzel-desafio-lista-filmes-app.git
cd verzel-desafio-lista-filmes-app
```

#### 2) Back-End

1. Configure as variáveis de ambiente (crie um arquivo `backend-lista-de-filmes-app/.env`):

```
MONGODB_URI="<sua-string-de-conexao-mongodb>"
TMDB_BEARER_TOKEN="<seu-bearer-token-tmdb>"
PORT=3001
```

2. Instale e execute:

```bash
cd backend-lista-de-filmes-app
npm install
npm start
```

3. O servidor deve iniciar em `http://localhost:3001` (ou na porta definida em `PORT`).

#### 3) Front-End

1. Configure as variáveis (crie `frontend-lista-de-filmes-app/.env`):

```bash
VITE_API_BASE_URL=http://localhost:3001
# Opcional: usado para montar o link de compartilhamento exibido no front
SHARE_URL_BASE=http://localhost:5173/share/
```

2. Instale e execute:

```bash
cd frontend-lista-de-filmes-app
npm install
npm run dev
```

3. A aplicação estará disponível em `http://localhost:5173`.

O front envia automaticamente o header `X-User-ID` em requisições que o exigem, utilizando o valor persistido em `localStorage`.

Em produção, ajuste `VITE_API_BASE_URL` para a URL pública do seu back-end (ex.: um deploy no Vercel/Railway/Render/etc.).

## 🎯 Sobre o projeto

Este repositório contém a aplicação "Lista de Filmes", desenvolvida para o desafio Verzel Elite Dev 2025.

> **Contato:** Carlos E. G. Silva | [Linkedin](http://linkedin.com/in/carlosegonzaga)
