# Backend – Cadastro de Candidatos

API desenvolvida com Node.js + Express + PostgreSQL  
Responsável pela autenticação, análise do currículo PDF e armazenamento dos dados no banco.

## Tecnologias

- Node.js
- Express.js
- PostgreSQL (pg)
- JWT + bcrypt (segurança)
- Multer (upload)
- pdf-parse (extração do conteúdo do PDF)
- ViaCEP API

## ⚙️ Variáveis de Ambiente

Arquivo `.env`:
---

```
- PORT=4000
- DATABASE_URL=postgres://postgres:postgres@localhost:5432/candidatos_db
- JWT_SECRET=seu_segredo
- JWT_REFRESH_SECRET=seu_segredo_refresh
- JWT_EXPIRES_IN=15m
- JWT_REFRESH_EXPIRES_IN=7d
```
---
## ▶️ Rotas da API

### 🔐 Autenticação

| Método | Rota | Descrição |
|-------|------|-----------|
| POST | /auth/register | Registrar novo usuário |
| POST | /auth/login | Login e retorno de JWT |
| POST | /auth/refresh | Gerar novo accessToken |

### Exemplo – Registrar usuário

```bash
curl -X POST http://localhost:4000/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Mauricio", "email":"mjr@test.com", "password":"123456"}'

Exemplo – Login:
----------------
curl -X POST http://localhost:4000/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"mjr@test.com", "password":"123456"}'

Resposta::
-----------
{
  "user": { "id": 1, "name": "Mauricio", "email": "mjr@test.com" },
  "accessToken": "jwt...",
  "refreshToken": "jwt..."
}

📄 Candidatos (Privado):
-------------------------
- Authorization: Bearer <accessToken>

'''
Método:	   Rota:	                                        Descrição:
POST	   /candidates	                                    Upload do CV + salvar candidato
GET	       /candidates?page=1&q=dev&cidade=SP&uf=SP	        Listagem com busca e filtros

📌 Upload do PDF (multipart/form-data)

Campos enviados:
-----------------
cv (Arquivo PDF)
cep, logradouro, bairro, cidade, uf

📍 Consulta ViaCEP:
--------------------
Método	Rota	Descrição
GET	/address/:cep	Retorna dados do endereço
🧪 SQL Base


Criar database:
---------------
CREATE DATABASE candidatos_db;


Rodar script:
--------------
psql -U postgres -d candidatos_db -f src/sql/schema.sql


🧩 Erros Comuns:
----------------
Erro	                ->         Solução
Credenciais inválidas	-> Verificar hash da senha no banco
DB inválido	            -> Revisar DATABASE_URL
PDF sem texto	        -> Enviar CV não escaneado
