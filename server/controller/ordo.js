const Ordo = require('../model/ordo')
const Familia = require('../model/familia')
const Genus = require('../model/genus')
const Specie = require('../model/specie')
const mongoose = require('mongoose')
const slugify = require('slugify')

exports.list = async (req,res) => {
  const ordos = await Ordo.find({})
    .sort([['createdAt','desc']])
    .exec()
  res.json(ordos)
}

exports.read = async (req,res) => {
  const ordo = await Ordo.findOne({slug: req.params.slug})
  .exec()
  res.json(ordo)
}

exports.readById = async (req,res) => {
  // const ordo = await Ordo.findOne({_id:req.params._id})
  // console.log('id',typeof(req.params.id));
  const _id = mongoose.Types.ObjectId(req.params._id)
  // console.log('idOrdo',typeof(_id),_id,typeof(req.params._id),req.params._id);
  const ordo = await Ordo.findById(_id)
  .exec()
  res.json(ordo)
}

exports.create = async (req,res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.name)
    const ordo = await new Ordo(req.body).save()
    res.json(ordo)

  } catch (error) {
    res.status(400).send('Create Ordo failed!')
  }
}

exports.read = async (req,res) => {
  const {slug} = req.params
  const ordo = await Ordo.findOne({slug}).exec()
  res.json(ordo)
}

exports.update = async (req,res) => {
  try {
    if(req.body.title){
      req.body.slug = slugify(req.body.name)
    }
    const updated = await Ordo.findOneAndUpdate({slug:req.params.slug},req.body,{new:true}).exec()
    res.json(updated)
  } catch (error) {
    console.log('update',error);
    res.status(400).send('Update failed!')
  }
}

exports.remove = async (req,res) => {
  try {
    const deleted = await Ordo.findOneAndDelete({slug:req.params.slug}).exec()
    res.json(deleted)
  } catch (error) {
    console.log('deleted',error);
    res.status(400).send('Delete failed!')
  }
}

exports.readFamilia = async (req,res) => {
  Familia.find({ordo:req.params._id}).exec((err,familiaList) => {
    if(err) console.log('get familia from ordo',err);
    res.json(familiaList)
  })
}

exports.readGenus = async (req,res) => {
  Genus.find({ordo:req.params._id}).exec((err,GenusList) => {
    if(err) console.log('get Genus from ordo',err);
    res.json(GenusList)
  })
}

exports.readSpecie = async (req,res) => {
  Specie.find({ordo:req.params._id}).exec((err,SpecieList) => {
    if(err) console.log('get Specie from ordo',err);
    res.json(SpecieList)
  })
}

