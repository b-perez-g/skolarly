const casoCtrl = {}
const Caso = require('../models/Caso')

// Crear nuevo caso
casoCtrl.createCaso = async (req, res) => {
  try {
    const casoNuevo = new Caso(req.body);
    const casoGuardado = await casoNuevo.save();
    res.status(201).json(casoGuardado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el caso' });
  }
}

// Obtener todos los casos
casoCtrl.getCasos = async (req, res) => {
  try {
    const casos = await Caso.find();
    res.status(200).json(casos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los casos' });
  }
}

// Obtener un caso por su ID
casoCtrl.getCasoById = async (req, res) => {
  try {
    const caso = await Caso.findById(req.params.id);
    if (!caso) {
      return res.status(404).json({ error: 'Caso no encontrado' });
    }
    res.status(200).json(caso);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el caso' });
  }
}

// Actualizar un caso por su ID
casoCtrl.updateCaso = async (req, res) => {
  try {
    const casoActualizado = await Caso.findByIdAndUpdate(req.params.id, req.body);
    if (!casoActualizado) {
      return res.status(404).json({ error: 'Caso no encontrado' });
    }
    res.status(200).json(casoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el caso' });
  }
}

// Eliminar un caso por su ID
casoCtrl.deleteCaso = async (req, res) => {
  try {
    const casoEliminado = await Caso.findByIdAndDelete(req.params.id);
    if (!casoEliminado) {
      return res.status(404).json({ error: 'Caso no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el Caso' });
  }
}

module.exports = casoCtrl;