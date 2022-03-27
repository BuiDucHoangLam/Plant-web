import React from 'react'
import { singleFileUpload,singleFileRemove } from '../../api/image' 
import axios from 'axios'
import { Avatar,Badge } from 'antd'

const ImageUploadLocal = ({values,  setValues,  setLoading, name,handleReset}) => {

  const singleFileOptions = {
    onUploadProgress: (progressEvent) => {
        const {loaded, total} = progressEvent;
        const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000)); 
    }
  }

  const fileUploadAndResize = async (e) => {
    // resize
    const files = e.target.files
    const allUploadedFiles = values.images
    if(files) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
        await singleFileUpload(formData, singleFileOptions).then(res => {
          const item = {public_id:res.data._id,fileName:res.data.fileName,url:res.data.filePath}
          allUploadedFiles.push(item)
        })                   
        formData.delete('file')
      }
      setValues({...values,images:allUploadedFiles})
    }
  }

  const handleImageRemove = (fileName) => {
    setLoading(true)
    singleFileRemove(fileName)
    .then(res => {
      setLoading(false)
      const {images} = values
      const filteredImages = images.filter(img => {
        return img.fileName !== fileName 
      })

      setValues({...values,images:filteredImages})
    })
    .catch(err=> {
      console.log('Remove error',err);
      setLoading(false)

    })
  }
 
  return (
    <div>
      <div>
        {values.images && values.images.map(image => {
           
           return <Badge 
             className='m-3'
             key={image.public_id} 
             count='x' 
             onClick = {()=>handleImageRemove(image.fileName)}
             style={{cursor:'pointer'}}
           >
              <Avatar 
             key={image.public_id} 
             src={`${process.env.REACT_APP_LOCAL}${image.url}`}
             size={100}
             
             shape='square'
           />
           </Badge>
         })}
      </div>
      <label className='btn btn-primary btn-raised mb-3 '>
          {name}
          <input 
            type="file" 
            multiple 
            accept='images/*'
            onChange={fileUploadAndResize}
            hidden
            
          />
        </label>
    </div>
  )
}

export default ImageUploadLocal
