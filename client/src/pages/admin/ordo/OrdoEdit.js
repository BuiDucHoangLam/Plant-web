import React, { useEffect, useState } from 'react'
import {getOrdo,updateOrdo} from '../../../api/ordo'
import { useSelector } from 'react-redux';
import ImageUpload from '../../../component/form/ImageUpload'
import OrdoForm from '../../../component/form/OrdoForm';
import { toast } from 'react-toastify';
import Nav from '../../../component/Nav';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom'
import '../../../index.css'

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
    <div className="container-fluid bg-main" style ={{marginTop:'200px'}}>
      <div className = "row bg-child">
      <div className ="col-md-1 col__ml--2 l-0">
            <Nav />
          </div>
          <div className ="l-12 nav-admin__child">
            <ul >
              <li>
                <Link to="/admin/dashboard">{t('dashboard')}</Link>
              </li>
              
              <li>
                <Link to="/admin/ordo">{t('ordo')}</Link>
              </li>
              <li>
                <Link to="/admin/familia">{t('familia')}</Link>
              </li>
              <li>
                <Link to="/admin/genus">{t('genus')}</Link>
              </li>
              <li>
                <Link to="/admin/specie">{t('specie')}</Link>
              </li>
            
            </ul>
          </div>
        <div className = "col-md-11"> 
        <br />
          {loading 
          ? <h3 className='text'>Loading ...</h3> 
          : <h3 style ={{textAlign:'center'}}>Sửa bộ</h3>
          }
          <div className ='image-upload__div'>
            <ImageUpload
              values ={values}
              setLoading = {setLoading}
              setValues = {setValues}
              name = {t('chooseImageBackground')}
            />
          </div>
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
