const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const plantSchema = mongoose.Schema({
  name:{
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
  family:{
    type:String,
    maxLength:2000,
    text:true,
  },
  genus:{
    type:String,
    maxLength:2000,
    text:true,
    required:true,
  },
  description:{
    type:String,
    required:true,
    maxLength:2000,
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
  synonyms:{
    type:Array,
  },
  relatives:{
    type:String,
  },
  otherData:{
    type:String,
    maxLength:2000,
    text:true,
  },
  bibliography:{
    type:String,
    maxLength:2000,
    text:true,
  },
  source:{
    type:String,
    maxLength:2000,
    text:true,
  }
},{timestamps:true})

module.exports = mongoose.model('Plant',plantSchema)

