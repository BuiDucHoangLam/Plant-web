import axios from 'axios'

export const getOrdo = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/ordo/${slug}`)
}

export const getOrdoById = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API}/ordo-id/${_id}`)
}

export const getListOrdo = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/ordos`)
}

export const createOrdo = async (authtoken,ordo) => {
  return await axios.post(`${process.env.REACT_APP_API}/ordo`,ordo,{
    headers:{
      authtoken,
    }
  })
}

export const deleteOrdo = async (authtoken,slug) => {
  return await axios.delete(`${process.env.REACT_APP_API}/ordo/${slug}`,{
    headers:{
      authtoken,
    }
  })
}

export const updateOrdo = async (authtoken,slug,ordo) => {
  return await axios.put(`${process.env.REACT_APP_API}/ordo/${slug}`,ordo,{
    headers:{
      authtoken,
    }
  })
}

export const getOrdoListFamilia = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API}/ordo/familia/${_id}`)

}

export const getOrdoListGenus = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API}/ordo/genus/${_id}`)

}

export const getOrdoListSpecie = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API}/ordo/specie/${_id}`)

}