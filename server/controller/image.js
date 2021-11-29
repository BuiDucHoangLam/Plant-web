'use strict';
const SingleFile = require('../model/image');
const MultipleFile = require('../model/images');
const fs = require('fs')

const singleFileUpload = async (req, res, next) => {
    try{
        const file = new SingleFile({
            fileName: req.file.filename,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
        });
        await file.save();
        res.json(file)
    }catch(error) {
        res.status(400).send(error.message);
    }
}
const multipleFileUpload = async (req, res, next) => {
    try{
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.filename,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
        const multipleFiles = new MultipleFile({
            title: req.body.title,
            files: filesArray 
        });
        await multipleFiles.save();
        res.status(201).send('Files Uploaded Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const getAllSingleFiles = async (req, res, next) => {
    try{
        const files = await SingleFile.find();
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}
const getAllMultipleFiles = async (req, res, next) => {
    try{
        const files = await MultipleFile.find();
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

const deleteSingleFile = async (req,res) => {
  try{
    if(fs.existsSync('./images/' + req.params.fileName)){
      const file = await SingleFile.findOneAndDelete({fileName:req.params.fileName}).exec()
      fs.unlink('./images/' + req.params.fileName, function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
      
      res.status(200).send(file);
    }
    else {
      res.status(400).send('NO file');
    }
    
  }catch(error) {
      res.status(400).send(error.message);
  }
  
}

const deleteMultipleFile = async (req,res) => {
  try{
    const file = await MultipleFile.findById(req.params._id)
    const newFile = []
    // if(fs.existsSync('../images/' + req.params.fileName)){
    //   const file = await SingleFile.findOneAndDelete({fileName:req.params.fileName}).exec()
    //   fs.unlink('../images/' + req.params.fileName, function (err) {
    //     if (err) throw err;
    //     console.log('File deleted!');
    //   });
    //   res.json(file)
    //   res.status(200).send(file);
    // }
    
    if(fs.existsSync('../images/' + req.body.fileName)){
      fs.unlink('../images/' + req.params.fileName, function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
      file.forEach(item => {
        if(item.fileName !== req.params.fileName){
          newFile.push(item)
        }
      })
      
    }
   
    console.log(newFile);
  }catch(error) {
      res.status(400).send(error.message);
  }
  
  
}



module.exports = {
    singleFileUpload,
    multipleFileUpload,
    getAllMultipleFiles,
    getAllSingleFiles,
    deleteSingleFile,
    deleteMultipleFile
}