const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const genusSchema = mongoose.Schema({
  name: {
    type:String,
    trim:true,
    required:'Name is required',
    minLength: [3,'Too short'],
    maxLength:[32,'Too long'],
  },
  slug: {
    type:String,
    unique:true,
    lowercase:true,
    index:true,
  },
  ordo: {
    type:ObjectId,
    ref:'ordo',
    require:true,
  },
  familia: {
    type:ObjectId,
    ref:'familia',
    require:true,
  }
},{timestamps:true},)

module.exports = mongoose.model('genus',genusSchema)