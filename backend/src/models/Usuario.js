const {Schema, model, default: mongoose} =require('mongoose')
const moment = require('moment-timezone');

const usuarioSchema = new Schema ({
    rut: {
        type: String,
        unique: true, // Esta línea hace que el rut sea único
    },
    contrasena: String,
    tipo_usuario: String,
    nombre:{
        nombres: String,
        a_paterno: String,
        a_materno: String
    },
    fecha_nac: String,
    genero: String,
    correo: String,
    fono: Number,
    celular: Number,
    estado_civil: String,
    escuela_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Escuela'
    },
    direccion:{
        calle: String,
        numero: String,
        comuna: String,
        region: String
    },
    curso_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Curso'
    },
    rut_apoderado: String,
    foto_perfil: {
        type: String,
        default: '/image/foto-perfil/default.svg'
    },
    createdAt: {
        type: String,
        default: moment().tz('America/Santiago').format()
    },
    updatedAt:{
        type: String,
        default: moment().tz('America/Santiago').format()
    }
})

module.exports = model('Usuario', usuarioSchema, 'Usuarios')