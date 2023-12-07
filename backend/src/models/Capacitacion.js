const {Schema, model, default: mongoose} =require('mongoose')
const moment = require('moment-timezone');

const capacitacionSchema = new Schema ({
    titulo: String,
    descripcion: String,
    contenido_textual: String,
    archivos_adjuntos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArchivoAdjunto'
    }],
    autor: String,
    remitente_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
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

module.exports = model('Capacitacion', capacitacionSchema, 'Capacitaciones')