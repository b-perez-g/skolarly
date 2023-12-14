const {Schema, model, default: mongoose} =require('mongoose')
const moment = require('moment-timezone');

const asignaturaSchema = new Schema ({
    nombre: String,
    codigo: String,
    escuela_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Escuela'
    },
    grado: Number,
    descripcion: String,
    foto:String,
    createdAt: {
        type: String,
        default: moment().tz('America/Santiago').format()
    },
    updatedAt:{
        type: String,
        default: moment().tz('America/Santiago').format()
    }
})

module.exports = model('Asignatura', asignaturaSchema, 'Asignaturas')