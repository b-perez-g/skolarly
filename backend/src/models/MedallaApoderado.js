const {Schema, model, default: mongoose} =require('mongoose')

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
    fecha_ganada: Date
},{
    timestamps: true
})

module.exports =  model('MedallaApoderado', medallaApoderadoSchema, 'MedallasApoderados')