const { Schema, model, default: mongoose } = require('mongoose')
const moment = require('moment-timezone');

const cursoSchema = new Schema({
    grado: Number,
    letra: String,
    periodo: String,  // Cambiado a String para coincidir con el formato "2023"
    prof_jefe_id: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    asignaturas: [{
        asignatura_id: {
            type: Schema.Types.ObjectId,
            ref: 'Asignatura',
        },
        profesor_id: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
        },
        horario: [{
            dia: String,
            bloques: [
                {
                    bloque: {
                        type: Schema.Types.ObjectId,
                        ref: 'BloqueHorario'
                    }
                }
            ]
        }]

    }],
    createdAt: {
        type: String,
        default: moment().tz('America/Santiago').format(),
    },
    updatedAt: {
        type: String,
        default: moment().tz('America/Santiago').format(),
    },
});

module.exports = model('Curso', cursoSchema, 'Cursos')