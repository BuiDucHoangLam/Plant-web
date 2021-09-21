import React, { useState } from 'react'
import ProductCreateForm from '../component/ProductCreateForm'
import FileUpload from '../component/FileUpload'
import { createPlant } from '../api/plant'

const initialState = {
  name:'Hoa hồng',
  images:[],
  family:'hồng',
  genus:'hồng trắng, hồng Beauvais, hồng California, tầm xuân, hồng, hường, nguyệt quý hoa, hồng Trung Hoa, ...',
  description:'Đây là các cây bụi mọc đứng hoặc mọc leo, thân và cành có gai. Lá kép lông chim lẻ, lá chét khía răng, có lá kèm. Hoa thơm, màu sắc đa dạng: hồng, trắng, vàng hay đỏ... Hoa thường có nhiều cánh do nhị đực biến thành. Đế hoa hình chén. Quả bế, tụ nhau trong đế hoa tôn dày lên thành quả.',
  distribution:'Hồng hay hường là tên gọi chung cho các loài thực vật có hoa dạng cây bụi hoặc cây leo lâu năm thuộc chi Rosa, họ Rosaceae, với hơn 100 loài với màu hoa đa dạng, phân bố từ miền ôn đới đến nhiệt đới. Các loài này nổi tiếng vì hoa đẹp nên thường gọi là hoa hồng. Phần lớn có nguồn gốc bản địa châu Á, số ít còn lại có nguồn gốc bản địa châu Âu, Bắc Mỹ, và Tây Bắc Phi. Các loài bản địa, giống cây trồng và cây lai ghép đều được trồng làm cảnh và lấy hương thơm.[1] Đôi khi các loài này được gọi là tường vi.',
  synonyms:'tường vi.',
  otherData:'alo',
  bibliography:'bibliography',
  source:'source',
  relatives:'Relatives',

}

const CreatePlant = () => {
  const [values,setValues] = useState(initialState)
  const [loading,setLoading] = useState(false)

  const handleChange = e => {
    setValues({...values,[e.target.name]:e.target.value})
    console.log(values);
  }

  const handleSubmit = e => {
    e.preventDefault()
    createPlant(values).then(res => {
      console.log(res);
      window.alert(`${res.data.title} has been created!`)
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      
        <FileUpload 
          
          values={values} 
          setValues={setValues}
          setLoading={setLoading}
        />
      {JSON.stringify(values.images)}
      <ProductCreateForm

        handleChange={handleChange}
        handleSubmit = {handleSubmit}
        values = {values}
      />
    </div>
  )
}

export default CreatePlant
