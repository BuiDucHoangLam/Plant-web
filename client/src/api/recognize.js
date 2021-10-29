import axios from "axios";



export const getResultRecognize = async (file) => {
  const data = new FormData()
  data.append('file',file)
  return await axios({
    method:"post",
    url:'https://plant-list-flask.herokuapp.com/predict',
    data:data,
    headers: { "Content-Type": "multipart/form-data" },
  })
}