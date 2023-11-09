const bloqueHorarioCtrl = {}
const BloqueHorario = require('../models/BloqueHorario')

// Crear nuevo bloqueHorario
bloqueHorarioCtrl.createBloqueHorario = async (req, res) => {
  try {
    const bloqueHorarioNuevo = new BloqueHorario(req.body);
    const bloqueHorarioGuardado = await bloqueHorarioNuevo.save();
    res.status(201).json(bloqueHorarioGuardado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el bloqueHorario' });
  }
}

// Obtener todos los bloquesHorarios
bloqueHorarioCtrl.getBloquesHorarios = async (req, res) => {
  try {
    const bloquesHorarios = await BloqueHorario.find();
    res.status(200).json(bloquesHorarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los bloquesHorarios' });
  }
}

// Obtener un bloqueHorario por su ID
bloqueHorarioCtrl.getBloqueHorarioById = async (req, res) => {
  try {
    const bloqueHorario = await BloqueHorario.findById(req.params.id);
    if (!bloqueHorario) {
      return res.status(404).json({ error: 'BloqueHorario no encontrado' });
    }
    res.status(200).json(bloqueHorario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el bloqueHorario' });
  }
}

// Actualizar un bloqueHorario por su ID
bloqueHorarioCtrl.updateBloqueHorario = async (req, res) => {
  try {
    const bloqueHorarioActualizado = await BloqueHorario.findByIdAndUpdate(req.params.id, req.body);
    if (!bloqueHorarioActualizado) {
      return res.status(404).json({ error: 'BloqueHorario no encontrado' });
    }
    res.status(200).json(bloqueHorarioActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el bloqueHorario' });
  }
}

// Eliminar un bloqueHorario por su ID
bloqueHorarioCtrl.deleteBloqueHorario = async (req, res) => {
  try {
    const bloqueHorarioEliminado = await BloqueHorario.findByIdAndDelete(req.params.id);
    if (!bloqueHorarioEliminado) {
      return res.status(404).json({ error: 'BloqueHorario no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el BloqueHorario' });
  }
}

module.exports = bloqueHorarioCtrl;