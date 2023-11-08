const express = require('express')
const cors =require('cors')
const app = express();

//Configuración
app.set('port', process.env.PORT || 4000)

//middlewares
app.use(cors())
app.use(express.json())

//rutas

app.get('/', (req, res)=>{
    res.send('Conectado a la API');
})

//Rutas
app.use('/api/usuarios', require('./routes/usuario'))

module.exports = app;
