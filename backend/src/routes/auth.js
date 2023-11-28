const {Router} = require('express')
const router = Router();

const {generateToken, getToken} = require('../controller/auth.controller')

router.route('/')
    .post(generateToken)

router.route('/:token')
    .get(getToken)

module.exports = router;