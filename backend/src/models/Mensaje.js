const {Schema, model, default: mongoose} =require('mongoose')
const moment = require('moment-timezone');

const mensajeSchema = new Schema({
    chat_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    remitente_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    contenido: String,
    leido:{
        type: Boolean,
        default: false
    },
    archivos_adjuntos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArchivoAdjunto'
    }],
    createdAt: {
        type: String,
        default: moment().tz('America/Santiago').format()
    },
    updatedAt:{
        type: String,
        default: moment().tz('America/Santiago').format()
    }
})

module.exports = model('Mensaje', mensajeSchema, 'Mensajes')