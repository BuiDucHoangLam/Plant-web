import React,{useEffect, useState} from 'react'
import Nav from '../../../component/Nav'
import OrdoForm from '../../../component/form/OrdoForm'
import {getFamilia,getListFamilia} from '../../../api/familia'
import {getListGenus,getGenus,deleteGenus, createGenus} from '../../../api/genus'
import LocalSearch from '../../../component/form/LocalSearch'
import { getListOrdo,getOrdo,getOrdoListFamilia } from '../../../api/ordo'
import { toast } from 'react-toastify'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ImageUpload from '../../../component/form/ImageUpload'
import { useTranslation } from "react-i18next";

const initialState = {
  name:'',
  ordo:'',
  familia:'',
  distribution:'',
  description:'',
  images:[],
  value:'',
  enDistribution:'',
  enDescription:'',
  enValue:'',
}

const GenusCreate = () => {
  const [values,setValues] = useState(initialState)
  const [loading,setLoading] = useState('')
  const [familias,setFamilias] = useState([])
  const [ordos,setOrdos] = useState([])
  const [genusList,setGenusList] = useState([])
  const {t} = useTranslation()

  const [keyword,setKeyword] = useState('')

  const {user} = useSelector(state => ({...state}))

  const loadOrdos = () => [
    getListOrdo().then(res => {
      setOrdos(res.data)
      console.log(ordos);
    })
  ]

  const loadGenusList = () => {
    getListGenus().then(res => {
      setGenusList(res.data)
      console.log(genusList);
    })
  }

  useEffect(() => {
    loadOrdos()
    loadGenusList()
  },[])

  const handleRemove = async (slug) => {
    if(window.confirm(`${t('reallyDeleteGenus')} ${slug}?`)) {
      setLoading(true)
      deleteGenus(user.token,slug).then(res => {
        console.log(res);
        setLoading(false)
        toast.info(`${t('successDeleteGenus')} '${res.data.name}'`)
        loadGenusList()
      }).catch(err => {
        console.log('Delete genus',err);
        toast.error(`${t('failDeleteGenus')} '${err}'`)
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createGenus(user.token,values).then(res => {
      console.log(res);
      setLoading(false)
      loadGenusList()
      toast.success(`Thêm chi ${values.name} thành công!`)
    }).catch(err => {
      console.log(err);
      // toast.error(`Không thể thêm chi ${values.name}!`)
      if(err.response.status === 400){
        setLoading(false)
        toast.error(err.message.data)
      }
    })
  }

  const search = (keyword) => genus => {
    return genus.name.toLowerCase().includes(keyword)
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
          : <h3 style ={{textAlign:'center'}}>{t('createGenus')}</h3>
          }
          <div className='form-group'>
            <label>{t('ordo')}</label>
            <select 
              name="ordo" 
              className='form-control'
              onChange ={e => {
                setValues({...values,ordo:e.target.value})
                getOrdoListFamilia(e.target.value).then(res => {
                  console.log(res.data);
                  setFamilias(res.data)
                })
              }}
              // disabled
            >
              <option>{t('chooseOrdo')}</option>
              {ordos.length > 0 && ordos.map(ordo => {
                return <option key={ordo._id} value={ordo._id}>{ordo.name}</option>
              })}

            </select>
          </div>
          

          <div className='form-group'>
            <label>{t('familia')}</label>
            <select 
              name="familia" 
              className='form-control'
              onChange ={e => {
                setValues({...values,familia:e.target.value})
              }}
            >
              <option>{t('chooseFamilia')}</option>
              {familias.length > 0 && familias.map(f => {
                return <option key={f._id} value={f._id}>{f.name}</option>
              })}

            </select>
          </div>
          {/* <label>Tên bộ</label>
          <input 
            name='ordo'
            type='text' 
            className='form-control' 
            value={ordo} 
            onChange={setOrdo(ordos.find(({_id}) => _id === familia.ordo).name)}
            placeholder="Điều chỉnh Họ để xem Bộ"
            autoFocus
            required
            disabled
          /> */}
          <ImageUpload
            values ={values}
            setValues= {setValues}
            setLoading = {setLoading}
            name = {t('chooseImageBackground')}
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
          {genusList.filter(search(keyword)).map(genus => 
            <div 
            className ="alert alert-secondary" 
            key ={genus._id}>
              {genus.name}
            <span onClick ={()=>handleRemove(genus.slug)} style={{float:'right'}} className="btn btn-sm float-right">
              <DeleteOutlined className="text-danger"/>
            </span> 
            
            <Link style={{float:'right'}} className="btn btn-sm float-right" to={`/admin/genus/${genus.slug}`}>
              <EditOutlined className="text-primary"/>
            </Link>
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default GenusCreate
