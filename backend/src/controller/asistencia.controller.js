const asistenciaCtrl = {}
const Asistencia = require('../models/Asistencia')

//asistencias del alumno
asistenciaCtrl.getAsistenciasByAlumnoId = async (req, res) => {
  try {
    const alumnoId = req.params.alumnoId;

    const asistencias = await Asistencia.find({ alumno_id: alumnoId }).sort({ createdAt: -1 });

    if (!asistencias || asistencias.length === 0) {
      return res.status(404).json({ error: 'No se encontraron asistencias para el alumno con ID ' + alumnoId });
    }

    res.status(200).json(asistencias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las asistencias' });
  }
};

// Crear nueva asistencia
asistenciaCtrl.createAsistencia = async (req, res) => {
  try {
    const asistenciaNueva = new Asistencia(req.body);
    const asistenciaGuardada = await asistenciaNueva.save();
    res.status(201).json(asistenciaGuardada);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la asistencia' });
  }
}

// Obtener todas las asistencias
asistenciaCtrl.getAsistencias = async (req, res) => {
  try {
    const asistencias = await Asistencia.find();
    res.status(200).json(asistencias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las asistencias' });
  }
}

// Obtener una asistencia por su ID
asistenciaCtrl.getAsistenciaById = async (req, res) => {
  try {
    const asistencia = await Asistencia.findById(req.params.id);
    if (!asistencia) {
      return res.status(404).json({ error: 'Asistencia no encontrada' });
    }
    res.status(200).json(asistencia);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la asistencia' });
  }
}

// Actualizar una asistencia por su ID
asistenciaCtrl.updateAsistencia = async (req, res) => {
  try {
    const asistenciaActualizada = await Asistencia.findByIdAndUpdate(req.params.id, req.body);
    if (!asistenciaActualizada) {
      return res.status(404).json({ error: 'Asistencia no encontrada' });
    }
    res.status(200).json(asistenciaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la asistencia' });
  }
}

// Eliminar una asistencia por su ID
asistenciaCtrl.deleteAsistencia = async (req, res) => {
  try {
    const asistenciaEliminada = await Asistencia.findByIdAndDelete(req.params.id);
    if (!asistenciaEliminada) {
      return res.status(404).json({ error: 'Asistencia no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la Asistencia' });
  }
}

module.exports = asistenciaCtrl;