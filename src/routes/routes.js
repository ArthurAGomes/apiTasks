const express = require('express');
const router = express.Router();
const connection = require('../database/connection');
const TasksController = require('../controllers/TasksController');
const UserController = require('../controllers/UserController');
const verificarToken = require('../middleware/authMiddleware');
const TwoFaController = require('../controllers/TwoFaController');

router.get('/', (req, res) => {
  res.send('Bem vindo!');
});

//Rotas de usuários
router.post('/user/add', UserController.cadastrarUsuario)
router.post('/user/login', UserController.autenticarUsuario)
router.get('/users', verificarToken, UserController.listarUsuarios)
router.get('/user/:id', verificarToken, UserController.listarUmUsuario)
router.put('/user/update/:id', verificarToken, UserController.atualizarUsuario)
router.delete('/user/delete/:id', verificarToken, UserController.deletarUsuario)
router.put('/user/redefinirsenha/:id', UserController.redefinirSenha)

//Rotas de tarefas
router.post('/tarefa/add', TasksController.novaTarefa)
router.get('/tarefas', TasksController.listarTarefas)
router.get('/tarefa/:id', TasksController.listarTarefaUnica)
router.put('/tarefa/update/:id', verificarToken, TasksController.atualizarTarefa)
router.delete('/tarefa/delete/:id', TasksController.deletarTarefa)

// Rotas de autenticação
router.post('/2fa/gerartoken', TwoFaController.gerarToken)
router.post('/2fa/validartoken', TwoFaController.validarToken)

module.exports = router;