const express = require('express')
const middleware = require('./middleware/errores.js')
const rutasWeb = require('./rutas/web.js')
const rutasWs = require('./rutas/socket.js')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/', rutasWeb)
rutasWs(app)
middleware(app)

app.listen(9000, () => {
    console.log('Iniciada app en el puerto 9000')
})
