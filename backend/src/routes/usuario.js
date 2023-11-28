const {Router} = require('express')
const router = Router();

const {createUsuario, getUsuarios, getUsuarioById, deleteUsuario, updateUsuario, getUsuarioByRut} = require('../controller/usuario.controller')

router.route('/')
    .get(getUsuarios)
    .post(createUsuario)

router.route('/:id')
    .get(getUsuarioById)
    .delete(deleteUsuario)
    .put(updateUsuario)

router.route('/rut/:rut')
    .get(getUsuarioByRut)

module.exports = router;