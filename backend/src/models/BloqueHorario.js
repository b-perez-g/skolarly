const {Schema, model, default: mongoose} =require('mongoose')

const bloqueHorarioSchema = new Schema ({
    numero: Number,
    escuela_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Escuela'
    },
    hora_inicio: Date,
    hora_fin: Date
})

module.exports = model('BloqueHorario', bloqueHorarioSchema, 'BloquesHorarios')