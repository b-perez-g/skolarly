const {Schema, model, default: mongoose} = require('mongoose')
const moment = require('moment-timezone');

const medallaSchema = new Schema ({
    nombre: String,
    descripcion: String,
    ruta_imagen: String,
    requisitos: String,
    progreso_requerido: Number,
    createdAt: {
        type: String,
        default: moment().tz('America/Santiago').format()
    },
    updatedAt:{
        type: String,
        default: moment().tz('America/Santiago').format()
    }
})

module.exports = model ('Medalla', medallaSchema, 'Medallas')