const { Router } = require('express')
var Database = require('../utils/database');
const router = Router()

router.post('/organizacaousuario', (req, res, next) => {  // Rota com id dinamico, para consultas com filtros, tipo buscar as contribuições de uma denuncia com o id
    let db = new Database();
    var connection = db.connect(); // Abrir conexão com o banco
    connection.query(`SELECT id,nome,email,organizacao_id
                        FROM organizacao_usuario
                        WHERE email = ?
                            AND organizacao_id = ?
                            AND senha = MD5(?)`,[req.body.email, req.body.organizacao_id, req.body.senha],  function (error, results, fields) {
        if (error) console.log(error.message);
        else {
            if(results.length == 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ message: 'User not found!' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(results[0]));
            }
        }
        res.end();
    });
    connection.end();
  })

module.exports = router