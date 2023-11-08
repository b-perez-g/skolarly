const {Schema, model, default: mongoose} =require('mongoose')

const archivoAdjuntoSchema = new Schema ({
    nombre: String,
    tipo: String,
    tamano_bytes: Number,
    ruta: String
},{
    timestamps: true
})

module.exports = model('ArchivoAdjunto', archivoAdjuntoSchema, 'ArchivosAdjuntos')
