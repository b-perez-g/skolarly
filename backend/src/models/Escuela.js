const {Schema, model, default: mongoose} =require('mongoose')
const moment = require('moment-timezone');

const escuelaSchema = new Schema ({
    nombre: String,
    rut: String,
    direccion:{
        calle: String,
        num_calle: String,
        comuna: String,
        Region: String
    },
    fono: Number,
    subvencion: String,
    ruta_logo: String,
    descripcion: String,
    carrusel:[{ruta: String}],
    potada: String,
    acerca_de: [{
        descripcion: String,
        mision: String,
        vision: String,
        valores: String
    }],
    createdAt: {
        type: String,
        default: moment().tz('America/Santiago').format()
    },
    updatedAt:{
        type: String,
        default: moment().tz('America/Santiago').format()
    }
})

module.exports = model('Escuela', escuelaSchema, 'Escuelas')