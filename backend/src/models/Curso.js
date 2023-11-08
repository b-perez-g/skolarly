const {Schema, model, default: mongoose} =require('mongoose')

const cursoSchema = new Schema ({
    grado: Number,
    letra: String,
    periodo: Number,
    prof_jefe_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    asignaturas:[{
        asignatura:{
            asignatura_id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Asignatura'
            },
            horario:{
                dia: String,
                bloques:[{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'BloqueHorario'
                }]
            }
        }
    }]
},{
    timestamps: true
})

module.exports = model('Curso', cursoSchema, 'Cursos')