const {Router} = require('express')
const router = Router();

const {createUsuario, getUsuarios, getUsuarioById, deleteUsuario, updateUsuario} = require('../controller/usuario.controller')

router.route('/')
    .get(getUsuarios)
    .post(createUsuario)

router.route('/:id')
    .get(getUsuarioById)
    .delete(deleteUsuario)
    .put(updateUsuario)

module.exports = router;