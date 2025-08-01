// routes/servicos.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/submit-form', async (req, res) => {
  const { nome, email, telefone, mensagem } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO servicos (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)',
      [nome, email, telefone, mensagem]
    );
    res.status(200).json({ success: true, id: result.insertId });
  } catch (err) {
    console.error('Erro ao inserir:', err);
    res.status(500).json({ error: 'Erro ao inserir no banco' });
  }
});

module.exports = router;
