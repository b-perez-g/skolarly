
process.env.TZ = 'America/New_York';
const { Server: SocketServer } = require('socket.io');
const http = require('http');
const morgan = require('morgan');
const express = require('express');
const cors =require('cors');
const app = express();



//Configuración
app.set('port', process.env.PORT || 4000)

//middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

const server = http.createServer(app);
const io = new SocketServer(server, {
    cors:{
        origin: 'http://localhost:3000'
    }
})

io.on('connection', (socket)=>{
    socket.on('msg', (message) =>{
        socket.broadcast.emit('msg', message)
    })
    
})

//rutas

app.get('/', (req, res)=>{
    res.send('Conectado a la API');
})


//Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/actividades', require('./routes/actividad'))
app.use('/api/anotaciones', require('./routes/anotacion'))
app.use('/api/archivos-adjuntos', require('./routes/archivoadjunto'))
app.use('/api/asignaturas', require('./routes/asignatura'))
app.use('/api/asistencia', require('./routes/asistencia'))
app.use('/api/autorizaciones', require('./routes/autorizacion'))
app.use('/api/bloques-horarios', require('./routes/bloqueHorario'))
app.use('/api/calificaciones', require('./routes/calificacion'))
app.use('/api/capacitaciones', require('./routes/capacitacion'))
app.use('/api/casos', require('./routes/caso'))
app.use('/api/chats', require('./routes/chat'))
app.use('/api/comunicaciones', require('./routes/comunicacion'))
app.use('/api/cursos', require('./routes/curso'))
app.use('/api/escuelas', require('./routes/escuela'))
app.use('/api/medallas', require('./routes/medalla'))
app.use('/api/medallas-apoderados', require('./routes/medallaapoderado'))
app.use('/api/mensajes', require('./routes/mensaje'))
app.use('/api/usuarios', require('./routes/usuario'))

module.exports = {app, server, io};
