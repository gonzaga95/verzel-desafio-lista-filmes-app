# README - V2 (Salvo em 29/10/2025)

# 🎬 Lista de Filmes App

> **⚠️ Projeto em Desenvolvimento**

## 🎯 Proposta do Projeto

Este projeto está sendo desenvolvido como parte do **Desafio Elite Dev 2025** da Verzel. O objetivo é construir uma aplicação Full-Stack que permita aos usuários pesquisar filmes, visualizar seus detalhes e gerenciar uma lista de favoritos, utilizando a API pública do **The Movie Database (TMDB)**.

## 💻 Tecnologias Utilizadas

| Camada                 | Tecnologia        | Framework/Biblioteca         |
| :--------------------- | :---------------- | :--------------------------- |
| **Front-End**          | JavaScript        | React _(a ser implementado)_ |
| **Back-End**           | JavaScript        | Node.js + Express.js         |
| **Banco de Dados**     | NoSQL             | MongoDB Atlas + Mongoose     |
| **Autenticação**       | Custom Middleware | Header-based (X-User-ID)     |
| **Integração Externa** | TMDB API          | Axios                        |

---

## ✅ Status de Implementação

### Back-End (Completo)

- ✅ Integração com TMDB API (busca de filmes)
- ✅ CRUD completo de filmes favoritos
- ✅ Sistema de autenticação por header (X-User-ID)
- ✅ Compartilhamento de listas via link único (UUID)
- ✅ Ativação/desativação de listas compartilhadas
- ✅ Banco de dados MongoDB Atlas configurado
- ✅ Middleware de autenticação implementado

### Front-End

- ⏳ A ser desenvolvido

---

## 🎯 Requisitos Funcionais (Back-End)

### ✅ Gestão de Filmes

- Busca de filmes na API do TMDB
- Armazenamento de filmes favoritos por usuário
- Gerenciamento completo (adicionar, listar, remover)

### ✅ Sistema de Compartilhamento

- Geração de link único (UUID) para compartilhar lista de favoritos
- Controle de visibilidade (ativar/desativar compartilhamento)
- Acesso público somente leitura via token
- Nome personalizável para listas compartilhadas

### ✅ Autenticação

- Middleware de identificação de usuário via header `X-User-ID`
- Isolamento de dados por usuário

---

## 🗄️ Modelos de Dados (MongoDB)

### FavoriteMovie

```javascript
{
  userId: String,        // Identificador do usuário
  tmdb_id: Number,       // ID do filme no TMDB
  title: String,         // Título do filme
  rating: Number,        // Nota do filme
  addDate: Date          // Data de adição (auto)
}
```

**Índice único:** `{ userId, tmdb_id }` - Previne duplicatas por usuário

### SharedList

```javascript
{
  userId: String,        // Dono da lista
  shareToken: String,    // UUID único para compartilhamento
  isActive: Boolean,     // Controle de visibilidade
  listName: String       // Nome da lista compartilhada
}
```

---

## 🚀 Próximos Passos (Para Implementação e Detalhamento)

- Documentar as rotas da API e estrutura do projeto.
- Implementar Front-End em React.
- Incluir instruções de instalação e execução para as camadas Front-End e Back-End.
- Implementar testes funcionais.
