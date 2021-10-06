import React,{useState,useEffect} from 'react'
import Nav from '../../../component/Nav'
import OrdoForm from '../../../component/form/OrdoForm'
import { useSelector } from 'react-redux'
import { getGenus,updateGenus } from '../../../api/genus'
import { getOrdo,getListOrdo,getOrdoListFamilia } from '../../../api/ordo'
import { getFamilia,getListFamilia } from '../../../api/familia'
import { toast } from 'react-toastify'
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

  const handleSubmit = e => {
    e.preventDefault()
    updateGenus(user.token,slug,values).then(res => {
      console.log(res.data);
      toast.success(`Cập nhật thành công!`)
      setTimeout(() => history.push('/admin/genus'),2000)
    }).catch(err => {
      console.log(err);
      toast.success(`Cập nhật thất bại!`)

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
          : <h3 style ={{textAlign:'center'}}>Sửa chi</h3>
          }
          <div className='form-group'>
            <label>Tên bộ</label>
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
          

          <div className='form-group'>
            <label>Tên Họ</label>
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
        </div>
      </div>
    </div>
  )
}

export default GenusEdit
