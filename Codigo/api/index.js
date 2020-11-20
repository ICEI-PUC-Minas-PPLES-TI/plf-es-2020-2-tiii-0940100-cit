require('dotenv').config()
const express = require('express')
var session = require('express-session')

// Create express instance
const app = express()


//configuração de cors
//coloquei isso p poder testar, em produção acho q podemos tirar
const cors = require('cors');
app.use(cors());

app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 60000 }}))


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

// Require API routes
const cidadao = require('./routes/cidadao')
const denuncia = require('./routes/denuncia')
const organizacao = require('./routes/organizacao')
const test = require('./routes/test')
const totalDenuncias = require('./routes/totalDenuncias')
const admin = require('./routes/admin')

// Import API Routes
app.use(cidadao)
app.use(denuncia)
app.use(organizacao)
app.use(test)
app.use(totalDenuncias)
app.use(admin)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
