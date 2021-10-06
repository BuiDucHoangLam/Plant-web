import axios from 'axios'

export const getFamilia = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/familia/${slug}`)
}

export const getFamiliaById = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API}/familia-id/${_id}`)
}

export const getListFamilia = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/familias`)

}

export const createFamilia = async (authtoken,familia) => {
  return await axios.post(`${process.env.REACT_APP_API}/familia`,familia,{
    headers:{
      authtoken,
    }
  })
}

export const deleteFamilia = async (authtoken,slug) => {
  return await axios.delete(`${process.env.REACT_APP_API}/familia/${slug}`,{
    headers:{
      authtoken,
    }
  })
}

export const updateFamilia = async (authtoken,slug,familia) => {
  return await axios.put(`${process.env.REACT_APP_API}/familia/${slug}`,familia,{
    headers:{
      authtoken,
    }
  })
}

export const getFamiliaListGenus = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API}/familia/genus/${_id}`)

}