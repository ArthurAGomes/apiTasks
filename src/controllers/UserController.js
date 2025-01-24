const database = require('../database/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
           
 
            const token = jwt.sign({id: usuario[0].id}, 'Titos@2025!', {
                expiresIn: '1h'
            })
 
            res.status(200).json({token})
 
            console.log(usuario)
 
        }).catch(error => {
            console.log(error)
        })
 
    }
}

module.exports = new UserController();