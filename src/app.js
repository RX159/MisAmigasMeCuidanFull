const express = require('express')
const app = express()
var cors = require('cors');

require('./db/db.js')

const router = require('./routes.js')
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json()) // parsea a json
app.use(router)


app.listen(port, function() {
  console.log('Server up and running on port', port)
})