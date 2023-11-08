const {Schema, model, default: mongoose} =require('mongoose')

const autorizacionSchema = new Schema ({
    actividad_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actividad'
    },
    estado:{
        type: Boolean,
        default: false
    },
    alumno_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
},{
    timestamps: true
})

module.exports =  model('Autorizacion', autorizacionSchema, 'Autorizaciones')