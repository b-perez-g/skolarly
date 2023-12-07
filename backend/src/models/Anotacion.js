const {Schema, model, default: mongoose} =require('mongoose')
const moment = require('moment-timezone');

const anotacionSchema = new Schema ({
    alumno_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    profesor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    tipo: String,
    contenido: String,
    createdAt: {
        type: String,
        default: moment().tz('America/Santiago').format()
    },
    updatedAt:{
        type: String,
        default: moment().tz('America/Santiago').format()
    }
})

module.exports = model ('Anotacion', anotacionSchema, 'Anotaciones')