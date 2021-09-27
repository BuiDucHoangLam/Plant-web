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

exports.create = async (req,res) => {
  try {
    const {name,ordo} = req.body
    console.log(req.body);
    const familia = await new Familia({name,slug:slugify(name),ordo}).save()
    res.json(familia)

  } catch (error) {
    res.status(400).send('Create familia failed!')
  }
}

exports.update = async (req,res) => {
  try {
    const {name,ordo} = req.body
    const updated = await Familia.findOneAndUpdate({slug:req.params.slug},{
      name,
      slug:slugify(name),
      ordo,
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