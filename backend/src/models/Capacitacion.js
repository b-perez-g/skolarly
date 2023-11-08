const {Schema, model, default: mongoose} =require('mongoose')

const capacitacionSchema = new Schema ({
    titulo: String,
    descripcion: String,
    contenido_textual: String,
    archivos_adjuntos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArchivoAdjunto'
    }],
    autor: String,
    remitente_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
},{
    timestamps: true
})

module.exports = model('Capacitacion', capacitacionSchema, 'Capacitaciones')