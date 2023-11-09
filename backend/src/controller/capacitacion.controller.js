const capacitacionCtrl = {}
const Capacitacion = require('../models/Capacitacion')

// Crear nueva capacitacion
capacitacionCtrl.createCapacitacion = async (req, res) => {
  try {
    const capacitacionNueva = new Capacitacion(req.body);
    const capacitacionGuardada = await capacitacionNueva.save();
    res.status(201).json(capacitacionGuardada);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la capacitacion' });
  }
}

// Obtener todas las capacitaciones
capacitacionCtrl.getCapacitaciones = async (req, res) => {
  try {
    const capacitaciones = await Capacitacion.find();
    res.status(200).json(capacitaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las capacitaciones' });
  }
}

// Obtener una capacitacion por su ID
capacitacionCtrl.getCapacitacionById = async (req, res) => {
  try {
    const capacitacion = await Capacitacion.findById(req.params.id);
    if (!capacitacion) {
      return res.status(404).json({ error: 'Capacitacion no encontrada' });
    }
    res.status(200).json(capacitacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la capacitacion' });
  }
}

// Actualizar una capacitacion por su ID
capacitacionCtrl.updateCapacitacion = async (req, res) => {
  try {
    const capacitacionActualizada = await Capacitacion.findByIdAndUpdate(req.params.id, req.body);
    if (!capacitacionActualizada) {
      return res.status(404).json({ error: 'Capacitacion no encontrada' });
    }
    res.status(200).json(capacitacionActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la capacitacion' });
  }
}

// Eliminar una capacitacion por su ID
capacitacionCtrl.deleteCapacitacion = async (req, res) => {
  try {
    const capacitacionEliminada = await Capacitacion.findByIdAndDelete(req.params.id);
    if (!capacitacionEliminada) {
      return res.status(404).json({ error: 'Capacitacion no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la Capacitacion' });
  }
}

module.exports = capacitacionCtrl;