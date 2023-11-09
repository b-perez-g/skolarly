const archivoAdjuntoCtrl = {}
const ArchivoAdjunto = require('../models/ArchivoAdjunto')

// Crear nuevo archivoAdjunto
archivoAdjuntoCtrl.createArchivoAdjunto = async (req, res) => {
  try {
    const archivoAdjuntoNuevo = new ArchivoAdjunto(req.body);
    const archivoAdjuntoGuardado = await archivoAdjuntoNuevo.save();
    res.status(201).json(archivoAdjuntoGuardado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el archivoAdjunto' });
  }
}

// Obtener todos los archivosAdjuntos
archivoAdjuntoCtrl.getArchivosAdjuntos = async (req, res) => {
  try {
    const archivosAdjuntos = await ArchivoAdjunto.find();
    res.status(200).json(archivosAdjuntos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los archivosAdjuntos' });
  }
}

// Obtener un archivoAdjunto por su ID
archivoAdjuntoCtrl.getArchivoAdjuntoById = async (req, res) => {
  try {
    const archivoAdjunto = await ArchivoAdjunto.findById(req.params.id);
    if (!archivoAdjunto) {
      return res.status(404).json({ error: 'ArchivoAdjunto no encontrado' });
    }
    res.status(200).json(archivoAdjunto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el archivoAdjunto' });
  }
}

// Actualizar un archivoAdjunto por su ID
archivoAdjuntoCtrl.updateArchivoAdjunto = async (req, res) => {
  try {
    const archivoAdjuntoActualizado = await ArchivoAdjunto.findByIdAndUpdate(req.params.id, req.body);
    if (!archivoAdjuntoActualizado) {
      return res.status(404).json({ error: 'ArchivoAdjunto no encontrado' });
    }
    res.status(200).json(archivoAdjuntoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el archivoAdjunto' });
  }
}

// Eliminar un archivoAdjunto por su ID
archivoAdjuntoCtrl.deleteArchivoAdjunto = async (req, res) => {
  try {
    const archivoAdjuntoEliminado = await ArchivoAdjunto.findByIdAndDelete(req.params.id);
    if (!archivoAdjuntoEliminado) {
      return res.status(404).json({ error: 'ArchivoAdjunto no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el ArchivoAdjunto' });
  }
}

module.exports = archivoAdjuntoCtrl;