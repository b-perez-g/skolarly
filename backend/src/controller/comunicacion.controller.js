const comunicacionCtrl = {}
const Comunicacion = require('../models/Comunicacion')

// Crear nueva comunicacion
comunicacionCtrl.createComunicacion = async (req, res) => {
  try {
    const comunicacionNueva = new Comunicacion(req.body);
    const comunicacionGuardada = await comunicacionNueva.save();
    res.status(201).json(comunicacionGuardada);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la comunicacion' });
  }
}

// Obtener todas las comunicaciones
comunicacionCtrl.getComunicaciones = async (req, res) => {
  try {
    const comunicaciones = await Comunicacion.find();
    res.status(200).json(comunicaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las comunicaciones' });
  }
}

// Obtener una comunicacion por su ID
comunicacionCtrl.getComunicacionById = async (req, res) => {
  try {
    const comunicacion = await Comunicacion.findById(req.params.id);
    if (!comunicacion) {
      return res.status(404).json({ error: 'Comunicacion no encontrada' });
    }
    res.status(200).json(comunicacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la comunicacion' });
  }
}

// Actualizar una comunicacion por su ID
comunicacionCtrl.updateComunicacion = async (req, res) => {
  try {
    const comunicacionActualizada = await Comunicacion.findByIdAndUpdate(req.params.id, req.body);
    if (!comunicacionActualizada) {
      return res.status(404).json({ error: 'Comunicacion no encontrada' });
    }
    res.status(200).json(comunicacionActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la comunicacion' });
  }
}

// Eliminar una comunicacion por su ID
comunicacionCtrl.deleteComunicacion = async (req, res) => {
  try {
    const comunicacionEliminada = await Comunicacion.findByIdAndDelete(req.params.id);
    if (!comunicacionEliminada) {
      return res.status(404).json({ error: 'Comunicacion no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la Comunicacion' });
  }
}

module.exports = comunicacionCtrl;