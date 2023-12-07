const {Schema, model, default: mongoose} =require('mongoose')
const moment = require('moment-timezone');

const asistenciaSchema = new Schema ({
    alumno_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    profesor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    asiste: Boolean,
    observaciones: {
        type:String,
        default:"Alumno asiste."
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

module.exports = model('Asistencia', asistenciaSchema, 'Asistencia')