const {Schema, model, default: mongoose} =require('mongoose')
const moment = require('moment-timezone');

const medallaApoderadoSchema = new Schema ({
    apoderado_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    medalla_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medalla'
    },
    progreso_acumulado: Number,
    ganada:{
        type: Boolean,
        default: false
    },
    fecha_ganada: Date,
    createdAt: {
        type: String,
        default: moment().tz('America/Santiago').format()
    },
    updatedAt:{
        type: String,
        default: moment().tz('America/Santiago').format()
    }
})

module.exports =  model('MedallaApoderado', medallaApoderadoSchema, 'MedallasApoderados')