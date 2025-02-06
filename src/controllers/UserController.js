const database = require('../database/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
class UserController {

    //cadastrar usuario
    async cadastrarUsuario(req, res) {
        const { nome, email, senha, situacao } = req.body;

        const senhaSegura = await bcrypt.hashSync(senha, 10);

        database.insert({ nome, email, senha: senhaSegura, situacao }).table("users").then(data => {
            res.json({ message: "Usuário cadastrado com sucesso!" });
        }).catch(error => {
            console.log(error);
            res.status(500).json({ message: "Erro ao cadastrar usuário" });
        });
    }
   //autenticar usuario
    autenticarUsuario(req, res){
        const {email, senha} = req.body;
 
        database.select("*").where({email: email}).table("users").then(async usuario => {
 
            if(!usuario[0])
                res.status(401).json({message: "Autenticação falhou! "})
           
           
            const validarSenha = await bcrypt.compare(senha, usuario[0].senha)
            if(!validarSenha)
                res.status(401).json({message: "Autenticação falhou! "})
           
 
            const token = jwt.sign({id: usuario[0].id}, process.env.SALT, {
                expiresIn: '1h'
            })
 
            res.status(200).json({token})
 
            console.log(usuario)
 
        }).catch(error => {
            console.log(error)
        })
 
    }
    listarUsuarios(req, res) {
        database.select("*").table("users").then(usuarios => {
            res.json(usuarios);
        }).catch(error => {
            console.log(error);
        });
    }
    listarUmUsuario(req, res) {
        const {id} = req.params;
        database.select("*").table("users").where({ id: id }).then(usuario => {
            res.json(usuario);
        }).catch(error => {
            console.log(error);
        });
    }

    atualizarUsuario(req, res) {
        const { id } = req.params;
        const { nome, email, } = req.body;

        database.where({ id: id }).update({ nome, email }).table("users").then(data => {
            res.json({ message: "Usuário atualizado com sucesso!" });
        }).catch(error => {
            console.log(error);
            res.status(500).json({ message: "Erro ao atualizar usuário" });
        });
    }
    deletarUsuario(req, res) {
        const { id } = req.params;
        database.where({ id: id }).del().table("users").then(data => {
            res.json({ message: "Usuário deletado com sucesso!" });
        }).catch(error => {
            console.log(error);
            res.status(500).json({ message: "Erro ao deletar usuário" });
        });
    }
    async redefinirSenha(req, res) {
        const { id } = req.params;
        const { senha } = req.body;

        const senhaSegura = await bcrypt.hashSync(senha, 10);
         database.where({ id: id }).update({ senha: senhaSegura }).table("users").then(data => {
            res.json({ message: "Senha redefinida com sucesso!" });
        
         }).catch(error => {
            console.log(error);
            res.status(500).json({ message: "Erro ao redefinir senha" });
         });
    }
}

module.exports = new UserController();