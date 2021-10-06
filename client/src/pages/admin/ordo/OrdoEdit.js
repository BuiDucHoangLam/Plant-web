import React, { useEffect, useState } from 'react'
import {getOrdo,updateOrdo} from '../../../api/ordo'
import { useSelector } from 'react-redux';
import ImageUpload from '../../../component/form/ImageUpload'
import OrdoForm from '../../../component/form/OrdoForm';
import { toast } from 'react-toastify';
import Nav from '../../../component/Nav';
import { useTranslation } from "react-i18next";

const initialValue = {
  name:'',
  distribution:'',
  description:'',
  enDistribution:'',
  enDescription:'',
  images:[],
  value:'',
  enValue:'',
}

const OrdoEdit = ({history,match}) => {
  const [loading,setLoading] = useState(false)
  const [values,setValues] = useState(initialValue)
  const {t} = useTranslation()
  const {user} = useSelector(state => ({...state}))
  const {slug} = match.params

  useEffect(() => {
    loadOrdo()
  },[])

  const loadOrdo = () => {
    getOrdo(slug).then(res => {
      setValues({...values,
        ...res.data
      })
      console.log(res.data); 
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    updateOrdo(user.token,slug,values).then(res => {
      console.log(res.data);
      toast.success(`Cập nhật thành công bộ với tên mới: ${values.name}`)
      setTimeout(() => history.push('/admin/ordo'),2000)
        
    }).catch(err => {
      console.log(err);
      toast.error(`Không thể cập nhật!`)
    })
  }

  const handleChange = e => {
    e.preventDefault()
    setValues({...values,[e.target.name]:e.target.value})
  }

  return (
    <div className="container-fluid" style ={{marginTop:'200px'}}>
      <div className = "row">
        <div className ="col-md-2">
          <Nav />
        </div>
        <div className = "col"> 
          {loading 
          ? <h3 className='text'>Loading ...</h3> 
          : <h3 style ={{textAlign:'center'}}>Sửa bộ</h3>
          }
          <ImageUpload
            values ={values}
            setLoading = {setLoading}
            setValues = {setValues}
            name = {t('chooseImageBackground')}
          />
          <OrdoForm 
            onSubmit = {handleSubmit}
            values = {values}
            change = {handleChange}
            functionality = 'Hoàn thành'
          />
        </div>
      </div>
    </div>
  )
}

export default OrdoEdit
