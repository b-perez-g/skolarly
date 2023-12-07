const usuarioCtrl = {}
const Usuario = require('../models/Usuario')

// Crear nuevo usuario
usuarioCtrl.createUsuario = async (req, res) => {
  try {
    const usuarioNuevo = new Usuario(req.body);
    const usuarioGuardado = await usuarioNuevo.save();
    res.status(201).json(usuarioGuardado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
}

// Obtener todos los usuarios
usuarioCtrl.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
}

// Obtener un usuario por su ID
usuarioCtrl.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
}

// Obtener un usuario por su rut
usuarioCtrl.getUsuarioByRut = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ rut: req.params.rut });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
}

// Obtener alumnos por rut del apoderado
usuarioCtrl.getUsuarioByRutApoderado = async (req, res) => {
  try {
    const usuarios = await Usuario.find({ rut_apoderado: req.params.rut });
    if (!usuarios) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
}

// Obtener alumnos por curso
usuarioCtrl.getUsuarioByCurso = async (req, res) => {
  try {
    const usuarios = await Usuario.find({ curso_id: req.params.id_curso });
    if (!usuarios) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
}

// Actualizar un usuario por su ID
usuarioCtrl.updateUsuario = async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body);
    if (!usuarioActualizado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
}

// Eliminar un usuario por su ID
usuarioCtrl.deleteUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
}

module.exports = usuarioCtrl;