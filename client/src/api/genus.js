import axios from 'axios'

export const getGenus = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/genus/${slug}`)
}

export const getGenusById = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API}/genus-id/${_id}`)
}

export const getListGenus = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/genus-list`)
}

export const createGenus = async (authtoken,genus) => {
  return await axios.post(`${process.env.REACT_APP_API}/genus`,genus,{
    headers:{
      authtoken,
    }
  })
}

export const deleteGenus = async (authtoken,slug) => {
  return await axios.delete(`${process.env.REACT_APP_API}/genus/${slug}`,{
    headers:{
      authtoken,
    }
  })
}

export const updateGenus = async (authtoken,slug,genus) => {
  return await axios.put(`${process.env.REACT_APP_API}/genus/${slug}`,genus,{
    headers:{
      authtoken,
    }
  })
}

export const getGenusListSpecies = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API}/genus/specie/${_id}`)

}