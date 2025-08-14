# Sys-Acadêmico

Aplicação web simples para gestão acadêmica (professores, alunos e disciplinas).

## Tecnologias
- Frontend: React + Vite, HTML, CSS, JavaScript
- Backend: Node.js + Express
- Banco de Dados: MongoDB (Mongoose)
- Autenticação: simples (login/cadastro de professor sem JWT)

## Estrutura de Pastas

```
/frontend
  /src
    /components
    /pages
    /services
    main.jsx
    App.jsx
/backend
  /models
  /routes
  /controllers
  /config
  server.js
README.md
```

## Pré-requisitos
- Node.js 18+
- MongoDB em execução (local ou remoto)

## Configuração do .env (backend)
Crie um arquivo `.env` dentro de `backend` com o conteúdo abaixo:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/sys-academico
```

## Instalação

### Backend
```bash
cd backend
npm install
npm start
```
O servidor iniciará em `http://localhost:5000`.

### Frontend
Abra um novo terminal:
```bash
cd frontend
npm install
npm run dev
```
A aplicação iniciará (por padrão) em algo como `http://localhost:5173`.

## Endpoints (Backend)
- Autenticação
  - POST `/auth/register`
  - POST `/auth/login`
- Alunos (CRUD)
  - GET `/alunos`
  - POST `/alunos`
  - GET `/alunos/:id`
  - PUT `/alunos/:id`
  - DELETE `/alunos/:id`
  - GET `/alunos/matricula/:matricula`
  - GET `/alunos/:id/disciplinas`
  - POST `/alunos/:id/disciplinas` (body: `{ disciplinaId }`)
  - DELETE `/alunos/:id/disciplinas/:disciplinaId`
- Disciplinas (CRUD)
  - GET `/disciplinas`
  - POST `/disciplinas`
  - PUT `/disciplinas/:id`
  - DELETE `/disciplinas/:id`

## Rotas (Frontend)
- `/auth` (login e cadastro em uma única tela)
- `/dashboard` (após login: cadastro de alunos, cadastro de disciplinas e consulta por matrícula)
- `/alunos/:id/disciplinas`
- `/alunos/matricula/:matricula`

## Objetivo
Aplicação onde professores logam, cadastram alunos (somente nome obrigatório), criam disciplinas, associam disciplinas a alunos e visualizam disciplinas de cada aluno.# Sys-Academico
