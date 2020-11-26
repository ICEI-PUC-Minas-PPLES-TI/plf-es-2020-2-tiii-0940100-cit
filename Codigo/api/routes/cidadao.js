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

router.get('/dashboard/verContri', async (req, res) => {
    
    const query = 
    `SELECT d.id, d.descricao, d.criado_em as "feita_em", d.anonimo, d.denuncia_id, d.cidadao_id, d.organizacao_usuario_id, GROUP_CONCAT(f.url) as 'urls_fotos', den.status, den.cep, den.logradouro, den.uf, den.municipio, den.criado_em, den.solucionado_em
    FROM denuncia_contribuicao d
    LEFT JOIN denuncia_contribuicao_foto f ON d.denuncia_id = f.denuncia_contribuicao_id
    INNER JOIN denuncia den ON den.id = d.denuncia_id
    WHERE d.cidadao_id = ?
    GROUP BY d.id
    ORDER BY d.criado_em desc`

    
    const db = new Database();
    const connection = await db.connect();

    connection.query(query,[req.query.id],  function (error, results, fields) {
        if (error){
            res.status(500).json({ error: error.message });
        } else {
            res.json(results);
        }
        res.end();
    });
    connection.end();
})

router.get('/dashboard/qtdDenuncias', async (req, res) => {
    
    const query = 
    `SELECT COUNT(DISTINCT d.denuncia_id) as 'qtd_denuncias'
    FROM denuncia_contribuicao d
    WHERE d.cidadao_id = ?;`

    
    const db = new Database();
    const connection = await db.connect();

    connection.query(query,[req.query.id],  function (error, results, fields) {
        if (error){
            res.status(500).json({ error: error.message });
        } else {
            res.json(results);
        }
        res.end();
    });
    connection.end();
})

router.get('/dashboard/nome', async (req, res) => {
    
    const query = 
    `SELECT nome
    FROM cidadao
    WHERE id = ?;`
    
    const db = new Database();
    const connection = await db.connect();

    connection.query(query,[req.query.id],  function (error, results, fields) {
        if (error){
            res.status(500).json({ error: error.message });
        } else {
            res.json(results);
        }
        res.end();
    });
    connection.end();
})

module.exports = router