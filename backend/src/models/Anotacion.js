const {Schema, model, default: mongoose} =require('mongoose')

const anotacionSchema = new Schema ({
    alumno_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Usuario
    },
    profesor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Usuario
    },
    tipo: String,
    contenido: String
}, {
    timestamps: true
})

module.exports = model ('Anotacion', usuarioSchema, 'Anotaciones')