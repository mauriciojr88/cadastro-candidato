# 📌 Cadastro de Candidatos com Análise Automática de Currículo

Aplicação Fullstack completa para cadastro e gestão de candidatos com **análise automática de currículo PDF**.

### ✔ Funcionalidades Principais
- Autenticação segura com JWT
- Upload e processamento de PDF
- Extração automática de Nome, E-mail e Telefone
- Consulta automática de endereço via ViaCEP
- Armazenamento completo no PostgreSQL
- Busca textual inteligente dentro do CV
- Filtros + Paginação no backend
- Interface responsiva e protegida

Desenvolvido como solução para **Desafio Técnico – Fullstack (Node.js + React)**.


### 🚀 Deploy em Produção
- **Frontend (Vercel):** [https://cadastro-candidato.vercel.app]
- **Backend (Render):** [https://cadastro-candidato-api.onrender.com]
- **Health Check:** [https://cadastro-candidato-api.onrender.com/api/health]

### 🏗️ Arquitetura da Aplicação

| Camada              | Tecnologias                                         |
|---------------------|-----------------------------------------------------|
| Frontend            | React, React Router, React Query, Axios             |
| Backend             | Node.js, Express.js, JWT, bcrypt, multer, pdf-parse |
| Banco de Dados      | PostgreSQL (NeonDB)                                 |
| Integração Externa  | ViaCEP API                                          |


### 🔐 Autenticação
- Registro de usuário
- Login com JWT + Refresh Token
- Proteção de rotas no frontend
- Persistência automática da sessão no navegador


### 📄 Upload & Processamento do Currículo PDF

Após o upload do PDF:
1. O servidor valida o tipo do arquivo
2. O conteúdo é extraído usando `pdf-parse`
3. Regex detecta automaticamente:
   - Nome
   - Email
   - Telefone
4. O conteúdo completo do CV é salvo para busca posterior

> 📌 PDFs escaneados são detectados através do campo `is_scanned`.


### 🏡 Consulta de Endereço por CEP
- API ViaCEP chamada ao perder foco do campo (`onBlur`)
- Preenchimento automático de:
  - Logradouro
  - Bairro
  - Cidade
  - UF
- Usuário pode ajustar manualmente se necessário

### 🗄️ Modelo do Banco de Dados

#### Tabela `users`
- Autenticação e controle de acesso

#### Tabela `candidates`

| Campo                                         | Descrição                               |
|-----------------------------------------------|-----------------------------------------|
| `user_id`                                     | Usuário que cadastrou                   |
| `name`, `email`, `phone`                      | Extraídos do CV                         |
| `cep`, `logradouro`, `bairro`, `cidade`, `uf` | Obtidos via ViaCEP                      |
| `cv_filename`, `cv_mimetype`, `cv_size`       | Metadados do PDF                        |
| `cv_text`                                     | Conteúdo completo do currículo          |
| `is_scanned`                                  | Se o arquivo não possui texto (imagem)  |
| `created_at`                                  | Data de cadastro                        |


### 🔎 Listagem de Candidatos
Backend com paginação e filtros eficientes:
- Busca por texto no currículo (`LIKE cv_text`)
- Filtro por cidade e UF
- Debounce na barra de pesquisa → evita requisições excessivas
- Tabela com ordenação cronológica


#### 1️⃣ Banco de Dados
```sql
CREATE DATABASE candidatos_db;

cd backend
psql -U postgres -d candidatos_db -f src/sql/schema.sql

# BACKEND:
-----------
cd backend
cp .env.example .env
npm install
npm run dev


# FRONTEND: 
------------
cd backend
cp .env.example .env
npm install
npm run dev


🧪 Fluxo de Teste:
-------------------
- Criar conta na tela de Registro
- Fazer login
- Acessar "Novo Candidato"
- Preencher um CEP válido
- Selecionar um PDF real de currículo
- Enviar
- Acessar a lista com filtros, paginação e busca textual
