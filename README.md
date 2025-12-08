# 📌 Cadastro de Candidatos com Análise Automática de Currículo

Aplicação **Fullstack** para cadastro e gestão de candidatos com:

✔ Autenticação segura  
✔ Upload de currículo em PDF  
✔ Extração automática de Nome, E-mail e Telefone do currículo  
✔ Consulta automática de endereço via ViaCEP  
✔ Armazenamento completo das informações no PostgreSQL  
✔ Listagem com busca textual, filtros e paginação  

Projeto desenvolvido como solução para **Desafio Técnico – Fullstack (Node.js + React)**.

## 🏗️ Arquitetura da Aplicação:
| Camada | Tecnologia |
|--------|------------|
| Frontend | React, React Router, React Query, Axios |
| Backend | Node.js, Express.js, JWT, Bcrypt, Multer, pdf-parse |
| Banco | PostgreSQL |
| API Externa | ViaCEP (consulta de endereço) |


### 🔐 Autenticação
- Registro de usuário
- Login utilizando JWT (Access Token + Refresh Token)
- Rotas protegidas no frontend


## 📄 Upload & Análise do Currículo PDF:
Utilizando **pdf-parse** + **Regex**, são extraídas automaticamente do currículo:
- Nome
- E-mail
- Telefone

Além disso, o **conteúdo completo** do PDF é salvo para permitir:

✔ Busca de palavras-chave dentro do CV


## 📍 Integração via CEP – API ViaCEP:
Ao digitar o CEP, o sistema:

1. Consulta automaticamente a API ViaCEP
2. Preenche os campos de endereço
3. Mantém edição manual habilitada


## 🗄️ Banco de Dados – Estrutura:
Tabela `users` – Login e controle de acesso  
Tabela `candidates` – Dados completos do candidato

| Campo | Descrição |
|------|-----------|
| user_id | Relacionamento com usuário logado |
| name, email, phone | Extraídos do PDF |
| cep, logradouro, bairro, cidade, uf | Preenchidos via ViaCEP |
| cv_filename, cv_mimetype, cv_size | Metadados do currículo enviado |
| cv_text | Texto completo para pesquisa |
| is_scanned | Identificação de PDF escaneado |
| created_at | Registro da data de envio |


## 🔎 Listagem de Candidatos:
- Filtros combinados
  - Nome / E-mail / Conteúdo do CV
  - Cidade
  - UF
- Paginação real (backend)
- Pesquisa com **debounce** → Melhor performance


## ▶️ Como Rodar o Projeto:
### 1️⃣ Banco de Dados:

Criar banco:

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
