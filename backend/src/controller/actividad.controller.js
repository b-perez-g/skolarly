const actividadCtrl = {}
const Actividad = require('../models/Actividad')

// Crear nueva actividad
actividadCtrl.createActividad = async (req, res) => {
  try {
    const actividadNueva = new Actividad(req.body);
    const actividadGuardada = await actividadNueva.save();
    res.status(201).json(actividadGuardada);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la actividad' });
  }
}

// Obtener todas las actividades
actividadCtrl.getActividades = async (req, res) => {
  try {
    const actividades = await Actividad.find();
    res.status(200).json(actividades);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las actividades' });
  }
}

// Obtener una actividad por su ID
actividadCtrl.getActividadById = async (req, res) => {
  try {
    const actividad = await Actividad.findById(req.params.id);
    if (!actividad) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }
    res.status(200).json(actividad);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la actividad' });
  }
}

// Actualizar una actividad por su ID
actividadCtrl.updateActividad = async (req, res) => {
  try {
    const actividadActualizada = await Actividad.findByIdAndUpdate(req.params.id, req.body);
    if (!actividadActualizada) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }
    res.status(200).json(actividadActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la actividad' });
  }
}

// Eliminar una actividad por su ID
actividadCtrl.deleteActividad = async (req, res) => {
  try {
    const actividadEliminada = await Actividad.findByIdAndDelete(req.params.id);
    if (!actividadEliminada) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la Actividad' });
  }
}

module.exports = actividadCtrl;