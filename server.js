const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota POST do formulário
app.post('/api/servicos/submit-form', (req, res) => {
  const { nome, email, telefone, servico, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios.' });
  }

  console.log('Formulário recebido:', { nome, email, telefone, servico, mensagem });

  res.status(200).json({ mensagem: 'Formulário enviado com sucesso!' });
});

// Porta dinâmica para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
