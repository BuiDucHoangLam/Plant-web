const mongoose = require('mongoose')

const imageMultipleSchema = new mongoose.Schema({
  title: {
    type:String,
    
  },
  files:[Object],
},{timestamps:true})

module.exports = mongoose.model('uploadMultiple',imageMultipleSchema)