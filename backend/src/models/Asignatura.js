const {Schema, model, default: mongoose} =require('mongoose')

const asignaturaSchema = new Schema ({
    nombre: String,
    codigo: String,
    escuela_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Escuela'
    },
    grado: Number,
    descripcion: String
},{
    timestamps: true
})

module.exports = model('Asignatura', asignaturaSchema, 'Asignaturas')