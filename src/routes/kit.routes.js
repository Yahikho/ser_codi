const { Router } = require('express')
const { updateKit, validateToken, authUser } = require('../controllers/kit')

const router = Router()

router.post('/auth', authUser)

router.post('/kit', validateToken, updateKit)

module.exports = router