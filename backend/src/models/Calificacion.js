const {Schema, model, default: mongoose} =require('mongoose')
const moment = require('moment-timezone');

const calificacionSchema = new Schema ({
    nota: Number,
    alumno_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    asignarura_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asignatura'
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

module.exports = model('Calificacion', calificacionSchema, 'Calificaciones')