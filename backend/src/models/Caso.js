const { Schema, model, default: mongoose } = require('mongoose')
const moment = require('moment-timezone');

const casoSchema = new Schema({
    solicitante_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    tipo_consulta: String,
    descripcion: String,
    estado: String,
    usuarios_asignados: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
    archivos_adjuntos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArchivoAdjunto'
    }],
    respuestas: [{
        usuario_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'
        },
        descripcion: String,
        archivos_adjuntos: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ArchivoAdjunto'
        }],
        fecha: {
            type: String,
            default: moment().tz('America/Santiago').format()
        }
    }],
    createdAt: {
        type: String,
        default: moment().tz('America/Santiago').format()
    },
    updatedAt: {
        type: String,
        default: moment().tz('America/Santiago').format()
    }
})

module.exports = model('Caso', casoSchema, 'Casos')