import axios from 'axios'

export const singleFileUpload = async (data, options) => {
  try {
    return await axios.post(`${process.env.REACT_APP_API}/upload-single`,data, options)
  } catch (error) {
    throw error;
  }
}

export const singleFileRemove = async (fileName) => {
  try {
    return await axios.delete(`${process.env.REACT_APP_API}/upload-single/${fileName}`)
  } catch (error) {
    throw error;
  }
}

export const getSingleFiles = async () => {
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_API}/single-files`)
    return data;
  } catch (error) {
      throw error;
  }
}

export const multipleFilesUpload = async (data, options) => {
  try {
      await axios.post(`${process.env.REACT_APP_API}/upload-multiple`, data, options);
  } catch (error) {
      throw error;
  }
}
export const getMultipleFiles = async () => {
  try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/multiple-files`);
      return data;
  }catch(error){
      throw error;
  }
}