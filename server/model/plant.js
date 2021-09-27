const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const plantSchema = mongoose.Schema({
  vnName:{
    type:String,
    trim:true,
    required:true,
    maxLength:32,
    text:true,
  },
  specie:{
    type:String,
    trim:true,
    required:true,
    maxLength:32,
    text:true,
  }, 
  slug:{
    type:String,
    unique:true,
    lowercase:true,
    index:true,
  },
  ordo:{
    type:String,
    unique:true,
    text:true,
    maxLength:50,
    require:true,
  },
  familia:{
    type:String,
    unique:true,
    text:true,
    maxLength:50,
    require:true,
  },
  genus:{
    type:String,
    unique:true,
    maxLength:50,
    text:true,
    required:true,
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
    required:true,
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
},{timestamps:true})

module.exports = mongoose.model('Plant',plantSchema)

