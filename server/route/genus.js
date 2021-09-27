const express = require('express')
const router = express.Router()

const {authCheck,adminCheck} = require('../middleware/auth')
const {list,read,create,update,remove} = require('../controller/genus')

router.get('/genus-list',list)
router.get('/genus/:slug',read)
router.post('/genus',authCheck,adminCheck,create)
router.put('/genus/:slug',authCheck,adminCheck,update)
router.delete('/genus/:slug',authCheck,adminCheck,remove)

module.exports = router