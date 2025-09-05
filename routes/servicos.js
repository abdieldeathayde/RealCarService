
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Método GET para listar todos os registros
router.get('/submit-form', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM realcarservice');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    res.status(500).json({ erro: 'Erro ao buscar dados no banco.' });
  }
});

// Método POST para inserir novo registro
router.post('/submit-form', async (req, res) => {
  const { nome, email, telefone, servico, mensagem } = req.body;

  if (!nome || !email || !telefone || !servico || !mensagem) {
    return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO realcarservice (nome, email, telefone, servico, mensagem) VALUES (?, ?, ?, ?, ?)',
      [nome, email, telefone, servico, mensagem]
    );
    res.status(200).json({ mensagem: 'Formulário enviado com sucesso!', id: result.insertId });
  } catch (err) {
    console.error('Erro ao inserir:', err);
    res.status(500).json({ erro: 'Erro ao inserir no banco.', detalhes: err.message, stack: err.stack });
  }
});

module.exports = router;