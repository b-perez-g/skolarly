const asignaturaCtrl = {}
const Asignatura = require('../models/Asignatura')

// Crear nueva asignatura
asignaturaCtrl.createAsignatura = async (req, res) => {
  try {
    const asignaturaNueva = new Asignatura(req.body);
    const asignaturaGuardada = await asignaturaNueva.save();
    res.status(201).json(asignaturaGuardada);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la asignatura' });
  }
}

// Obtener todas las asignaturas
asignaturaCtrl.getAsignaturas = async (req, res) => {
  try {
    const asignaturas = await Asignatura.find();
    res.status(200).json(asignaturas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las asignaturas' });
  }
}

// Obtener una asignatura por su ID
asignaturaCtrl.getAsignaturaById = async (req, res) => {
  try {
    const asignatura = await Asignatura.findById(req.params.id);
    if (!asignatura) {
      return res.status(404).json({ error: 'Asignatura no encontrada' });
    }
    res.status(200).json(asignatura);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la asignatura' });
  }
}

// Actualizar una asignatura por su ID
asignaturaCtrl.updateAsignatura = async (req, res) => {
  try {
    const asignaturaActualizada = await Asignatura.findByIdAndUpdate(req.params.id, req.body);
    if (!asignaturaActualizada) {
      return res.status(404).json({ error: 'Asignatura no encontrada' });
    }
    res.status(200).json(asignaturaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la asignatura' });
  }
}

// Eliminar una asignatura por su ID
asignaturaCtrl.deleteAsignatura = async (req, res) => {
  try {
    const asignaturaEliminada = await Asignatura.findByIdAndDelete(req.params.id);
    if (!asignaturaEliminada) {
      return res.status(404).json({ error: 'Asignatura no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la Asignatura' });
  }
}

module.exports = asignaturaCtrl;