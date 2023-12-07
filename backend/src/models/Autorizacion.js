const {Schema, model, default: mongoose} =require('mongoose')
const moment = require('moment-timezone');

const autorizacionSchema = new Schema ({
    actividad_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actividad'
    },
    estado:{
        type: Boolean,
        default: false
    },
    alumno_id:{
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

module.exports =  model('Autorizacion', autorizacionSchema, 'Autorizaciones')