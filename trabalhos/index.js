const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const getTrabalhos = (request, response) => {
    pool.query('SELECT * FROM trabalhos', (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

const addTrabalho = (request, response) => {
    const { nome, preco, descricao, porte } = request.body

    pool.query(
        'INSERT INTO trabalhos (nome, preco, descricao, porte ) VALUES ($1, $2, $3, $4)',
        [nome, preco, descricao, porte],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Trabalho criado.' })
        },
    )
}

const updateTrabalho = (request, response) => {
    const { codigo, nome, preco, descricao, porte } = request.body
    pool.query('UPDATE trabalhos set nome=$1, preco=$2, descricao=$3, porte=$4 where codigo=$5',
        [nome, preco, descricao, porte, codigo], error => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Trabalho atualizado.' })
        })
}

const deleteTrabalho = (request, response) => {    
    const codigo = parseInt(request.params.id);
    pool.query('DELETE FROM trabalhos where codigo = $1', [codigo], error => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro: ' + error });
        }
        response.status(201).json({ status: 'success', message: 'Trabalho apagado.' })
    })
}

const getTrabalhoPorID = (request, response) => {
    const codigo = parseInt(request.params.id);
    pool.query('SELECT * FROM trabalhos where codigo = $1', [codigo], (error, results) => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro: ' + error });
        }
        response.status(200).json(results.rows)
    })
}

app
    .route('/trabalhos')
    // GET endpoint
    .get(getTrabalhos)
    // POST endpoint
    .post(addTrabalho)
    // PUT
    .put(updateTrabalho)  

app.route('/trabalhos/:id')
    .get(getTrabalhoPorID) 
    .delete(deleteTrabalho) 


// Start server
app.listen(process.env.PORT || 3001, () => {
    console.log(`Servidor rodando na porta 3001`)
})