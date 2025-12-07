
# 🎨 **frontend/README.md**

```markdown
# 🎯 Frontend – Cadastro de Candidatos

Aplicação em **React** que consome a API de candidatos com:

✔ Login  
✔ Cadastro de currículo PDF  
✔ Filtros + Paginação  
✔ Preenchimento automático do endereço via CEP  
---

## 🚀 Tecnologias

- React
- React Router
- React Query
- Axios
- Hooks customizados
- Tema escuro moderno
---

## ▶️ Scripts
Instalar dependências:
```sh
npm install


Rodar ambiente de desenvolvimento:
npm run dev

em:
➡ http://localhost:5173/

🔐 Fluxo de Autenticação:
-------------------------
Login salva tokens no localStorage
ProtectedRoute bloqueia rotas privadas
Logout remove as credenciais
Axios usa Authorization: Bearer <token>

🧭 Rotas
Rota	Acesso	Descrição
/login	público	Login do usuário
/register	público	Cadastro
/candidates	privado	Lista de candidatos
/candidates/new	privado	Envio do currículo PDF


🧩 Estrutura de Pastas
frontend/
 ├─ src/
 │   ├─ api/           
 │   ├─ components/    
 │   ├─ context/       
 │   ├─ hooks/         
 │   ├─ pages/         
 │   ├─ App.jsx        
 │   └─ index.jsx      
 ├─ public/
 └─ package.json

🧪 Uso Esperado:
----------------
1️⃣ Login
2️⃣ Acessar “Novo Candidato”
3️⃣ Digitar CEP → endereço automático
4️⃣ Upload de PDF com currículo
5️⃣ Ver candidato na listagem com filtros e paginação

