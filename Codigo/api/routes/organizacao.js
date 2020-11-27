const { Router } = require('express')
var Database = require('../utils/database');
const router = Router()
var jwt = require('jsonwebtoken');

const middlewareOrgao = (req,res,next) => {
    try{
        var decoded = jwt.verify(req.headers['x-orgao'], process.env.SESSION_SECRET);
        req.auth = decoded
        next();
    } catch(e) {
        console.log(e)
        res.status(401).json({ error: 'Permissao Negada' });
    }
}

// Fazer login como usuário de organização
router.post('/organizacaousuario', (req, res, next) => {  // Rota com id dinamico, para consultas com filtros, tipo buscar as contribuições de uma denuncia com o id
    let db = new Database();
    var connection = db.connect(); // Abrir conexão com o banco
    connection.query(`SELECT id,nome,email,organizacao_id
                        FROM organizacao_usuario
                        WHERE email = ?
                            AND organizacao_id = ?
                            AND senha = MD5(?)`,[req.body.email, req.body.organizacao_id, req.body.senha],  function (error, results, fields) {
        if (error){
            res.status(500).json({ error: error.message });
        } else {
            if(results.length == 0)
                res.status(404).json({ message: 'User not found!' });
            else {
                var token = jwt.sign({ id: results[0].id, nome: results[0].nome , organizacao_id: results[0].organizacao_id , iat: (Math.floor(Date.now() / 1000) - 30) }, process.env.SESSION_SECRET);
                res.json({
                    message: 'Usuário logado',
                    token: token
                });   
            }
        }
    });
    connection.end();
})

router.post('/organizacao', (req, res, next) => {
    let db = new Database();
    var connection = db.connect(); // Abrir conexão com o banco
    connection.query(`INSERT INTO organizacao (nome, descricao, cnpj, uf, cidade)
                        VALUES (?, ?, ?,?,?);`,[req.body.nome, req.body.descricao, req.body.cnpj.replace(/\D/g,''), req.body.uf, req.body.cidade],  function (error, results) {
        if (error){
            res.status(500).json({ error: error.message });
        } else {
            // Inserir usuário da organização
            connection.query(`INSERT INTO organizacao_usuario (nome, email, senha, organizacao_id) VALUES (?, ?, MD5(?), ?);`,[req.body.usuario_nome, req.body.usuario_email, req.body.usuario_senha, results.insertId],  function (error2, results2) {
                if (error2){
                    connection.query(`DELETE FROM organizacao WHERE id = ${results.insertId}`);
                    connection.end();
                    res.status(500).json({ error: error2.message });
                } else {
                    connection.end();
                    var token = jwt.sign({ id: results2.insertId, nome: req.body.usuario_nome , organizacao_id: results.insertId , iat: (Math.floor(Date.now() / 1000) - 30) }, process.env.SESSION_SECRET);
                    res.json({
                        message: 'success',
                        created: true,
                        token: token
                    });
                }
            })
        }
    });
})

router.post('/criarUsuario', middlewareOrgao, (req, res, next) => {
    let query = `INSERT INTO organizacao_usuario (nome, email, senha, organizacao_id) VALUES (?, ?, MD5(?), ?);`

    let db = new Database();
    var connection = db.connect(); // Abrir conexão com o banco
    // Inserir usuário da organização
    connection.query(query,[req.body.usuario_nome, req.body.usuario_email, req.body.usuario_senha, req.auth.organizacao_id],  function (error, results) {
        if (error){
            res.status(500).json({ error });
            connection.end();
        } else {
            connection.end();
            res.json({
                message: 'success',
                created: true
            });
        }
    })
})


module.exports = router