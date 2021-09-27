const express = require('express')

const router = express.Router()

const {authCheck,adminCheck} = require('../middleware/auth')

const {upload,remove} = require('../controller/cloudinary')

router.post('/upload-image',authCheck,adminCheck,upload)
router.post('/remove-image',authCheck,adminCheck,remove)

module.exports = router
