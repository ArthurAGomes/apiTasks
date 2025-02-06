const jwt = require('jsonwebtoken');
require('dotenv').config();

function verificarToken(req, res, next){
    const token = req.header('Authorization');

    if(!token) return res.status(401).json({message: "Acesso não autorizado!"});

    try{
        const decodificar = jwt.verify(token, process.env.SALT);
        req.id = decodificar.id;
        next();
    } catch (error){
        res.status(400).json({message: "Token inválido!"});
    }
}

module.exports = verificarToken;