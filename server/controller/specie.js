const Ordo = require('../model/ordo')
const Genus = require('../model/genus')
const Specie = require('../model/specie')
const slugify = require('slugify')

exports.list = async (req,res) => {
  const specie = await Specie.find({})
    .populate('genus')
    .populate('familia')
    .populate('ordo')
    .sort([['createAt','desc']])
    .exec()
  res.json(specie)
}

exports.read = async (req,res) => {
  const specie = await Specie.findOne({slug:req.params.slug}).exec()
  res.json(specie)
}

exports.create = async (req,res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.name)
    const newSpecie = await new Specie(req.body).save()
    res.json(newSpecie)
  } catch (err) {
    // res.status(400).send('Create genus failed!')
    res.status(400).json({
      err:err.message,
    })
  }
}

exports.update = async (req,res) => {
  try {
    console.log('edit-specie',req.body);
    if(req.body.name) req.body.slug = slugify(req.body.name)
    const newSpecie = await Specie.findOneAndUpdate({slug:req.body.slug},req.body,{new:true}).exec()
    res.json(newSpecie)
  } catch (err) {
    res.status(400).json({
      err:err.message
    })
  }
}

exports.remove = async (req,res) => {
  try {
    const deleted = Specie.findOneAndRemove({slug:req.params.slug}).exec()
    res.json(deleted)
  } catch (error) {
    res.status(400).json({
      error:error.message,
    })
  }
}
