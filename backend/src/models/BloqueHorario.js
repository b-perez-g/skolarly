const {Schema, model, default: mongoose} =require('mongoose')
const moment = require('moment-timezone');

const bloqueHorarioSchema = new Schema ({
    numero: Number,
    escuela_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Escuela'
    },
    hora_inicio: String,
    hora_fin: String,
    createdAt: {
        type: String,
        default: moment().tz('America/Santiago').format()
    },
    updatedAt:{
        type: String,
        default: moment().tz('America/Santiago').format()
    }
});


module.exports = model('BloqueHorario', bloqueHorarioSchema, 'BloquesHorarios')