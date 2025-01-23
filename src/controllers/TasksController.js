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
        const id = req.params.id;
        database.select("*").table("tasks").where({id: id}).then(tasks => {
            res.json(tasks);
        }).catch(error => {
            console.log(error);
        });
    }

}
module.exports = new TasksController();