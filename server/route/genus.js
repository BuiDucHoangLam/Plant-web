const express = require('express')
const router = express.Router()

const {authCheck,adminCheck} = require('../middleware/auth')
const {list,read,create,update,remove,readById, readSpecie} = require('../controller/genus')

router.get('/genus-list',list)
router.get('/genus/:slug',read)
router.get('/genus-id/:_id',readById)
router.get('/genus/specie/:_id',readSpecie)
router.post('/genus',authCheck,adminCheck,create)
router.put('/genus/:slug',authCheck,adminCheck,update)
router.delete('/genus/:slug',authCheck,adminCheck,remove)

module.exports = router