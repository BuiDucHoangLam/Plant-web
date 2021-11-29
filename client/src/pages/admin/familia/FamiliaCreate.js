import React,{useEffect, useState} from 'react'
import Nav from '../../../component/Nav'
import OrdoForm from '../../../component/form/OrdoForm'
import {createFamilia,getFamilia,getListFamilia,deleteFamilia,getFamiliaListGenus} from '../../../api/familia'
import { singleFileRemove } from '../../../api/image'
import LocalSearch from '../../../component/form/LocalSearch'
import { getListOrdo } from '../../../api/ordo'
import { toast } from 'react-toastify'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getGenus } from '../../../api/genus'
import ImageUploadLocal from '../../../component/form/ImageUploadLocal'
import { useTranslation } from "react-i18next";
import '../../../index.css'

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
      setFamilia([...res.data.map(item => ({...item,type:'familia'}))])
      console.log(familias);
    })
  }

  useEffect(() => {
    loadFamilias()
    loadOrdos()
  },[])

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    setValues(initialState)
  };

  const handleRemove = async (slug) => {
    if(window.confirm(`${t('reallyDeleteFamilia')} ${slug}?`)) {
      
      getFamilia(slug).then(res => getFamiliaListGenus(res.data._id).then(rs => {
        if(rs.data && rs.data.length > 0) {
          toast.error(`${t('failDeleteFamilia')} ${t('because')} ${rs.data.length} ${t('genus')} ${t('children')}`)
          
        } else {
          getFamilia(slug).then(res => {
            if(res.data.images.length > 0) {
              res.data.images.map(item => singleFileRemove(item.fileName))
            }  
          })
          deleteFamilia(user.token,slug).then(res => {
            setLoading(true)
            console.log(res);
            setLoading(false)
            toast.info(`${t('successDeleteFamilia')} '${res.data.name}'`)
            loadFamilias()
          }).catch(err => {
            console.log('Delete ordo',err);
            toast.error(`${t('failDeleteFamilia')} '${err}'`)
          })
        }
      }))
      
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createFamilia(user.token,values).then(res => {
      console.log(res);
      setLoading(false)
      loadFamilias()
      toast.success(`Thêm họ ${values.name} thành công!`)
      handleReset()
      window.location.reload()
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
          : <h3 style ={{textAlign:'center'}}>{t('createFamilia')}</h3>
          }
          
          <div className='form-group select__parent'>
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
          <div className ='image-upload__div'>
            <ImageUploadLocal
              values ={values}
              setValues= {setValues}
              setLoading = {setLoading}
              name = {t('chooseImageBackground')}
            />
          </div>
          

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
              <Link to ={`/details-familia/${familia.slug}`}> {familia.name} </Link>   

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
