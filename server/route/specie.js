const express = require('express')
const router = express.Router()

const {authCheck,adminCheck} = require('../middleware/auth')
const {list,read,create,update,remove} = require('../controller/specie')

router.get('/species',list)
router.get('/specie/:slug',read)
router.post('/specie',authCheck,adminCheck,create)
router.put('/specie/:slug',authCheck,adminCheck,update)
router.delete('/specie/:slug',authCheck,adminCheck,remove)

module.exports = router