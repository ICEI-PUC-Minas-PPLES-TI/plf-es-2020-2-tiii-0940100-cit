const { Router } = require('express')
const path = require("path");
const fs = require("fs");
var Database = require('../utils/database');

const multer = require("multer");

const handleError = (err, res) => {
  console.log(err)
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const upload = multer({
  dest: "/imgtemp"
});

const router = Router();
var jwt = require('jsonwebtoken');

const middlewareCidadao = (req,res,next) => {
    try{
        var decoded = jwt.verify(req.headers['x-cidadao'], process.env.SESSION_SECRET);
        req.auth = decoded
        next();
    } catch(e) {
        res.status(401).json({ error: 'Permissao Negada' });
    }
}

const middlewareOrgao = (req,res,next) => {
    try{
        var decoded = jwt.verify(req.headers['x-orgao'], process.env.SESSION_SECRET);
        req.auth = decoded
        next();
    } catch(e) {
        res.status(401).json({ error: 'Permissao Negada' });
    }
}

router.get('/todasDenuncias', async (req, res) => {

    const query = 
    `SELECT d.id, d.latitude, d.longitude, d.logradouro, c.descricao
     FROM denuncia d
     INNER JOIN denuncia_has_categoria dc on d.id = dc.denuncia_id
     INNER JOIN categoria c ON dc.categoria_id = c.id;`

    const db = new Database();
    const connection = await db.connect();

    // Retorna o error se houver, se não retorna o resultado
    await connection.query( query, (error, results, fields) => error?res.json(error):res.json(results))
    await connection.end();
})

router.get('/denunciasProximas/:lat/:lng', async (req, res) => {

    const lat = req.params.lat
    const lng = req.params.lng
    const query =
    `SELECT d.id, d.latitude, d.longitude, d.logradouro, c.descricao, dcf.url
     FROM denuncia d
     INNER JOIN denuncia_has_categoria dhc on d.id = dhc.denuncia_id
     INNER JOIN categoria c ON dhc.categoria_id = c.id
     INNER JOIN denuncia_contribuicao dc ON d.id = dc.denuncia_id
     LEFT  JOIN denuncia_contribuicao_foto dcf ON dc.id = dcf.denuncia_contribuicao_id
     WHERE (d.latitude BETWEEN (${lat}-0.00225) AND (${lat}+0.00225))
     AND (d.longitude BETWEEN (${lng}-0.00225) AND (${lng}+0.00225))
     GROUP BY d.id; `

    const db = new Database();
    const connection = await db.connect();

    await connection.query(query, (error, results, fields) => error?res.json(error):res.json(results))
    await connection.end()
})

router.get('/denuncia/ranking', async (req, res) => {
    let dtBegin, dtEnd, filtroEstado;
    dtBegin = (req.query.dt_inicio)? req.query.dt_inicio: 'NOW() - INTERVAL 7 DAY'
    dtEnd = (req.query.dt_fim)? req.query.dt_fim: 'NOW()'
    filtroEstado = (req.query.uf)? `AND uf = '${req.query.uf}'`: ''

    
    const query = 
    `SELECT municipio, COUNT(*) AS cnt
        FROM denuncia
        WHERE \`status\` = 'S' AND criado_em BETWEEN ${dtBegin} AND ${dtEnd} ${filtroEstado}
        GROUP BY uf,municipio
        ORDER BY COUNT(*) DESC;`
    const db = new Database();
    const connection = await db.connect();

    connection.query(query,[],  function (error, results, fields) {
        if (error){
            res.status(500).json({ error: error.message });
        } else {
            res.json(results);
        }
        res.end();
    });
    connection.end();
})

router.post('/denunciar', middlewareCidadao, upload.single("file"), (req, res, next) => {
    let db = new Database();
    var connection = db.connect(); // Abrir conexão com o banco
    connection.query(`INSERT INTO denuncia (status, cep, logradouro, referencia, uf, municipio, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,['A',req.body.denuncia_cep, req.body.denuncia_logradouro, req.body.referencia, req.body.denuncia_uf, req.body.denuncia_municipio, req.body.denuncia_latitude, req.body.denuncia_longitude],  function (error, results) {
        if (error){
            connection.end();
            res.status(500).json({ error: error.message });
        } else {
            connection.query('INSERT INTO denuncia_has_categoria (denuncia_id, categoria_id) VALUES (?, ?);', [ results.insertId, req.body.denuncia_categoria]);
            connection.query('INSERT INTO denuncia_contribuicao (descricao, anonimo, denuncia_id, cidadao_id) VALUES (?, ?, ?, ?)', [req.body.contribuicao_descricao, req.body.contribuicao_anonimo, results.insertId, req.auth.id],  function (errCont, resCont){
                // Upar imagem
                const tempPath = req.file.path;
                let fileName = "image_" + resCont.insertId + path.extname(req.file.originalname).toLowerCase()
                const targetPath = path.join(__dirname, "../uploads/" + fileName);

                if (['.png','.jpg','.jpeg'].includes(path.extname(req.file.originalname).toLowerCase())) {
                    fs.rename(tempPath, targetPath, (err) => {
                        connection.query('INSERT INTO denuncia_contribuicao_foto (denuncia_contribuicao_id, url) VALUES (?, ?);', [ resCont.insertId, `http://${process.env.HOST}:${process.env.PORT}/image/${fileName}`]);
                        connection.end();
                        if (err) return handleError(err, res);
                        res.status(200).contentType("text/plain").end("File uploaded!");
                    });
                } else {
                    connection.end();
                    fs.unlink(tempPath, (err) => {
                        if (err) return handleError(err, res);
                        res
                        .status(403)
                        .contentType("text/plain")
                        .end("Only image files are allowed!");
                    });
                }
            })
            

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

