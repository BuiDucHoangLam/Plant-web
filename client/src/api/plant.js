import axios from 'axios'

export const getPlants = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/plants`)
}

export const getPlantBySlug = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/plant/${slug}`)
}

export const createPlant = async (plant) => {
  return await axios.post(`${process.env.REACT_APP_API}/plants`,plant)
}

export const getPlantsFilter = async (arg) => {
  return await axios.post(`${process.env.REACT_APP_API}/search/filter`,arg)
}