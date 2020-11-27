const { Router } = require('express')
var Database = require('../utils/database');
const router = Router()
const path = require("path");
const fs = require("fs");

// Test route
router.get('/test', (req, res, next) => { // caminho da rota, ver resultado em pages/index.vue
  let db = new Database();
  var connection = db.connect(); // Abrir conexão com o banco
  connection.query('SELECT COUNT(denuncia.id) AS cnt FROM denuncia', function (error, results, fields) {
    if (error) console.log(error);
    res.json(results[0])
  });
  connection.end(); // Fechar conexão com o banco (Dá ruim se ficar só abrindo)
})

router.get('/test/:id', (req, res, next) => {  // Rota com id dinamico, para consultas com filtros, tipo buscar as contribuições de uma denuncia com o id
  const id = parseInt(req.params.id)
  console.log('aaa')
  res.json(id)
})

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

router.post("/upload", upload.single("file"), (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "../uploads/image.png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);

        res.status(200).contentType("text/plain").end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, (err) => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);

module.exports = router
