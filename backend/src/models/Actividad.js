const {Schema, model, default: mongoose, mongo} = require ('mongoose')
const moment = require('moment-timezone');

const actividadSchema = new Schema({
    titulo: String,
    descripcion: String,
    programacion: {
        fecha_inicio: Date,
        fecha_fin: Date
    },
    responsable_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario'
    },
    usuarios_asignados:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
    cursos_asignados:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso'
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

module.exports = model('Actividad', actividadSchema, 'Actividades')