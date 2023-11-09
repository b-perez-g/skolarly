const cursoCtrl = {}
const Curso = require('../models/Curso')

// Crear nuevo curso
cursoCtrl.createCurso = async (req, res) => {
  try {
    const cursoNuevo = new Curso(req.body);
    const cursoGuardado = await cursoNuevo.save();
    res.status(201).json(cursoGuardado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el curso' });
  }
}

// Obtener todos los cursos
cursoCtrl.getCursos = async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los cursos' });
  }
}

// Obtener un curso por su ID
cursoCtrl.getCursoById = async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.status(200).json(curso);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el curso' });
  }
}

// Actualizar un curso por su ID
cursoCtrl.updateCurso = async (req, res) => {
  try {
    const cursoActualizado = await Curso.findByIdAndUpdate(req.params.id, req.body);
    if (!cursoActualizado) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.status(200).json(cursoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el curso' });
  }
}

// Eliminar un curso por su ID
cursoCtrl.deleteCurso = async (req, res) => {
  try {
    const cursoEliminado = await Curso.findByIdAndDelete(req.params.id);
    if (!cursoEliminado) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el Curso' });
  }
}

module.exports = cursoCtrl;