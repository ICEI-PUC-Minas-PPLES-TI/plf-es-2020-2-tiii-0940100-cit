const { Router } = require('express')
var Database = require('../utils/database');
const router = Router()

// Test route
router.get('/totalDenuncias', (req, res, next) => { // caminho da rota, ver resultado em pages/index.vue
  let db = new Database();
  var connection = db.connect(); // Abrir conexão com o banco
  connection.query('SELECT COUNT(denuncia.id) AS qtd FROM denuncia', function (error, results, fields) {
    if (error) console.log(error);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(results[0]));
    res.end();
  });
  connection.end(); // Fechar conexão com o banco (Dá ruim se ficar só abrindo)
})

router.get('/totalDenuncias/:id', (req, res, next) => {  // Rota com id dinamico, para consultas com filtros, tipo buscar as contribuições de uma denuncia com o id
  const id = parseInt(req.params.id)
  console.log('aaa')
  res.json(id)
})


module.exports = router
