const {Router} = require('express')
const router = Router();

const {getBloquesHorarios, createBloqueHorario, getBloqueHorarioById, deleteBloqueHorario, updateBloqueHorario} = require('../controller/bloquehorario.controller')

router.route('/')
    .get(getBloquesHorarios)
    .post(createBloqueHorario)

router.route('/:id')
    .get(getBloqueHorarioById)
    .delete(deleteBloqueHorario)
    .put(updateBloqueHorario)

module.exports = router;