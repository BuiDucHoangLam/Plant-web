import axios from 'axios'

export const getFamilia = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/familia/${slug}`)
}

export const getListFamilia = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/familias`)

}

export const createFamilia = async (authtoken,name,ordo) => {
  return await axios.post(`${process.env.REACT_APP_API}/familia`,{name,ordo},{
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

export const updateFamilia = async (authtoken,slug,name,ordo) => {
  return await axios.put(`${process.env.REACT_APP_API}/familia/${slug}`,{name,ordo},{
    headers:{
      authtoken,
    }
  })
}

export const getFamiliaListGenus = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API}/familia/genus/${_id}`)

}