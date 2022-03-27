import React from 'react'
import Resizer from 'react-image-file-resizer'
import {removeImageCloudinary} from '../../api/cloudinary'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Avatar,Badge } from 'antd'

const ImageUpload = ({values,  setValues,  setLoading, name}) => {

  const {user} = useSelector(state => ({...state}))
  
  const fileUploadAndResize = (e) => {
    // resize
    const files = e.target.files
    const allUploadedFiles = values.images
    if(files) {
      for(let i = 0;i < files.length;i++){
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            axios.post(`${process.env.REACT_APP_API}/upload-image`,
            {image:uri},
            {
              headers: {
                authtoken:user ? user.token : '',
              },
            }).then(res => {
              setLoading(false)
              allUploadedFiles.push(res.data)
              setValues({...values,images:allUploadedFiles})
            }).catch(err => {
              setLoading(false)
            })
        },'base64')
      }
    }
    // send back to server to upload to cloudinary

    // set url to images[] in the parent component - ProductCreate
  }

  const handleImageRemove = (id) => {
    setLoading(true)
    removeImageCloudinary(user.token,id)
    .then(res => {
      setLoading(false)
      const {images} = values
      const filteredImages = images.filter(img => {
        return img.public_id !== id 
      })

      setValues({...values,images:filteredImages})
    })
    .catch(err=> {
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
            onClick = {()=>handleImageRemove(image.public_id)}
            style={{cursor:'pointer'}}
          >
             <Avatar 
            key={image.public_id} 
            src={image.url}
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

export default ImageUpload
