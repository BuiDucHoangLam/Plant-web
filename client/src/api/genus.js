import axios from 'axios'

export const getGenus = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/genus/${slug}`)
}

export const getListGenus = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/genus-list`)

}

export const createGenus = async (authtoken,name,ordo,familia) => {
  return await axios.post(`${process.env.REACT_APP_API}/genus`,{name,ordo,familia},{
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

export const updateGenus = async (authtoken,slug,name,ordo,familia) => {
  return await axios.put(`${process.env.REACT_APP_API}/Genus/${slug}`,{name,ordo,familia},{
    headers:{
      authtoken,
    }
  })
}