router.get('/denunciaContri/ver', async (req, res) => {
    
    const query = 
    `SELECT dc.id, dc.descricao, dc.criado_em, dc.anonimo, dc.cidadao_id, dc.organizacao_usuario_id,  GROUP_CONCAT(url) as url, c.nome
    FROM denuncia_contribuicao dc
    LEFT JOIN denuncia_contribuicao_foto dcf ON dc.id = dcf.denuncia_contribuicao_id
    INNER JOIN cidadao c ON c.id=dc.cidadao_id
    WHERE dc.denuncia_id = ?
    GROUP BY dc.id;`

    
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

router.get('/denuncia/ver', async (req, res) => {
    
    const query = 
    `SELECT d.id, d.status, d.cep, d.logradouro, d.referencia, d.uf, d.municipio, d.latitude, d.longitude, d.criado_em, d.solucionado_em, c.descricao
    FROM denuncia d
    INNER JOIN denuncia_has_categoria dhc ON dhc.denuncia_id = d.id
    INNER JOIN categoria c ON c.id = dhc.categoria_id
    WHERE d.id = ?`

    
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

router.post('/organizacao/contribuir', middlewareOrgao, async (req, res) => {
    
    let db = new Database();
    var connection = db.connect(); // Abrir conexão com o banco

    connection.query(`
        INSERT INTO denuncia_contribuicao
        (descricao, anonimo, denuncia_id, organizacao_usuario_id)
        VALUES (?, ?, ?, ?);
    `,[req.body.descricao, 0, req.body.idDaDenuncia, req.auth.id],  function (error, results) {
        if (error){
            connection.end();
            res.status(500).json({ error: error.message });
        } else {
            let field = '';
            if(req.body.status == 'S') field = ', solucionado_em = NOW() '
            connection.query(`UPDATE denuncia d SET d.status=? ${field} WHERE d.id=?`, [ req.body.status, req.body.idDaDenuncia]);
            connection.query('INSERT INTO denuncia_contribuicao_foto VALUES (?, ?);', [ req.body.linkFoto, req.body.idDaDenuncia]);
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

router.post('/contribuir', middlewareCidadao, upload.single("file"), async (req, res) => {
    
    const db = new Database();
    const connection = await db.connect();

    connection.query(`INSERT INTO denuncia_contribuicao (descricao, anonimo, denuncia_id, cidadao_id) VALUES (?, ?, ?, ?);`,[req.body.descricao, req.body.anonimo, req.body.idDaDenuncia, req.auth.id], function (error, results, fields) {
        if (error){
            res.status(500).json({ error: error.message });
        } else {
            // Upar imagem
            if(req.file) {
                const tempPath = req.file.path;
                let fileName = "image_" + results.insertId + path.extname(req.file.originalname).toLowerCase()
                const targetPath = path.join(__dirname, "../uploads/" + fileName);
                if (['.png','.jpg','.jpeg'].includes(path.extname(req.file.originalname).toLowerCase())) {
                    fs.rename(tempPath, targetPath, (err) => {
                        connection.query('INSERT INTO denuncia_contribuicao_foto (denuncia_contribuicao_id, url) VALUES (?, ?);', [ results.insertId, `http://${process.env.HOST}:${process.env.PORT}/image/${fileName}`]);
                        connection.end();
                        if (err) return handleError(err, res);
                    });
                } else {
                    connection.end();
                    fs.unlink(tempPath, (err) => {
                        if (err) return handleError(err, res);
                        res
                        .status(403)
                        .contentType("text/plain")
                        .end("Only image files are allowed!");
                    });
                }
            }
            res.json(results);
        }
        res.end();
    });
})

router.get('/denuncia/categorias', async (req, res) => {
    const query = 
    `SELECT c.id, c.descricao
    FROM categoria c;`
    const db = new Database();
    const connection = await db.connect();

    connection.query(query,[],  function (error, results, fields) {
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