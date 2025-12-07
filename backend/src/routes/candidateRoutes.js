const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { processPdf } = require('../services/pdfService');
const pool = require('../config/db');

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  upload.single('cv'),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { cep, logradouro, bairro, cidade, uf } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: 'Arquivo PDF é obrigatório' });
      }

      const pdfResult = await processPdf(req.file.buffer);

      if (pdfResult.isScanned) {
        return res.status(400).json({
          message: 'PDF parece escaneado e não contém texto. Envie um PDF com texto selecionável.'
        });
      }

      if (!pdfResult.name || !pdfResult.email) {
        return res.status(400).json({
          message: 'Não foi possível extrair nome e email do PDF'
        });
      }

      const cepClean = cep ? cep.replace(/\D/g, '') : null;

      const client = await pool.connect();
      try {
        const result = await client.query(
          `INSERT INTO candidates (
            user_id, name, email, phone,
            cep, logradouro, bairro, cidade, uf,
            cv_filename, cv_mimetype, cv_size,
            cv_text, is_scanned
          ) VALUES (
            $1, $2, $3, $4,
            $5, $6, $7, $8, $9,
            $10, $11, $12,
            $13, $14
          ) RETURNING *`,
          [
            userId,
            pdfResult.name,
            pdfResult.email,
            pdfResult.phone,
            cepClean || null,
            logradouro || null,
            bairro || null,
            cidade || null,
            uf || null,
            req.file.originalname,
            req.file.mimetype,
            req.file.size,
            pdfResult.text,
            pdfResult.isScanned
          ]
        );

        return res.status(201).json(result.rows[0]);
      } finally {
        client.release();
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao cadastrar candidato' });
    }
  }
);

router.get('/', authMiddleware, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      q,
      cidade,
      uf
    } = req.query;

    const pageNumber = parseInt(page, 10);
    const pageLimit = parseInt(limit, 10);
    const offset = (pageNumber - 1) * pageLimit;

    const whereConditions = [];
    const values = [];
    let index = 1;

    if (q) {
      whereConditions.push(`(LOWER(name) LIKE LOWER($${index}) OR LOWER(email) LIKE LOWER($${index}) OR LOWER(cv_text) LIKE LOWER($${index}))`);
      values.push(`%${q}%`);
      index++;
    }

    if (cidade) {
      whereConditions.push(`LOWER(cidade) = LOWER($${index})`);
      values.push(cidade);
      index++;
    }

    if (uf) {
      whereConditions.push(`LOWER(uf) = LOWER($${index})`);
      values.push(uf);
      index++;
    }

    const whereClause = whereConditions.length > 0
      ? `WHERE ${whereConditions.join(' AND ')}`
      : '';

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM candidates ${whereClause}`,
      values
    );

    const total = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(total / pageLimit);

    const dataResult = await pool.query(
      `SELECT id, name, email, phone, cidade, uf, created_at
       FROM candidates
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT ${pageLimit}
       OFFSET ${offset}`,
      values
    );

    return res.json({
      page: pageNumber,
      limit: pageLimit,
      total,
      totalPages,
      data: dataResult.rows
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao listar candidatos' });
  }
});

module.exports = router;
