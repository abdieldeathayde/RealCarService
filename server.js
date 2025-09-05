require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const servicosRoutes = require('./routes/servicos');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Usar rotas de serviços
app.use('/servicos', servicosRoutes);

// Porta dinâmica para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});