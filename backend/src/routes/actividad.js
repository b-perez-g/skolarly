const {Router} = require('express')
const router = Router();

const {getActividadById, getActividades,updateActividad,deleteActividad,createActividad} = require('../controller/actividad.controller')

router.route('/')
    .get(getActividades)
    .post(createActividad)

router.route('/:id')
    .get(getActividadById)
    .delete(deleteActividad)
    .put(updateActividad)

module.exports = router;