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
     WHERE latitude BETWEEN (${lat}-0.015) AND (${lat}+0.0015)
     AND longitude BETWEEN (${lng}-0.015) AND (${lng}+0.0015); `

    const db = new Database();
    const connection = await db.connect();

    await connection.query(query, (error, results, fields) => error?res.json(error):res.json(results))
    await connection.end()

})

module.exports = router