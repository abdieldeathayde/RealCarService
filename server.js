// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Middleware para capturar JSON inválido
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'JSON inválido no corpo da requisição.' });
  }
  next();
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
const servicoRoutes = require('./routes/servicos');
app.use('/api/servicos', servicoRoutes);

// Rota fallback para SPA (Single Page Application)
app.get('/api/servicos/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Serviço com ID: ${id}`);
});

// Inicialização do servidor
app.listen(port, '127.0.0.1', () => {
  console.log(`Servidor rodando em http://127.0.0.1:${port}`);
});
