const {Router} = require('express')
const router = Router();

const {getChats, createChat, getChatById, deleteChat, updateChat, getChatByParticipantes, getChatsByUserId, updateChatVisto} = require('../controller/chat.controller')

router.route('/')
    .get(getChats)
    .post(createChat)

router.route('/:id')
    .delete(deleteChat)
    .patch(updateChat)
    .get(getChatsByUserId)

router.route('/visto/:visto')
    .patch(updateChatVisto)

router.route('/:participante1/:participante2')
    .get(getChatByParticipantes)


module.exports = router;