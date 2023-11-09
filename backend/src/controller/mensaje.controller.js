const mensajeCtrl = {}
const Mensaje = require('../models/Mensaje')

// Crear nuevo mensaje
mensajeCtrl.createMensaje = async (req, res) => {
  try {
    const mensajeNuevo = new Mensaje(req.body);
    const mensajeGuardado = await mensajeNuevo.save();
    res.status(201).json(mensajeGuardado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el mensaje' });
  }
}

// Obtener todos los mensajes
mensajeCtrl.getMensajes = async (req, res) => {
  try {
    const mensajes = await Mensaje.find();
    res.status(200).json(mensajes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
}

// Obtener un mensaje por su ID
mensajeCtrl.getMensajeById = async (req, res) => {
  try {
    const mensaje = await Mensaje.findById(req.params.id);
    if (!mensaje) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }
    res.status(200).json(mensaje);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el mensaje' });
  }
}

// Actualizar un mensaje por su ID
mensajeCtrl.updateMensaje = async (req, res) => {
  try {
    const mensajeActualizado = await Mensaje.findByIdAndUpdate(req.params.id, req.body);
    if (!mensajeActualizado) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }
    res.status(200).json(mensajeActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el mensaje' });
  }
}

// Eliminar un mensaje por su ID
mensajeCtrl.deleteMensaje = async (req, res) => {
  try {
    const mensajeEliminado = await Mensaje.findByIdAndDelete(req.params.id);
    if (!mensajeEliminado) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el Mensaje' });
  }
}

module.exports = mensajeCtrl;