const {Schema, model, default: mongoose} =require('mongoose')

const calificacionSchema = new Schema ({
    nota: Number,
    alumno_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    asignarura_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asignatura'
    }
},{
    timestamps: true
})

module.exports = model('Calificacion', calificacionSchema, 'Calificaciones')