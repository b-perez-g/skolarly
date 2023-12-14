const calificacionCtrl = {}
const Calificacion = require('../models/Calificacion')



calificacionCtrl.getCalificacionByAlumnoAndAsignatura = async (req, res) => {
  try {
    const { alumno_id, asignatura_id } = req.params;


    if (!alumno_id || !asignatura_id) {
      return res.status(400).json({ error: 'Se requieren ambos parámetros: alumno_id y asignatura_id' });
    }


    const query = { alumno_id, asignatura_id };

    const calificaciones = await Calificacion.find(query);

    if (!calificaciones || calificaciones.length === 0) {
      return res.status(404).json({ error: 'Calificaciones no encontradas' });
    }

    res.status(200).json(calificaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las calificaciones' });
  }
};

// Crear nueva calificacion
calificacionCtrl.createCalificacion = async (req, res) => {
  try {
    const calificacionNueva = new Calificacion(req.body);
    const calificacionGuardada = await calificacionNueva.save();
    res.status(201).json(calificacionGuardada);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la calificacion' });
  }
}

// Obtener todas las calificaciones
calificacionCtrl.getCalificaciones = async (req, res) => {
  try {
    const calificaciones = await Calificacion.find();
    res.status(200).json(calificaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las calificaciones' });
  }
}

// Obtener una calificacion por su ID
calificacionCtrl.getCalificacionById = async (req, res) => {
  try {
    const calificacion = await Calificacion.findById(req.params.id);
    if (!calificacion) {
      return res.status(404).json({ error: 'Calificacion no encontrada' });
    }
    res.status(200).json(calificacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la calificacion' });
  }
}

// Actualizar una calificacion por su ID
calificacionCtrl.updateCalificacion = async (req, res) => {
  try {
    const calificacionActualizada = await Calificacion.findByIdAndUpdate(req.params.id, req.body);
    if (!calificacionActualizada) {
      return res.status(404).json({ error: 'Calificacion no encontrada' });
    }
    res.status(200).json(calificacionActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la calificacion' });
  }
}

// Eliminar una calificacion por su ID
calificacionCtrl.deleteCalificacion = async (req, res) => {
  try {
    const calificacionEliminada = await Calificacion.findByIdAndDelete(req.params.id);
    if (!calificacionEliminada) {
      return res.status(404).json({ error: 'Calificacion no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la Calificacion' });
  }
}

module.exports = calificacionCtrl;