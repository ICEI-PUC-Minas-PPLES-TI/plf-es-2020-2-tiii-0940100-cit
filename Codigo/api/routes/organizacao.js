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
        res.status(401).json({ error: 'Permissao Negada' });
    }
}

router.get('/me/organizacao', middlewareOrgao, async (req, res) => {
    res.json(req.auth);
})

// Fazer login como usuário de organização
router.post('/organizacaousuario', (req, res, next) => {  // Rota com id dinamico, para consultas com filtros, tipo buscar as contribuições de uma denuncia com o id
    let db = new Database();
    var connection = db.connect(); // Abrir conexão com o banco
    connection.query(`SELECT organizacao_usuario.id,organizacao_usuario.nome,organizacao_usuario.email,organizacao_id, o.nome AS organizacao_nome
                        FROM organizacao_usuario
                        INNER JOIN organizacao o ON o.id=organizacao_id
                        WHERE email = ?
                            AND organizacao_id = ?
                            AND senha = MD5(?)`,[req.body.email, req.body.organizacao_id, req.body.senha],  function (error, results, fields) {
        if (error){
            res.status(500).json({ error: error.message });
        } else {
            if(results.length == 0)
                res.status(404).json({ message: 'User not found!' });
            else {
                var token = jwt.sign({ id: results[0].id, nome: results[0].nome , organizacao_id: results[0].organizacao_id, organizacao_nome: results[0].organizacao_nome , iat: (Math.floor(Date.now() / 1000) - 30) }, process.env.SESSION_SECRET);
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
                    var token = jwt.sign({ id: results2.insertId, nome: req.body.usuario_nome , organizacao_id: results.insertId, organizacao_nome: req.body.nome , iat: (Math.floor(Date.now() / 1000) - 30) }, process.env.SESSION_SECRET);
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

router.get('/dashorganizacao/nome', middlewareOrgao , async (req, res) => {
    
    res.json([{
        nome: req.auth.organizacao_nome
    }]);
})

router.get('/dashorganizacao/qtdDenuncia',middlewareOrgao, async (req, res) => {
    
    const query = 
    `SELECT COUNT(DISTINCT dc.denuncia_id) as qtd_Denuncias
    FROM denuncia_has_categoria dc
    INNER JOIN organizacao_has_categoria oc ON oc.categoria_id=dc.categoria_id
    INNER JOIN denuncia d ON d.id=dc.denuncia_id
    INNER JOIN categoria c ON c.id=dc.categoria_id
    INNER JOIN organizacao o ON o.uf=d.uf AND o.cidade=d.municipio
    INNER JOIN denuncia_contribuicao dco ON dco.denuncia_id=d.id
    WHERE o.id=?;`
    
    const db = new Database();
    const connection = await db.connect();

    connection.query(query, [req.auth.organizacao_id], function (error, results, fields) {
        if (error){
            res.status(500).json({ error: error.message });
        } else {
            res.json(results);
        }
        res.end();
    });
    connection.end();
})

router.get('/dashorganizacao/denuncia',middlewareOrgao, async (req, res) => {
    
    var opcao = req.query.opcao;
    var query

    if(opcao==1)    
        query = 
        `SELECT d.*, MIN(dco.descricao) AS contribuicao, MIN(dco.criado_em) AS feita_em, COUNT(DISTINCT d.id) as qtd_Denuncias, dco.descricao, GROUP_CONCAT(f.url) as url_fotos
        FROM denuncia_has_categoria dc
        INNER JOIN organizacao_has_categoria oc ON oc.categoria_id=dc.categoria_id
        INNER JOIN denuncia d ON d.id=dc.denuncia_id
        INNER JOIN categoria c ON c.id=dc.categoria_id
        INNER JOIN organizacao o ON o.uf=d.uf AND o.cidade=d.municipio
        INNER JOIN denuncia_contribuicao dco ON dco.denuncia_id=d.id
        LEFT JOIN denuncia_contribuicao_foto f ON dco.id = f.denuncia_contribuicao_id
        WHERE o.id=? AND dco.descricao LIKE '%${req.query.texto}%'
        GROUP BY d.id
        ORDER BY d.criado_em ASC;`
    else if(opcao==2){
        query = 
        `SELECT d.*, MIN(dco.descricao) AS contribuicao, MIN(dco.criado_em) AS feita_em, COUNT(DISTINCT d.id) as qtd_Denuncias, dco.descricao, GROUP_CONCAT(f.url) as url_fotos
        FROM denuncia_has_categoria dc
        INNER JOIN organizacao_has_categoria oc ON oc.categoria_id=dc.categoria_id
        INNER JOIN denuncia d ON d.id=dc.denuncia_id
        INNER JOIN categoria c ON c.id=dc.categoria_id
        INNER JOIN organizacao o ON o.uf=d.uf AND o.cidade=d.municipio
        INNER JOIN denuncia_contribuicao dco ON dco.denuncia_id=d.id
        LEFT JOIN denuncia_contribuicao_foto f ON dco.id = f.denuncia_contribuicao_id
        WHERE o.id=? AND dco.descricao LIKE '%${req.query.texto}%'
        GROUP BY d.id
        ORDER BY d.criado_em DESC;`
    }
    else if(opcao==3){
        query = 
        `SELECT d.*, MIN(dco.descricao) AS contribuicao, MIN(dco.criado_em) AS feita_em, COUNT(DISTINCT d.id) as qtd_Denuncias, dco.descricao, GROUP_CONCAT(f.url) as url_fotos
        FROM denuncia_has_categoria dc
        INNER JOIN organizacao_has_categoria oc ON oc.categoria_id=dc.categoria_id
        INNER JOIN denuncia d ON d.id=dc.denuncia_id
        INNER JOIN categoria c ON c.id=dc.categoria_id
        INNER JOIN organizacao o ON o.uf=d.uf AND o.cidade=d.municipio
        INNER JOIN denuncia_contribuicao dco ON dco.denuncia_id=d.id
        LEFT JOIN denuncia_contribuicao_foto f ON dco.id = f.denuncia_contribuicao_id
        WHERE o.id=? AND dco.descricao LIKE '%${req.query.texto}%'
        GROUP BY d.id
        ORDER BY COUNT(dco.denuncia_id) DESC;`
    }
    else{
        query = 
        `SELECT d.*, MIN(dco.descricao) AS contribuicao, MIN(dco.criado_em) AS feita_em, COUNT(DISTINCT d.id) as qtd_Denuncias, dco.descricao, GROUP_CONCAT(f.url) as url_fotos
        FROM denuncia_has_categoria dc
        INNER JOIN organizacao_has_categoria oc ON oc.categoria_id=dc.categoria_id
        INNER JOIN denuncia d ON d.id=dc.denuncia_id
        INNER JOIN categoria c ON c.id=dc.categoria_id
        INNER JOIN organizacao o ON o.uf=d.uf AND o.cidade=d.municipio
        INNER JOIN denuncia_contribuicao dco ON dco.denuncia_id=d.id
        LEFT JOIN denuncia_contribuicao_foto f ON dco.id = f.denuncia_contribuicao_id
        WHERE o.id=? AND dco.descricao LIKE '%${req.query.texto}%'
        GROUP BY d.id
        ORDER BY d.criado_em ASC;`
    }

    const db = new Database();
    const connection = await db.connect();

    connection.query(query, [req.auth.organizacao_id], function (error, results, fields) {
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