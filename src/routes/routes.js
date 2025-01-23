const express = require('express');
const router = express.Router();
const connection = require('../database/connection');
const TasksController = require('../controllers/TasksController');
router.get('/users', (req, res) => {
  res.send('Bem vindo Usuario!');
});

router.get('/', (req, res) => {
  res.send('Bem vindo!');
});

router.post('/novaTarefa', TasksController.novaTarefa)
router.get('/listarTarefas', TasksController.listarTarefas)
router.get('/Tarefa/:id', TasksController.listarTarefaUnica)
router.put('/atualizarTarefa/:id', TasksController.atualizarTarefa)
module.exports = router;