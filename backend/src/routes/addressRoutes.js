const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/:cep', async (req, res) => {
  try {
    const cep = req.params.cep.replace(/\D/g, '');
    if (cep.length !== 8) {
      return res.status(400).json({ message: 'CEP inválido' });
    }

    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) {
      return res.status(404).json({ message: 'CEP não encontrado' });
    }

    const { logradouro, bairro, localidade, uf } = response.data;

    return res.json({
      cep,
      logradouro,
      bairro,
      cidade: localidade,
      uf
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao buscar CEP' });
  }
});

module.exports = router;
