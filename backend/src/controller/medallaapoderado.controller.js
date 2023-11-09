const medallaApoderadoCtrl = {}
const MedallaApoderado = require('../models/MedallaApoderado')

// Crear nueva medallaApoderado
medallaApoderadoCtrl.createMedallaApoderado = async (req, res) => {
  try {
    const medallaApoderadoNueva = new MedallaApoderado(req.body);
    const medallaApoderadoGuardada = await medallaApoderadoNueva.save();
    res.status(201).json(medallaApoderadoGuardada);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la medallaApoderado' });
  }
}

// Obtener todas las medallasApoderados
medallaApoderadoCtrl.getMedallasApoderados = async (req, res) => {
  try {
    const medallasApoderados = await MedallaApoderado.find();
    res.status(200).json(medallasApoderados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las medallasApoderados' });
  }
}

// Obtener una medallaApoderado por su ID
medallaApoderadoCtrl.getMedallaApoderadoById = async (req, res) => {
  try {
    const medallaApoderado = await MedallaApoderado.findById(req.params.id);
    if (!medallaApoderado) {
      return res.status(404).json({ error: 'MedallaApoderado no encontrada' });
    }
    res.status(200).json(medallaApoderado);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la medallaApoderado' });
  }
}

// Actualizar una medallaApoderado por su ID
medallaApoderadoCtrl.updateMedallaApoderado = async (req, res) => {
  try {
    const medallaApoderadoActualizada = await MedallaApoderado.findByIdAndUpdate(req.params.id, req.body);
    if (!medallaApoderadoActualizada) {
      return res.status(404).json({ error: 'MedallaApoderado no encontrada' });
    }
    res.status(200).json(medallaApoderadoActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la medallaApoderado' });
  }
}

// Eliminar una medallaApoderado por su ID
medallaApoderadoCtrl.deleteMedallaApoderado = async (req, res) => {
  try {
    const medallaApoderadoEliminada = await MedallaApoderado.findByIdAndDelete(req.params.id);
    if (!medallaApoderadoEliminada) {
      return res.status(404).json({ error: 'MedallaApoderado no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la MedallaApoderado' });
  }
}

module.exports = medallaApoderadoCtrl;