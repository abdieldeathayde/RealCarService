const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Validação de campos obrigatórios
function validarCampos(body, campos) {
  return campos.every(campo => body[campo] && body[campo].trim() !== '');
}

router.post('/submit-form', async (req, res) => {
  const { nome, email, telefone, servico, mensagem } = req.body;
  const camposObrigatorios = ['nome', 'email', 'telefone', 'servico', 'mensagem'];

  if (!validarCampos(req.body, camposObrigatorios)) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios!' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO realcarservice (nome, email, telefone, servico, mensagem) VALUES (?, ?, ?, ?, ?)',
      [nome, email, telefone, servico, mensagem]
    );
    res.status(200).json({ success: true, id: result.insertId, mensagem: 'Dados enviados com sucesso!' });
  } catch (err) {
    console.error('Erro ao inserir:', err);
    res.status(500).json({ error: 'Erro ao inserir no banco' });
  }
});

module.exports = router;