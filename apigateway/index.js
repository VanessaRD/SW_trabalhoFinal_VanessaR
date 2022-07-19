var http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
const helmet = require('helmet');
//const jwtControle = require('./jwtControle');

const jwt = require('jsonwebtoken');
require("dotenv").config();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dados = (request, response, next) => {
    console.log('ID do usuário: ' + request.userid)
    const lista = [{id:1, nome:"vanessa"},{id:2, nome:"jodesvaldo"},
     {id:3, nome:"Carlos"},{id:4, nome:"Claudia"}]
     response.status(200).json(lista);
}

const login = (request, response, next) => {
    if (request.body.user === 'vanessa' && request.body.password === '123456'){
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

const trabalhosServiceProxy = httpProxy('http://localhost:3001');
const petsServiceProxy = httpProxy('http://localhost:3002');

app.all('/trabalhos(/*)?', verificaJWT, trabalhosServiceProxy);
app.all('/pets(/*)?',  verificaJWT, petsServiceProxy);
app.route('/dados').get(verificaJWT, dados);
app.route('/login').post(login);

var server = http.createServer(app);
server.listen(process.env.PORT || 3000);