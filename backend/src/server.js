require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const addressRoutes = require('./routes/addressRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://cadastro-candidato.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/address', addressRoutes);

app.use((err, req, res, next) => {
  if (err.message === 'Apenas arquivos PDF são permitidos') {
    return res.status(400).json({ message: err.message });
  }
  console.error("Erro Interno:", err);
  return res.status(500).json({ message: 'Erro interno do servidor' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
