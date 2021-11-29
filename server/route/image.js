const express = require('express')
const router = express.Router()

const {upload} = require('../config/image')
const {authCheck,adminCheck} = require('../middleware/auth')

const {singleFileUpload,multipleFileUpload,getAllSingleFiles,getAllMultipleFiles,deleteSingleFile,deleteMultipleFile} = require('../controller/image')

router.post('/upload-single', upload.single('file'),singleFileUpload);
router.post('/upload-multiple', upload.array('files'),multipleFileUpload);
router.delete('/upload-single/:fileName', deleteSingleFile);
router.delete('/upload-multiple/:_id', deleteMultipleFile);
router.get('/single-files', getAllSingleFiles);
router.get('/multiple-files', getAllMultipleFiles);

module.exports = router
