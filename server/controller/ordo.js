const Ordo = require('../model/ordo')
const Familia = require('../model/familia')
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

exports.create = async (req,res) => {
  try {
    const {name} = req.body
    console.log(req.body);
    const ordo = await new Ordo({name,slug:slugify(name)}).save()
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
    const {name} = req.body
    const updated = await Ordo.findOneAndUpdate({slug:req.params.slug},{
      name,
      slug:slugify(name),
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

// exports.read = async  (req,res) => {
//   try {
//     const ordo = await Ordo.findOne({slug:req.params.slug}).exec()
//     // res.json(ordo)
//     const product = await Product.find({Ordo:ordo})
//     .populate('ordo')
//     .populate('postedBy','_id name') //to select by name
//     .exec()
//     res.json({
//       ordo,
//       product,
//     })
//   } catch (error) {
//     console.log(error);
//     res.status(400).send('Get ordo failed')
//   }
// }