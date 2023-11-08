const {Schema, model, default: mongoose} =require('mongoose')

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
    fotos:[{
        carrusel:[{
            ruta: String
        }],
        potada: String
    }],
    acerca_de: [{
        descripcion: String,
        mision: String,
        vision: String,
        valores: String
    }]
})

module.exports = model('Escuela', escuelaSchema, 'Escuelas')