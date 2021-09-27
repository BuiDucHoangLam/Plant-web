import axios from "axios";

export const getResultSearch = async () => {
  return await axios.get('http://localhost:5000/upload-image')
}