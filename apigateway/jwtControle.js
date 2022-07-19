const jwt = require('jsonwebtoken');
require("dotenv").config();

const ola = (request, response, next) => {
    response.status(200).json("Seja bem vindo a segurança com JWT");
}

const dados = (request, response, next) => {
    console.log('ID do usuário: ' + request.userid)
    const lista = [{id:1, nome:"Vanessa"},{id:2, nome:"Jodesvaldo"},
     {id:3, nome:"Carlos"},{id:4, nome:"Claudia"}]
     response.status(200).json(lista);
}

const login = (request, response, next) => {
    if (request.body.user === 'vanessa' && request.body.password === '123'){
        // informações que irei enviar no token
        const id = 1;
        const email = "vanessarossi@ifsul.edu.br";
        const permissoes = [{"role": "admim"}, {"role":"user"}];
        const token = jwt.sign({id, email, permissoes}, process.env.SECRET, {
            expiresIn : 300 // expira em 5 minutos
        });
        return response.status(200).json({auth:true, token: token});
    }
    return response.status(500).json({message:"Login inválido"});
}

function verificaJWT(request, response, next){
    const token = request.headers['x-access-token'];
    if (!token){
        return response.status(401).json({auth:false, 
            message:"Nenhum token recebido"});
    }
    jwt.verify(token, process.env.SECRET, function(err, decoded){
        if (err) return response.status(500).json({auth:false, 
            message:"Erro ao autenticar o token"});
        request.userid = decoded.id;
        request.useremail = decoded.email;
        next();
    })
}

module.exports(ola, dados, login, verificaJWT)