const express = require('express')

const router = express.Router()

const {upload,remove} = require('../controller/cloudinary')

router.post('/upload-images',upload)
router.post('/remove-images',remove)

module.exports = router
