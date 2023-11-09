const {Router} = require('express')
const router = Router();

const {getArchivosAdjuntos, createArchivoAdjunto, getArchivoAdjuntoById, deleteArchivoAdjunto, updateArchivoAdjunto} = require('../controller/archivoadjunto.controller')

router.route('/')
    .get(getArchivosAdjuntos)
    .post(createArchivoAdjunto)

router.route('/:id')
    .get(getArchivoAdjuntoById)
    .delete(deleteArchivoAdjunto)
    .put(updateArchivoAdjunto)

module.exports = router;