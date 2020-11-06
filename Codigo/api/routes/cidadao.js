const { Router } = require('express')
var Database = require('../utils/database');
const router = Router()

// Fazer login como cidadão
router.post('/cidadaousuario', (req, res, next) => { // Não entendi e coloquei qualquer coisa
    let db = new Database();
    var connection = db.connect(); // Abrir conexão com o banco

    connection.query(`SELECT id,nome,email
                        FROM cidadao
                        WHERE email = ?
                            AND senha = MD5(?)`,[req.body.email, req.body.senha],  // Acho que só precisa disso, o que é esses body?
                            function (error, results, fields) {
        if (error){
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ error: error.message }));
        } else {
            if(results.length == 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ message: 'User not found!' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(results[0])); // Se der errado e vier mais de 1 cidadão resposta, pega só os dados do primeiro?
            }
        }
        res.end();
    });
    connection.end();

})

// Cadastrar cidadão
router.post('/cidadao', (req, res, next) => {
    let db = new Database();
    var connection = db.connect(); // Abrir conexão com o banco

    let cidadao_cpf
    if ( (req.body.cidadao_cpf === null) || (req.body.cidadao_cpf.trim() === '') ) {
        cidadao_cpf = null;
    } else {
        cidadao_cpf = req.body.cidadao_cpf.replace(/\D/g,'');
    }

    connection.query(`INSERT INTO cidadao (nome, email, senha, cpf) VALUES (?, ?, MD5(?), ?);`,[req.body.cidadao_nome, req.body.cidadao_email, req.body.cidadao_senha, cidadao_cpf],  function (error, results) {
        if (error){
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({ error: error.message }));
            connection.end();
        } else {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.write(JSON.stringify({
                message: 'success',
                created: true
            }));
            connection.end();
        }
        res.end();
        
    })

})

module.exports = router