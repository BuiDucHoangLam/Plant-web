const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const specieSchema = mongoose.Schema({
  name: {
    type:String,
    trim:true,
    required:'Name is required',
    minLength: [3,'Too short'],
    text:true,
  },
  vnName:{
    type:String,
    trim:true,
    required:true,
    minLength: [3,'Too short'],
    text:true,
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
  genus: {
    type:ObjectId,
    ref:'genus',
    require:true,
  },
  synonyms:{
    type:Array,
  },
  description:{
    type:String,
    required:true,
    maxLength:20000,
    text:true,
  },
  value:{
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
  coordinates:{
    type:Array,
  },
  source:{
    type:String,
    maxLength:20000,
    text:true,
  },
  fruitSeason:{
    type:String,
    maxLength:20000,
    text:true,
  }
},{timestamps:true},)

module.exports = mongoose.model('specie',specieSchema)