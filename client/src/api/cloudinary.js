import axios from 'axios'

export const uploadImageCloudinary = async (authtoken,uri) => {
  return await axios.post(`${process.env.REACT_APP_API}/upload-image`,{image:uri},{
    headers:{
      authtoken
    }
  })
}

export const removeImageCloudinary = async (authtoken,id) => {
  return await axios.post(`${process.env.REACT_APP_API}/remove-image`,{id},{
    headers:{
      authtoken,
    }
  })
}