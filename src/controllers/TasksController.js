const database = require('../database/connection');

class TasksController {

    //Inserção de novas tarefas 
    novaTarefa(req, res){
        const {tarefa, descricao, responsavel} = req.body;
        
        database.insert({tarefa, descricao, responsavel}).table("tasks").then(data => {
            res.json({message: "Tarefa criada com sucesso!"});
        }).catch(error => {
            console.log(error);
        });
}
    //Listar Tarefas 
    listarTarefas(req, res){
        database.select("*").table("tasks").then(tasks => {
            res.json(tasks);
        }).catch(error => {
            console.log(error);
        });
    }

    //Listar Tarefa por ID
    listarTarefaUnica(req, res){
        // pode fazer const id = req.params.id; ou const {id} = req.params;
        const id = req.params.id;
        database.select("*").table("tasks").where({id: id}).then(tasks => {
            res.json(tasks);
        }).catch(error => {
            console.log(error);
        });
    }

    atualizarTarefa(req, res){
        // pode fazer const id = req.params.id; ou const {id} = req.params;
        const {id} = req.params;
        const { descricao, responsavel} = req.body;
        database.where({id: id}).update({ descricao: descricao, responsavel: responsavel}).table("tasks").then(data => {
            res.json({message: "Tarefa atualizada com sucesso!"});
        }).catch(error => {
            console.log(error);
        });
    }

    //Deletar tarefa
    deletarTarefa(req, res){
        const {id} = req.params;
        database.where({id: id}).del().table("tasks").then(data => {
            res.json({message: "Tarefa deletada com sucesso!"});
        }).catch(error => {
            console.log(error);
        });
    }
}
module.exports = new TasksController();