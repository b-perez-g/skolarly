const {Schema, model, default: mongoose} =require('mongoose')

const usuarioSchema = new Schema ({
    rut: String,
    contrasena: String,
    tipo_usuario: String,
    nombre:{
        nombres: String,
        a_paterno: String,
        a_materno: String
    },
    fecha_nac: Date,
    genero: String,
    correo: String,
    fono: Number,
    celular: Number,
    estado_civil: Number,
    escuela_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Escuela'
    },
    direccion:{
        calle: String,
        numero: String,
        comuna: String,
        region: String
    },
    curso_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Curso'
    }
}, {
    timestamps: true
})

module.exports = model('Usuario', usuarioSchema, 'Usuarios')