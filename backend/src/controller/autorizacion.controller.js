const autorizacionCtrl = {}
const Autorizacion = require('../models/Autorizacion')

// Crear nueva autorizacion
autorizacionCtrl.createAutorizacion = async (req, res) => {
  try {
    const autorizacionNueva = new Autorizacion(req.body);
    const autorizacionGuardada = await autorizacionNueva.save();
    res.status(201).json(autorizacionGuardada);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la autorizacion' });
  }
}

// Obtener todas las autorizaciones
autorizacionCtrl.getAutorizaciones = async (req, res) => {
  try {
    const autorizaciones = await Autorizacion.find();
    res.status(200).json(autorizaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las autorizaciones' });
  }
}

// Obtener una autorizacion por su ID
autorizacionCtrl.getAutorizacionById = async (req, res) => {
  try {
    const autorizacion = await Autorizacion.findById(req.params.id);
    if (!autorizacion) {
      return res.status(404).json({ error: 'Autorizacion no encontrada' });
    }
    res.status(200).json(autorizacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la autorizacion' });
  }
}

// Actualizar una autorizacion por su ID
autorizacionCtrl.updateAutorizacion = async (req, res) => {
  try {
    const autorizacionActualizada = await Autorizacion.findByIdAndUpdate(req.params.id, req.body);
    if (!autorizacionActualizada) {
      return res.status(404).json({ error: 'Autorizacion no encontrada' });
    }
    res.status(200).json(autorizacionActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la autorizacion' });
  }
}

// Eliminar una autorizacion por su ID
autorizacionCtrl.deleteAutorizacion = async (req, res) => {
  try {
    const autorizacionEliminada = await Autorizacion.findByIdAndDelete(req.params.id);
    if (!autorizacionEliminada) {
      return res.status(404).json({ error: 'Autorizacion no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la Autorizacion' });
  }
}

module.exports = autorizacionCtrl;