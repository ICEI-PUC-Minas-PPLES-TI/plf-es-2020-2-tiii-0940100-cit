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
        if (error)
            res.status(500).json({ error: error.message });
        else
            if(results.length == 0)
                res.status(404).json({ message: 'User not found!' });
            else
                res.json(results[0]);
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
            connection.end();
            res.status(500).json({ error: error.message });
        } else {
            connection.end();
            res.json({
                message: 'success',
                created: true
            });
        }
        res.end({
            message: 'success',
            created: true
        });
        
    })

})

module.exports = router