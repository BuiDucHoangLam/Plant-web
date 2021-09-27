const express = require('express')
const router = express.Router()

const {authCheck,adminCheck} = require('../middleware/auth')
const {list,read,create,update,remove,readFamilia} = require('../controller/ordo')

router.get('/ordos',list)
router.get('/ordo/:slug',read)
router.get('/ordo/familia/:_id',readFamilia)
router.post('/ordo',authCheck,adminCheck,create)
router.put('/ordo/:slug',authCheck,adminCheck,update)
router.delete('/ordo/:slug',authCheck,adminCheck,remove)

module.exports = router