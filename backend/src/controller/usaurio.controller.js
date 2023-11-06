const usuarioCtrl = {}
const Usuario = require('../models/Usuario')

usuarioCtrl.getUsuarios = async(req, res) =>{
    const usuarios = await Usuario.find()
    res.json(usuarios)

}

usuarioCtrl.createUsuario = async(req, res) =>{
    
}

usuarioCtrl.getUsuario = async(req, res) =>{
    
}

usuarioCtrl.getUsuario = async(req, res) =>{
    
}

usuarioCtrl.getUsuario = async(req, res) =>{
    
}