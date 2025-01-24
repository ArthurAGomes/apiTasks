const jwt = require('jsonwebtoken');

function verificarToken(req, res, next){
    const token = req.header('Authorization');

    if(!token) return res.status(401).json({message: "Acesso negado!"});

    try{
        const decodificar = jwt.verify(token, 'Titos@2025!');
        req.id = decodificar.id;
        next();
    } catch (error){
        res.status(400).json({message: "Token inválido!"});
    }
}

module.exports = verificarToken;