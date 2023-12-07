const {Schema, model, default: mongoose} =require('mongoose')
const moment = require('moment-timezone');

const comunicacionSchema = new Schema ({
    tipo: String,
    remitente_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    destinatarios:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
    asunto: String,
    contenido: String,
    archivos_adjuntos: [{
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