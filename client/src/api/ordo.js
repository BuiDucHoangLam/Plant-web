import axios from 'axios'

export const getOrdo = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/ordo/${slug}`)
}

export const getListOrdo = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/ordos`)

}

export const createOrdo = async (authtoken,name) => {
  return await axios.post(`${process.env.REACT_APP_API}/ordo`,{name},{
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

export const updateOrdo = async (authtoken,slug,name) => {
  return await axios.put(`${process.env.REACT_APP_API}/ordo/${slug}`,name,{
    headers:{
      authtoken,
    }
  })
}

export const getOrdoListFamilia = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API}/ordo/familia/${_id}`)

}