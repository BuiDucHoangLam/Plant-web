import React,{useEffect, useState} from 'react'
import Nav from '../../../component/Nav'
import OrdoForm from '../../../component/form/OrdoForm'
import {createFamilia,getFamilia,getListFamilia,deleteFamilia} from '../../../api/familia'
import LocalSearch from '../../../component/form/LocalSearch'
import { getListOrdo } from '../../../api/ordo'
import { toast } from 'react-toastify'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getGenus } from '../../../api/genus'
import ImageUpload from '../../../component/form/ImageUpload'
import { useTranslation } from "react-i18next";

const initialState = {
  name:'',
  ordo:'',
  distribution:'',
  description:'',
  images:[],
  value:'',
  enDistribution:'',
  enDescription:'',
  enValue:'',
}

const FamiliaCreate = () => {
  const [values,setValues] = useState(initialState)
  const [loading,setLoading] = useState('')
  const [familias,setFamilia] = useState([])
  const [ordo,setOrdo] = useState('')
  const [ordos,setOrdos] = useState([])
  const [keyword,setKeyword] = useState('')
  const {t} = useTranslation()

  const {user} = useSelector(state => ({...state}))

  const loadOrdos = () => {
    getListOrdo().then(res => {
      setOrdos(res.data)
      console.log(ordos);
    })
  }

  const loadFamilias = () => {
    getListFamilia().then(res => {
      setFamilia(res.data)
      console.log(familias);
    })
  }

  useEffect(() => {
    loadFamilias()
    loadOrdos()
  },[])

  const handleRemove = async (slug) => {
    if(window.confirm(`${t('reallyDeleteFamilia')} ${slug}?`)) {
      setLoading(true)
      deleteFamilia(user.token,slug).then(res => {
        console.log(res);
        setLoading(false)
        toast.info(`${t('successDeleteFamilia')} '${res.data.name}'`)
        loadFamilias()
      }).catch(err => {
        console.log('Delete ordo',err);
        toast.error(`${t('failDeleteFamilia')} '${err}'`)
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createFamilia(user.token,values).then(res => {
      console.log(res);
      setLoading(false)
      loadFamilias()
      toast.success(`Thêm họ ${values.name} thành công!`)
    }).catch(err => {
      console.log(err);
      toast.error(`Không thể thêm họ ${values.name}!`)
    })
  }

  const search = (keyword) => familias => {
    return familias.name.toLowerCase().includes(keyword)
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
          : <h3 style ={{textAlign:'center'}}>{t('createFamilia')}</h3>
          }
          <div className='form-group'>
            <label>{t('ordo')}</label>
            <select 
              name="ordo" 
              className='form-control'
              onChange ={e => {
                setValues({...values,ordo:e.target.value})
                console.log(values.ordo);
              }}
            >
              <option>{t('chooseOrdo')}</option>
              {ordos.length > 0 && ordos.map(ordo => {
                return <option key={ordo._id} value={ordo._id}>{ordo.name}</option>
              })}

            </select>
          </div>
          <ImageUpload
            values ={values}
            setValues= {setValues}
            setLoading = {setLoading}
            name = {t('chooseImageFlower')}
          />
          <OrdoForm 
            onSubmit = {handleSubmit}
            values = {values}
            change = {handleChange}
            functionality = {t('complete')}
          />

          <LocalSearch
            keyword ={keyword}
            setKeyword = {setKeyword}
          />
          {familias.filter(search(keyword)).map(familia => 
            <div 
            className ="alert alert-secondary" 
            key ={familia._id}>
              {/* {familia.name} thuộc bộ {ordos.find(({_id}) => _id === familia.ordo).name  } */}
              {familia.name}   

            <span onClick ={()=>handleRemove(familia.slug)} style={{float:'right'}} className="btn btn-sm float-right">
              <DeleteOutlined className="text-danger"/>
            </span> 
            
            <Link style={{float:'right'}} className="btn btn-sm float-right" to={`/admin/familia/${familia.slug}`}>
              <EditOutlined className="text-primary"/>
            </Link>
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default FamiliaCreate
