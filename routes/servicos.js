const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Verifique se esse caminho está correto

// POST /api/servicos - Salvar dados do formulário
router.post('/submit-form', (req, res) => {
    const { nome, email, telefone, mensagem, servico } = req.body;
    console.log('Dados recebidos no backend:', req.body);

    if (!nome || !email || !telefone || !mensagem || !servico) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const query = 'INSERT INTO servicos (nome, email, telefone, mensagem, servico) VALUES (?, ?, ?, ?, ?)';
    const values = [nome, email, telefone, mensagem, servico];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao salvar no banco de dados:', err);
            return res.status(500).json({ erro: 'Erro ao salvar os dados.' });
        }

        res.status(200).json({ mensagem: 'Dados salvos com sucesso!' });
    });
});

// GET /api/servicos - Buscar todos os registros
router.get('/', (req, res) => {
    db.query('SELECT * FROM servicos', (error, results) => {
        if (error) {
            console.error('Erro ao buscar dados:', error);
            return res.status(500).json({ erro: 'Erro ao buscar os dados.' });
        }

        res.status(200).json(results);
    });
});

// DELETE /api/servicos/:id - Excluir registro por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM servicos WHERE id = ?', [id], (error) => {
        if (error) {
            console.error('Erro ao deletar:', error);
            return res.status(500).json({ erro: 'Erro ao deletar o registro.' });
        }

        res.status(200).json({ mensagem: 'Registro deletado com sucesso.' });
    });
});

// PUT /api/servicos/:id - Atualizar registro por ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {nome, email, telefone, mensagem, servico } = req.body;

    if (!nome || !email || !telefone || !mensagem || !servico) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios para atualização.' });
    }

    const query = `
        UPDATE servicos 
        SET nome = ?, email = ?, telefone = ?, mensagem = ?, servico = ?
        WHERE id = ?
    `;
    const values = [id, nome, email, telefone, mensagem, servico;

    db.query(query, values, (error) => {
        if (error) {
            console.error('Erro ao atualizar:', error);
            return res.status(500).json({ erro: 'Erro ao atualizar os dados.' });
        }

        res.status(200).json({ mensagem: 'Registro atualizado com sucesso.' });
    });
});

module.exports = router;
