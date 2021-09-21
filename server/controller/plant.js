const Plant = require('../model/plant')
const slugify = require('slugify')

exports.listAll = async (req,res) => {
  const plants = await Plant.find({})
    .sort([['createdAt','desc']])
    .exec()
  res.json(plants)
}

exports.getBySlug = async (req,res) => {
  const plant = await Plant.findOne({slug: req.params.slug})
  .exec()
  res.json(plant)
}

exports.create = async (req,res) => {
  try {
    console.log(req.body);
    // req.body.slug = slugify(req.body.name)
    const newPlant = await new Plant(req.body).save()
    res.json(newPlant)
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error:error.message
    })
  }
}

const handleName = async (req,res,name) => {
  
  const plant = await Plant.find({$text:{$search:name}})
  .exec()

  res.json(plant)
  
}

const handleDescription = async (req,res,description) => {
  const plant = await Plant.find({'description': new RegExp(description,'i')}).exec()
  res.json(plant)

}

const handleGenus = async (req,res,genus) => {
  const plant = await Plant.find({'genus': new RegExp(genus,'i')}).exec()
  res.json(plant)

}

const handleOtherData = async (req,res,otherData) => {
  const plant = await Plant.find({'otherData': new RegExp(otherData,'i')}).exec()
  res.json(plant)
}

const handleDistribution = async (req,res,distribution) => {
  const plant = await Plant.find({'distribution': new RegExp(distribution,'i')}).exec()
  res.json(plant)

}

const handleSource = async (req,res,source) => {
  const plant = await Plant.find({'source': new RegExp(source,'i')}).exec()
  res.json(plant)

}

const handleBibliography = async (req,res,bibliography) => {
  const plant = await Plant.find({'bibliography': new RegExp(bibliography,'i')}).exec()
  res.json(plant)

}

exports.searchFilter = async (req,res) => {
  const {name,genus,description,otherData,distribution,source,bibliography} = req.body
  console.log(req.body);
  if(name) {
    console.log('name',name);
    await handleName(req,res,name)
  }

  if(genus){
    console.log('genus',genus)
    await handleGenus(req,res,genus)
  }

  if(description){
    console.log('description',description)
    await handleDescription(req,res,description)
  }

  if(otherData){
    console.log('otherData',otherData)
    await handleOtherData(req,res,otherData)
  }

  if(bibliography){
    console.log('bibliography',bibliography)
    await handleBibliography(req,res,bibliography)
  }

  if(distribution){
    console.log('distribution',distribution)
    await handleDistribution(req,res,distribution)
  }

  if(source){
    console.log('source',source)
    await handleSource(req,res,source)
  }
}

