const express = require('express')
const router = express.Router()

const {authCheck,adminCheck} = require('../middleware/auth')
const {list,read,create,update,remove,readGenus,readById} = require('../controller/familia')

router.get('/familias',list)
router.get('/familia/:slug',read)
router.get('/familia-id/:_id',readById)
router.get('/familia/genus/:_id',readGenus)
router.post('/familia',authCheck,adminCheck,create)
router.put('/familia/:slug',authCheck,adminCheck,update)
router.delete('/familia/:slug',authCheck,adminCheck,remove)

module.exports = router