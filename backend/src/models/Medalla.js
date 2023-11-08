const {Schema, model, default: mongoose} = require('mongoose')

const medallaSchema = new Schema ({
    nombre: String,
    descripcion: String,
    ruta_imagen: String,
    requisitos: String,
    progreso_requerido: Number
})

module.exports = model ('Medalla', medallaSchema, 'Medallas')