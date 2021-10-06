const Ordo = require('../model/ordo')
const Familia = require('../model/familia')
const Genus = require('../model/genus')
const slugify = require('slugify')

exports.list = async (req,res) => {
  const familias = await Familia.find({})
    .sort([['createdAt','desc']])
    .exec()
  res.json(familias)
}

exports.read = async (req,res) => {
  const familia = await Familia.findOne({slug: req.params.slug})
  .exec()
  res.json(familia)
}

exports.readById = async (req,res) => {
  const familia = await Familia.findOne({_id:req.params._id})
  .exec()
  res.json(familia)
}

exports.create = async (req,res) => {
  try {
    req.body.slug = slugify(req.body.name)
    console.log(req.body);
    const familia = await new Familia(req.body).save()
    res.json(familia)

  } catch (error) {
    res.status(400).send('Create familia failed!')
  }
}

exports.update = async (req,res) => {
  try {
    if(req.body.name) {
      req.body.slug = slugify(req.body.name)
    }
    const updated = await Familia.findOneAndUpdate({slug:req.params.slug},req.body,{new:true}).exec()
    res.json(updated)
  } catch (error) {
    console.log('update',error);
    res.status(400).send('Update failed!')
  }
}

exports.remove = async (req,res) => {
  try {
    const deleted = await Familia.findOneAndDelete({slug:req.params.slug}).exec()
    res.json(deleted)
  } catch (error) {
    console.log('deleted',error);
    res.status(400).send('Delete failed!')
  }
}

exports.readGenus = async (req,res) => {
  Genus.find({familia:req.params._id}).exec((err,genusList) => {
    if(err) console.log('get genus from familia',err);
    res.json(genusList)
  })
}