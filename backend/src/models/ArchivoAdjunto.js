const {Schema, model, default: mongoose} =require('mongoose')
const moment = require('moment-timezone');

const archivoAdjuntoSchema = new Schema ({
    nombre: String,
    tipo: String,
    tamano_bytes: Number,
    ruta: String,
    createdAt: {
        type: String,
        default: moment().tz('America/Santiago').format()
    },
    updatedAt:{
        type: String,
        default: moment().tz('America/Santiago').format()
    }
})

module.exports = model('ArchivoAdjunto', archivoAdjuntoSchema, 'ArchivosAdjuntos')
