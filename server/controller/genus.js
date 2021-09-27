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

exports.create = async (req,res) => {
  try {
    const {name,ordo,familia} = req.body
    console.log(req.body);
    const genus = await new Genus({name,slug:slugify(name),ordo,familia}).save()
    res.json(genus)

  } catch (error) {
    res.status(400).send('Create genus failed!')
  }
}

exports.update = async (req,res) => {
  try {
    const {name,ordo,familia} = req.body
    const updated = await Genus.findOneAndUpdate({slug:req.params.slug},{
      name,
      slug:slugify(name),
      ordo,
      familia,
      new:true,
    }).exec()
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
