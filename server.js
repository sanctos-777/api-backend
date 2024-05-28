const express = require('express');
const app = express();
const port = 3000;

// Array de exemplo
let servidores = [
  { id: 1, nome: "Ana Maria Silva", cargo: "Professor", departamento: "Educação" },
  { id: 2, nome: "Carlos Eduardo Santos", cargo: "Policial", departamento: "Segurança Pública" },
  { id: 3, nome: "Mariana Oliveira", cargo: "Médico", departamento: "Saúde" },
];

// Middleware para permitir acesso a partir de qualquer origem (CORS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === 'O"PTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware para processar JSON no corpo da requisição
app.use(express.json());

// Rota para obter todos os servidores
app.get('/servidores/listar', (req, res) => {
  res.json(servidores);
});

// Rota para obter um servidor por ID
app.get('/servidores/listarServidor/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`Recebida requisição GET para ID: ${id}`);
  const servidor = servidores.find(s => s.id === id);
  if (servidor) {
    res.json(servidor);
  } else {
    res.status(404).send('Servidor não encontrado');
  }
});

// Rota para adicionar um novo servidor
app.post('/servidores/inserir', (req, res) => {
  const novoServidor = req.body;
  novoServidor.id = servidores.length ? servidores[servidores.length - 1].id + 1 : 1;
  servidores.push(novoServidor);
  res.status(201).json(novoServidor);
});

// ...

// Rota para atualizar um servidor existente
app.put('/servidores/atualizar/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`Recebida requisição PUT para ID: ${id} com dados: `, req.body);
  const index = servidores.findIndex(s => s.id === id);
  if (index !== -1) {
    servidores[index] = { ...servidores[index], ...req.body };
    res.json(servidores[index]);
  } else {
    res.status(404).send('Servidor não encontrado');
  }
});

// Rota para excluir um servidor
app.delete('/servidores/deletar/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`Recebida requisição DELETE para ID: ${id}`);
  const index = servidores.findIndex(s => s.id === id);
  if (index !== -1) {
    servidores.splice(index, 1); // Remove o servidor do array
    res.status(204).send();
  } else {
    res.status(404).send('Servidor não encontrado');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
