const { Router } = require('express')
var Database = require('../utils/database');

const router = Router();
router.get('/todasDenuncias', async (req, res) => {

    const query = 
    `SELECT d.id, d.latitude, d.longitude, d.logradouro, c.descricao
     FROM denuncia d
     INNER JOIN denuncia_has_categoria dc on d.id = dc.denuncia_id
     INNER JOIN categoria c ON dc.categoria_id = c.id;`

    const db = new Database();
    const connection = await db.connect();

    // Retorna o error se houver, se não retorna o resultado
    connection.query( query, (error, results, fields) => error?res.json(error):res.json(results))
    connection.end();
})

module.exports = router