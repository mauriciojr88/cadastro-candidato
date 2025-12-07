require('dotenv').config({ path: __dirname + '/../.env' });

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const addressRoutes = require('./routes/addressRoutes');
const app = express();
const healthRoutes = require('./routes/healthRoutes');

app.use('/api/health', healthRoutes);

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/address', addressRoutes);

app.use((err, req, res, next) => {
  if (err.message === 'Apenas arquivos PDF são permitidos') {
    return res.status(400).json({ message: err.message });
  }
  console.error(err);
  return res.status(500).json({ message: 'Erro interno do servidor' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
