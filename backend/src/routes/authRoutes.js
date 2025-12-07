const express = require('express');
const { createUser, authenticate, refreshAccessToken } = require('../services/authService');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
    }

    const user = await createUser(name, email, password);
    return res.status(201).json(user);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }
    console.error(err);
    return res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authenticate(email, password);

    if (!result) {
      return res.status(401).json({ message: 'Erro ao fazer login' });
    }

    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao autenticar' });
  }
});

router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: 'Refresh token é obrigatório' });

  const newAccessToken = refreshAccessToken(refreshToken);
  if (!newAccessToken) {
    return res.status(401).json({ message: 'Refresh token inválido' });
  }

  return res.json({ accessToken: newAccessToken });
});

module.exports = router;
