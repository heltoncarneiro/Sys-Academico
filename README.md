# Sys-Acadêmico

**Sys-Acadêmico** é uma aplicação web simples desenvolvida para gestão acadêmica, permitindo o cadastro e gerenciamento de professores, alunos e disciplinas. A solução é composta por um frontend interativo e um backend robusto, utilizando tecnologias modernas para garantir desempenho e escalabilidade.

## 🚀 Tecnologias Utilizadas

- **Frontend**: React + Vite, HTML, CSS, JavaScript
- **Backend**: Node.js + Express
- **Banco de Dados**: MongoDB (Mongoose)
- **Autenticação**: Sistema simples de login/cadastro para professores (sem JWT)

## 🗂 Estrutura do Projeto

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
.gitignore
README.md
```

## ⚙️ Pré-requisitos

- Node.js 18 ou superior
- MongoDB em execução (local ou remoto)

## 🔧 Configuração do Ambiente

### Backend

1. Navegue até a pasta `backend`:

   ```bash
   cd backend
   ```

2. Crie um arquivo `.env` com o seguinte conteúdo:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/sys-academico
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor:

   ```bash
   npm start
   ```

### Frontend

1. Navegue até a pasta `frontend`:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

O frontend estará disponível em `http://localhost:3000` e o backend em `http://localhost:5000`.

## 📌 Funcionalidades

- Cadastro e login de professores
- Gerenciamento de alunos e disciplinas
- Interface simples e intuitiva

## 📁 Contribuindo

1. Faça um fork deste repositório.
2. Crie uma branch para sua feature (`git checkout -b minha-feature`).
3. Faça commit das suas alterações (`git commit -am 'Adiciona nova funcionalidade'`).
4. Envie para o branch principal (`git push origin minha-feature`).
5. Abra um Pull Request.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

