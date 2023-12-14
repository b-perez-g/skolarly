const Anotacion = require('../models/Anotacion')
const anotacionCtrl = {}

anotacionCtrl.getAnotacionesByAlumnoId = async (req, res) => {
  try {
    const alumnoId = req.params.alumnoId;

    const anotaciones = await Anotacion.find({ alumno_id: alumnoId }).sort({ createdAt: -1 });

    if (!anotaciones || anotaciones.length === 0) {
      return res.status(404).json({ error: 'No se encontraron anotaciones para el alumno con ID ' + alumnoId });
    }

    res.status(200).json(anotaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las anotaciones' });
  }
};

anotacionCtrl.createAnotacion = async (req, res) => {
  try {
    const anotacionNueva = new Anotacion(req.body);
    const anotacionGuardada = await anotacionNueva.save();
    res.status(201).json(anotacionGuardada);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la anotacion' });
  }
}

// Obtener todas las anotaciones
anotacionCtrl.getAnotaciones = async (req, res) => {
  try {
    const anotaciones = await Anotacion.find();
    res.status(200).json(anotaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las anotaciones' });
  }
}

// Obtener una anotacion por su ID
anotacionCtrl.getAnotacionById = async (req, res) => {
  try {
    const anotacion = await Anotacion.findById(req.params.id);
    if (!anotacion) {
      return res.status(404).json({ error: 'Anotacion no encontrada' });
    }
    res.status(200).json(anotacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la anotacion' });
  }
}

// Actualizar una anotacion por su ID
anotacionCtrl.updateAnotacion = async (req, res) => {
  try {
    const anotacionActualizada = await Anotacion.findByIdAndUpdate(req.params.id, req.body);
    if (!anotacionActualizada) {
      return res.status(404).json({ error: 'Anotacion no encontrada' });
    }
    res.status(200).json(anotacionActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la anotacion' });
  }
}

// Eliminar una anotacion por su ID
anotacionCtrl.deleteAnotacion = async (req, res) => {
  try {
    const anotacionEliminada = await Anotacion.findByIdAndDelete(req.params.id);
    if (!anotacionEliminada) {
      return res.status(404).json({ error: 'Anotacion no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la Anotacion' });
  }
}

module.exports = anotacionCtrl;