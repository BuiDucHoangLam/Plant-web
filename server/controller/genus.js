const Ordo = require('../model/ordo')
const Genus = require('../model/genus')
const slugify = require('slugify')

exports.list = async (req,res) => {
  const genus = await Genus.find({})
    .sort([['createdAt','desc']])
    .exec()
  res.json(genus)
}

exports.read = async (req,res) => {
  const genus = await Genus.findOne({slug: req.params.slug})
  .exec()
  res.json(genus)
}

exports.readById = async (req,res) => {
  const genus = await Genus.findOne({_id:req.params._id})
  .exec()
  res.json(genus)
}

exports.create = async (req,res) => {
  try {
    req.body.slug = slugify(req.body.name)
    console.log(req.body);
    const genus = await new Genus(req.body).save()
    res.json(genus)

  } catch (error) {
    console.log(error);
    res.status(400).send('Create genus failed!')
  }
}

exports.update = async (req,res) => {
  try {
    if(req.body.name) {
      req.body.slug = slugify(req.body.name)
    }
    const updated = await Genus.findOneAndUpdate({slug:req.params.slug},req.body,{new:true}).exec()
    res.json(updated)
  } catch (error) {
    console.log('update',error);
    res.status(400).send('Update failed!')
  }
}

exports.remove = async (req,res) => {
  try {
    const deleted = await Genus.findOneAndDelete({slug:req.params.slug}).exec()
    res.json(deleted)
  } catch (error) {
    console.log('deleted',error);
    res.status(400).send('Delete failed!')
  }
}
