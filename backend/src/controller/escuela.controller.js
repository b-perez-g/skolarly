const escuelaCtrl = {}
const Escuela = require('../models/Escuela')

// Crear nueva escuela
escuelaCtrl.createEscuela = async (req, res) => {
  try {
    const escuelaNueva = new Escuela(req.body);
    const escuelaGuardada = await escuelaNueva.save();
    res.status(201).json(escuelaGuardada);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la escuela' });
  }
}

// Obtener todas las escuelas
escuelaCtrl.getEscuelas = async (req, res) => {
  try {
    const escuelas = await Escuela.find();
    res.status(200).json(escuelas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las escuelas' });
  }
}

// Obtener una escuela por su ID
escuelaCtrl.getEscuelaById = async (req, res) => {
  try {
    const escuela = await Escuela.findById(req.params.id);
    if (!escuela) {
      return res.status(404).json({ error: 'Escuela no encontrada' });
    }
    res.status(200).json(escuela);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la escuela' });
  }
}

// Actualizar una escuela por su ID
escuelaCtrl.updateEscuela = async (req, res) => {
  try {
    const escuelaActualizada = await Escuela.findByIdAndUpdate(req.params.id, req.body);
    if (!escuelaActualizada) {
      return res.status(404).json({ error: 'Escuela no encontrada' });
    }
    res.status(200).json(escuelaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la escuela' });
  }
}

// Eliminar una escuela por su ID
escuelaCtrl.deleteEscuela = async (req, res) => {
  try {
    const escuelaEliminada = await Escuela.findByIdAndDelete(req.params.id);
    if (!escuelaEliminada) {
      return res.status(404).json({ error: 'Escuela no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la Escuela' });
  }
}

module.exports = escuelaCtrl;