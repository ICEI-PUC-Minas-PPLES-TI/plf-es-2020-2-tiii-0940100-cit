const { Router } = require('express')
var Database = require('../utils/database');
const router = Router()

router.use(function (req, res, next) {
    if(!req.session.admin && req.originalUrl != '/admin/login') {
        console.log(req.session)
        console.log(req.session.admin)
        //res.status(401).json({ error: 'Permissao Negada' });
    }
    next();
  });

router.post('/admin/login', async (req, res) => { 
    let dt = new Date()
    let day = ('0' + dt.getDate()).slice(-2) 
    let hour = ('0' + dt.getHours()).slice(-2)
    if(req.body.senha == `cit${day}${hour}`) {
        req.session.admin = true
        console.log(req.session.admin)
        res.json({
            message: 'Admin logado'
        });
    } else {
        res.status(401).json({ error: 'Permissao Negada'});
    }
})



// Buscar denuncias criadas por dia nos ultimos 15 dias
router.get('/admin/indicadores/grafico/1', async (req, res) => {
    let query = 
    `SELECT DATE(criado_em) AS dt, COUNT(id) AS cnt
    FROM denuncia
    WHERE DATE(criado_em) BETWEEN DATE(NOW()) - INTERVAL 15 DAY AND DATE(NOW())
    GROUP BY DATE(criado_em)`


    const db = new Database();
    const connection = await db.connect();

    const results1 = connection.query(query,[],  function (error, results, fields) {
        if (error){
            res.status(500).json({ error: error.message });
        } else {
            res.json(results);
        }
    });
    connection.end();
})

// Buscar denuncias solucionadas por dia nos ultimos 15 dias
router.get('/admin/indicadores/grafico/2', async (req, res) => {    
    let query = 
    `SELECT DATE(solucionado_em) AS dt, COUNT(id) AS cnt
    FROM denuncia
    WHERE DATE(solucionado_em) BETWEEN DATE(NOW()) - INTERVAL 15 DAY AND DATE(NOW()) AND status= 'S'
    GROUP BY DATE(solucionado_em)`


    const db = new Database();
    const connection = await db.connect();

    const results1 = connection.query(query,[],  function (error, results, fields) {
        if (error){
            res.status(500).json({ error: error.message });
        } else {
            res.json(results);
        }
    });
    connection.end();
})

// Buscar media de tempo de denuncias solucionadas por dia nos ultimos 15 dias
router.get('/admin/indicadores/grafico/3', async (req, res) => {    
    let query = 
    `SELECT DATE(criado_em) AS dt, ROUND(AVG(TIMESTAMPDIFF(MINUTE, criado_em, solucionado_em)), 2) AS media -- nao tenho tanta certeza sobre essa
    FROM denuncia
    WHERE DATE(criado_em) BETWEEN DATE(NOW()) - INTERVAL 15 DAY AND DATE(NOW()) AND status= 'S'
    GROUP BY DATE(criado_em)`


    const db = new Database();
    const connection = await db.connect();

    const results1 = connection.query(query,[],  function (error, results, fields) {
        if (error){
            res.status(500).json({ error: error.message });
        } else {
            res.json(results);
        }
    });
    connection.end();
})


router.get('/admin/indicadores/cartoes', async (req, res) => {
    
    let query = 
    `-- MEDIA de novas denuncias
    SELECT COUNT(*) AS cnt
    FROM denuncia
    WHERE DATE(criado_em) BETWEEN DATE(NOW()) - INTERVAL 1 MONTH AND DATE(NOW())
    -- Denuncias Solucionadas
    UNION
    SELECT COUNT(*) AS cnt
    FROM denuncia
    WHERE DATE(criado_em) BETWEEN DATE(NOW()) - INTERVAL 1 MONTH AND DATE(NOW()) AND status= 'S'
    -- Media de tempo de solucao
    UNION
    SELECT ROUND(AVG(TIMESTAMPDIFF(MINUTE, criado_em, solucionado_em)), 2) AS media
    FROM denuncia
    WHERE DATE(criado_em) BETWEEN DATE(NOW()) - INTERVAL 1 MONTH AND DATE(NOW()) AND status= 'S'`


    const db = new Database();
    const connection = await db.connect();

    const results1 = connection.query(query,[],  function (error, results, fields) {
        if (error){
            res.status(500).json({ error: error.message });
        } else {
            res.json({
                count_criadas: results[0].cnt,
                count_solucionadas: results[1].cnt,
                media_solucao: results[2].cnt,
            });
        }
    });
    connection.end();
})

router.get('/admin/indicadores/tabela', async (req, res) => {    
    let query = 
    `SELECT uf,
        municipio, 
        COUNT(id) AS dia,
        CASE 
            WHEN \`status\` = 'S'
            THEN COUNT(id)
            ELSE 0
        END solucao,
        CASE 
            WHEN \`status\` = 'S'
            THEN ROUND(AVG(TIMESTAMPDIFF(MINUTE, criado_em, solucionado_em)), 2)
            ELSE 0
        END media
    FROM denuncia
    WHERE DATE(criado_em) BETWEEN DATE(NOW()) - INTERVAL 1 MONTH AND DATE(NOW())
    GROUP BY uf,municipio
    ORDER BY municipio`


    const db = new Database();
    const connection = await db.connect();

    const results1 = connection.query(query,[],  function (error, results, fields) {
        if (error){
            res.status(500).json({ error: error.message });
        } else {
            res.json(results);
        }
    });
    connection.end();
})



module.exports = router
