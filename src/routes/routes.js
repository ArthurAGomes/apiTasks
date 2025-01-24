const express = require('express');
const router = express.Router();
const connection = require('../database/connection');
const TasksController = require('../controllers/TasksController');
const UserController = require('../controllers/UserController');
const verificarToken = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
  res.send('Bem vindo!');
});

//Rotas de usuários
router.post('/user/add', UserController.cadastrarUsuario)
router.post('/user/login', UserController.autenticarUsuario)








//Rotas de tarefas
router.post('/tarefa/add', TasksController.novaTarefa)
router.get('/tarefas', TasksController.listarTarefas)
router.get('/tarefa/:id', TasksController.listarTarefaUnica)
router.put('/tarefa/update/:id', verificarToken, TasksController.atualizarTarefa)
router.delete('/tarefa/delete/:id', TasksController.deletarTarefa)

module.exports = router;