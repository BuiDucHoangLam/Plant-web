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
  },
  description:{
    type:String,
    maxLength:20000,
    text:true,
  },
  images: {
    type:Array,
  },
  distribution:{
    type:String,
    maxLength:2000,
    text:true,
  },
  value:{
    type:String,
    maxLength:20000,
    text:true,
  },
  enDistribution:{
    type:String,
    maxLength:2000,
    text:true,
  },
  value:{
    type:String,
    maxLength:20000,
    text:true,
  },
  enValue:{
    type:String,
    maxLength:20000,
    text:true,
  },
  enDescription:{
    type:String,
    maxLength:20000,
    text:true,
  },
},{timestamps:true},)

module.exports = mongoose.model('genus',genusSchema)