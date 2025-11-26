# 📝 Desafio Técnico – Cadastro de Candidato com Análise de CV

Bem-vindo ao desafio técnico!  
Este repositório contém as instruções para desenvolver uma aplicação completa, incluindo autenticação, upload de currículo, análise de PDF, integração com API externa, filtros, paginação e manipulação de grande volume de dados.

---

# 📌 Sumário
- [Objetivo do Desafio](#-objetivo-do-desafio)
- [Funcionalidades Obrigatórias](#-funcionalidades-obrigatórias)
- [Diferenciais por Etapa](#-diferenciais-por-etapa)
- [Critérios de Avaliação](#-critérios-de-avaliação)
- [Tecnologias Permitidas](#-tecnologias-permitidas)
- [Como Participar (Fork, Clone, Branch, PR)](#-como-participar)
- [Como Rodar o Projeto](#-como-rodar-o-projeto)
- [Entrega Final](#-entrega-final)
- [Nível do Candidato](#-nível-do-candidato)

---

# 🎯 Objetivo do Desafio

Construir uma aplicação web onde o usuário possa:

- Criar conta e fazer login  
- Enviar um currículo em PDF  
- Informar um CEP  
- Ter o endereço preenchido automaticamente pela API **ViaCEP**  
- Ter **nome, e-mail e telefone extraídos automaticamente** do PDF  
- Gravar todos os dados no banco de dados, incluindo texto completo do PDF  
- Permitir listagem de candidatos com:  
  - Paginação  
  - Filtros  
  - Busca por conteúdo do currículo  

Este desafio simula um ambiente real de grande volume de dados e integrações múltiplas.

---

# 🧩 Funcionalidades Obrigatórias

## 🔐 Autenticação
- Cadastro de usuário  
- Login com autenticação segura  
- Proteção das rotas privadas  

## 📄 Upload de PDF
- Aceitar apenas PDF  
- Extrair do PDF:
  - Nome
  - E-mail
  - Telefone
- Armazenar conteúdo completo do currículo para pesquisa

## 📍 Consulta ViaCEP
- Buscar endereço a partir do CEP informado  
- Preencher logradouro, bairro, cidade e UF automaticamente  

## 🗄️ Banco de Dados
Salvar:
- Dados pessoais  
- Endereço retornado pelo ViaCEP  
- Metadados do arquivo  
- Conteúdo completo do PDF  

## 🔎 Listagem de Candidatos
- Paginação  
- Filtros combinados  
- Busca textual no CV  

# ⭐ Diferenciais por Etapa

## 🔐 Autenticação
- JWT com refresh token  
- bcrypt para senhas  


## 📄 PDF
- Regex robusto  
- Normalização de texto  
- Pipeline separado (upload → extração → sanitização → armazenamento)  
- Tratamento para PDFs escaneados  


## 🖥️ Frontend
- Hooks bem utilizados  
- React Query (cache)  
- Componentização  
- Máscara de CEP e telefone  
- Feedback visual (loading, erro, vazio)  

# 🧪 Critérios de Avaliação

### ✔ Funcionais
- A aplicação funciona de ponta a ponta?

### ✔ Técnicos
- Código bem estruturado?  
- Separação de responsabilidades?  

### ✔ Boas práticas
- Tratamento de erros  
- Clean code  
- Validações  


# 🛠️ Tecnologias Permitidas

### Backend
- Node.js 

### Frontend
- React 

### Banco de Dados
- PostgreSQL (recomendado)


---

# 🚀 Como Participar

## **1. Faça um Fork do Repositório**
No canto superior direito do GitHub, clique em **Fork**.

## **2. Clone o Seu Fork**
```bash
git clone https://github.com/ti-lutocuritiba/Teste-tecnico.git
