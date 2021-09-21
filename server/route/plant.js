const express = require('express')
const router = express.Router()

const {listAll,getBySlug, create, searchFilter} = require('../controller/plant')

router.get('/plant',(req,res) => {
  res.json({
    data:'hit api'
  })
})

router.get('/plants',listAll)
router.get('/plant/:slug',getBySlug)
router.post('/plants',create)
router.post('/search/filter',searchFilter)


module.exports = router