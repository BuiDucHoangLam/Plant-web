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
    maxLength:20000,
    text:true,
  },
  value:{
    type:String,
    maxLength:20000,
    text:true,
  },
  // imagesBackground: {
  //   type:Array,
  // },
  // imagesFruit:{
  //   type:Array,
  // },
  // imagesLeave:{
  //   type:Array,
  // },
  // imagesClove:{
  //   type:Array,
  // },
  // imagesFlower:{
  //   type:Array,
  // },
  // imagesSeed:{
  //   type:Array,
  // },
  images:{
    type:Object,
  },
  distribution:{
    type:String,
    maxLength:2000,
    text:true,
  },
  coordinates:{
    type:Array,
  },
  longitudeList:{
    type:Array,
  },
  latitudeList:{
    type:Array,
  },
  source:{
    type:String,
    maxLength:20000,
    text:true,
  },
  enSource:{
    type:String,
    maxLength:20000,
    text:true,
  },
  fruitSeason:{
    type:String,
    maxLength:20000,
    text:true,
  },
  enDescription:{
    type:String,
    maxLength:20000,
    text:true,
  },
  enDistribution:{
    type:String,
    maxLength:2000,
    text:true,
  },
  enValue:{
    type:String,
    maxLength:20000,
    text:true,
  },
  enName:{
    type:String,
    trim:true,
    text:true,
  }
},{timestamps:true},)

module.exports = mongoose.model('specie',specieSchema)