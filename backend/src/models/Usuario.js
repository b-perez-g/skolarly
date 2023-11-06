const {Schema, model, default: mongoose} =require('mongoose')

const usuarioSchema = new Schema = ({
    rut: {type: String, required: true},
    contrasena: {type: String, required: true},
    tipo_usuario: {type: String, required: true},
    nombre : {
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
    escuela_id: {type: mongoose.Schema.Types.ObjectId, ref:'Escuelas'},
    direccion: {
        calle: String,
        numero: String,
        comuna: String,
        region: String
    },
    curso_id: {type: mongoose.Schema.Types.ObjectId, ref:'Cursos'},
},{
    timestamps: true
})

module.exports = model('Usuario', usuarioSchema)

