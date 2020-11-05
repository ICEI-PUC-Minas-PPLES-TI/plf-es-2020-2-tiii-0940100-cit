const express = require('express')

// Create express instance
const app = express()


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

// Require API routes
const cidadao = require('./routes/cidadao')
const denuncia = require('./routes/denuncia')
const organizacao = require('./routes/organizacao')
const test = require('./routes/test')
const totalDenuncias = require('./routes/totalDenuncias')

// Import API Routes
app.use(cidadao)
app.use(denuncia)
app.use(organizacao)
app.use(test)
app.use(totalDenuncias)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
