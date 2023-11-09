const medallaCtrl = {}
const Medalla = require('../models/Medalla')

// Crear nueva medalla
medallaCtrl.createMedalla = async (req, res) => {
  try {
    const medallaNueva = new Medalla(req.body);
    const medallaGuardada = await medallaNueva.save();
    res.status(201).json(medallaGuardada);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la medalla' });
  }
}

// Obtener todas las medallas
medallaCtrl.getMedallas = async (req, res) => {
  try {
    const medallas = await Medalla.find();
    res.status(200).json(medallas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las medallas' });
  }
}

// Obtener una medalla por su ID
medallaCtrl.getMedallaById = async (req, res) => {
  try {
    const medalla = await Medalla.findById(req.params.id);
    if (!medalla) {
      return res.status(404).json({ error: 'Medalla no encontrada' });
    }
    res.status(200).json(medalla);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la medalla' });
  }
}

// Actualizar una medalla por su ID
medallaCtrl.updateMedalla = async (req, res) => {
  try {
    const medallaActualizada = await Medalla.findByIdAndUpdate(req.params.id, req.body);
    if (!medallaActualizada) {
      return res.status(404).json({ error: 'Medalla no encontrada' });
    }
    res.status(200).json(medallaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la medalla' });
  }
}

// Eliminar una medalla por su ID
medallaCtrl.deleteMedalla = async (req, res) => {
  try {
    const medallaEliminada = await Medalla.findByIdAndDelete(req.params.id);
    if (!medallaEliminada) {
      return res.status(404).json({ error: 'Medalla no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la Medalla' });
  }
}

module.exports = medallaCtrl;