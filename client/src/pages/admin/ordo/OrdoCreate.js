import React,{useEffect, useState} from 'react'
import Nav from '../../../component/Nav'
import OrdoForm from '../../../component/form/OrdoForm'
import {createOrdo,getListOrdo,getOrdo,deleteOrdo,getOrdoListFamilia} from '../../../api/ordo'
import LocalSearch from '../../../component/form/LocalSearch'
import ImageUpload from '../../../component/form/ImageUpload'
import { toast } from 'react-toastify'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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

const OrdoCreate = () => {
  const [values,setValues] = useState(initialValue)
  const [loading,setLoading] = useState('')
  const [ordos,setOrdos] = useState([])
  const [children,setChildren] = useState([])
  const {t} = useTranslation()

  // Search: step 1
  const [keyword,setKeyword] = useState('')

  const {user} = useSelector(state => ({...state}))


  const loadOrdos = () => {
    getListOrdo().then(res => setOrdos([...res.data.map(item => ({...item,type:'ordo'}))]))
  }

  useEffect(() => {
    loadOrdos()
    
  },[ordos])

  const handleRemove = async (slug) => {
    if(window.confirm(`${t('reallyDeleteOrdo')} ${slug}?`)) {
      getOrdo(slug).then(res => getOrdoListFamilia(res.data._id).then(rs => {
        console.log('data',rs.data.length,'type',typeof(rs.data));
        if(rs.data && rs.data.length > 0) {
        
          toast.error(`${t('failDeleteOrdo')} ${rs.data.length}`)
        
        } else{
            setLoading(true)
            deleteOrdo(user.token,slug).then(res => {
            console.log(res);
            setLoading(false)
            toast.info(`${t('successDeleteOrdo')} '${res.data.name}'`)
            loadOrdos()
          }).catch(err => {
            console.log('Delete ordo',err);
            toast.error(`${t('failDeleteOrdo')} '${err}'`)
          })
        }
        
      }))
      
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createOrdo(user.token,values).then(res => {
      console.log(res);
      setLoading(false)
      loadOrdos()
      toast.success(`Thêm bộ ${values.name} thành công!`)
    }).catch(err => {
      console.log(err);
      toast.error(`Không thể thêm bộ ${values.name}!`)
    })
  }

  const searched = keyword => ordos => {
    return ordos.name.toLowerCase().includes(keyword)
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
          : <h3 style ={{textAlign:'center'}}>{t('createOrdo')}</h3>
          }
          <ImageUpload 
            values ={values}
            setValues ={setValues}
            name = {t('chooseImageBackground')}
            setLoading = {setLoading}
          />
          <OrdoForm 
            onSubmit = {handleSubmit}
            values = {values}
            change = {handleChange}
            functionality = {t('complete')}
          />

          <br/>

          <LocalSearch 
            keyword ={keyword}
            setKeyword ={setKeyword}
          />

          {ordos.filter(searched(keyword)).map(ordo => 
            <div 
            className ="alert alert-secondary" 
            key ={ordo._id}>
             <Link to ={`/details-ordo/${ordo.slug}`}> {ordo.name} </Link>
            {/* <span>{(ordo.images && ordo.images.background) && <img style ={{height:'40px',width:'40px',float:'right'}} src = {ordo.images.background[0].url} key = {ordo.images.background[0].public_id} alt ={ordo.images.background[0].public_id}/>}</span> */}
            <span onClick ={()=>handleRemove(ordo.slug)} style={{float:'right'}} className="btn btn-sm float-right">
              <DeleteOutlined className="text-danger"/>
            </span> 
           
            <Link style={{float:'right'}} className="btn btn-sm float-right" to={`/admin/ordo/${ordo.slug}`}>
              <EditOutlined className="text-primary"/>
            </Link>
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default OrdoCreate
