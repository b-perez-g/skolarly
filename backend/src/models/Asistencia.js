const {Schema, model, default: mongoose} =require('mongoose')

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
    observaciones: String
},{
    timestamps: true
})

module.exports = model('Asistencia', asistenciaSchema, 'Asistencia')