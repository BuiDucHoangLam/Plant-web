import React from 'react'
import Resizer from 'react-image-file-resizer'
import { singleFileUpload,multipleFilesUpload,getSingleFiles,singleFileRemove } from '../../api/image' 
import { useSelector } from 'react-redux'
import { Avatar,Badge } from 'antd'

const FileUploadLocal = ({values,  setValues,  setLoading, name,children}) => {

  const singleFileOptions = {
    onUploadProgress: (progressEvent) => {
        const {loaded, total} = progressEvent;
        const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000)); 
    }
  }

  const fileUploadAndResize = async (e) => {
    console.log(e.target.files);
    // resize
    const files = e.target.files
    const allUploadedFiles = values.images[children]
    console.log(allUploadedFiles);
    if(files) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
        await singleFileUpload(formData, singleFileOptions).then(res => {
          console.log(res.data._id,res.data.fileName,res.data.filePath);
          const item = {public_id:res.data._id,fileName:res.data.fileName,url:res.data.filePath}
          allUploadedFiles.push(item)
        })                   
        formData.delete('file')
      }
      setValues({...values,...values.images,children:[...allUploadedFiles]})
      
    }
  }
    

  const handleImageRemove = (fileName) => {
    setLoading(true)
    console.log('remove image',fileName);
    singleFileRemove(fileName)
    .then(res => {
      setLoading(false)
      const {images} = values
      const filteredImages = images[children].filter(img => {
        return img.fileName !== fileName 
      })

      setValues({...values,...images,...images[children] = filteredImages})
    })
    .catch(err=> {
      console.log('Remove error',err);
      setLoading(false)

    })
  }
 
  return (
    <div>
      <div>
        {values.images[children] && values.images[children].map(image => {
           
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
      <div>
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
    </div>
  )
}

export default FileUploadLocal