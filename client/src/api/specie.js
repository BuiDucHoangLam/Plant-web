import axios from 'axios'

export const createSpecie = async (authtoken,specie) => {
  return await axios.post(`${process.env.REACT_APP_API}/specie`,specie,{
    headers:{
      authtoken,
    }
  })
}

export const getSpecies = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/species`)
}

export const getSpecie = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/specie/${slug}`)
}

export const removeSpecie = async (authtoken,slug) => {
  return await axios.delete(`${process.env.REACT_APP_API}/specie/${slug}`,{
    headers:{
      authtoken
    }
  })
}