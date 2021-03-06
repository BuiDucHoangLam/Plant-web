import React,{useState,useEffect} from 'react'
import Nav from '../../../component/Nav'
import OrdoForm from '../../../component/form/OrdoForm'
import { useSelector } from 'react-redux'
import { getGenus,updateGenus } from '../../../api/genus'
import { getOrdo,getListOrdo,getOrdoListFamilia } from '../../../api/ordo'
import { getFamilia,getListFamilia } from '../../../api/familia'
import { toast } from 'react-toastify'
import ImageUploadLocal from '../../../component/form/ImageUploadLocal'
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom'
import '../../../index.css'

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

const GenusEdit = ({history,match}) => {
  const [loading,setLoading] = useState(false)
  const [values,setValues] = useState(initialState)
  const [ordos,setOrdos] = useState([])

  const [familias,setFamilias] = useState([]) 
  const {t} = useTranslation()

  const {user} = useSelector(state => ({...state}))
  const {slug} = match.params

  const loadOrdos = () => {
    getListOrdo().then(res => {
      setOrdos(res.data)
      console.log(ordos);
    })
  }

  const loadFamilias = () => {
    getOrdoListFamilia(values.ordo).then(res => {
      setFamilias(res.data)
      console.log(ordos);
    })
  }

  const loadGenus = () => {
    getGenus(slug).then(res => {
      setValues({...values,...res.data})
   
    })
  }

  useEffect(() => {
    loadOrdos()
    loadGenus()
  },[])

  useEffect(() => {
    loadFamilias()

  },[values.ordo])

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    setValues(initialState)
  };

  const handleSubmit = e => {
    e.preventDefault()
    updateGenus(user.token,slug,values).then(res => {
      handleReset()
      console.log(res.data);
      toast.success(`C???p nh???t th??nh c??ng!`)
      setTimeout(() => history.push('/admin/genus'),2000)
    }).catch(err => {
      console.log(err);
      toast.success(`C???p nh???t th???t b???i!`)

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
          : <h3 style ={{textAlign:'center'}}>S???a chi</h3>
          }
          <div className='form-group select__parent'>
            <label>T??n b???</label>
            <select 
              name="ordo" 
              className='form-control'
              value = {values.ordo}
              onChange ={e => {
                setValues({...values,ordo:e.target.value})
                getOrdoListFamilia(e.target.value).then(res => {
                  console.log(res.data);
                  setFamilias(res.data)
                })
              }}
              // disabled
            >
              {ordos.length > 0 && ordos.map(o => {
                if(o._id === values.ordo) return <option value={o._id} key ={o._id}>{o.name}</option>
                return <option key={o._id} value={o._id}>{o.name}</option>
              })}

            </select>
          </div>
          

          <div className='form-group select__parent'>
            <label>T??n H???</label>
            <select 
              name="ordo" 
              className='form-control'
              value ={values.familia}
              onChange ={e => {
                setValues({...values,familia:e.target.value})
              }}
            >
              {familias && familias.map(f => {
                if(f._id === values.familia) return <option key={f._id} value={f._id}>{f.name}</option>
                return <option key={f._id} value={f._id}>{f.name}</option>
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
        </div>
      </div>
    </div>
  )
}

export default GenusEdit
