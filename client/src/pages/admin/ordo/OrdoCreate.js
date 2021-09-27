import React,{useEffect, useState} from 'react'
import Nav from '../../../component/Nav'
import OrdoForm from '../../../component/form/OrdoForm'
import {createOrdo,getListOrdo,getOrdo,deleteOrdo} from '../../../api/ordo'
import LocalSearch from '../../../component/form/LocalSearch'
import { toast } from 'react-toastify'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const OrdoCreate = () => {
  const [name,setName] = useState('')
  const [loading,setLoading] = useState('')
  const [ordos,setOrdos] = useState([])

  // Search: step 1
  const [keyword,setKeyword] = useState('')

  const {user} = useSelector(state => ({...state}))


  const loadOrdos = () => {
    getListOrdo().then(res => setOrdos(res.data))
  }

  useEffect(() => {
    loadOrdos()
    
  },[])

  const handleRemove = async (slug) => {
    if(window.confirm(`Bạn thực sự muốn xóa Bộ ${slug}?`)) {
      setLoading(true)
      deleteOrdo(user.token,slug).then(res => {
        console.log(res);
        setLoading(false)
        toast.info(`Đã xóa bộ '${res.data.name}'`)
        loadOrdos()
      }).catch(err => {
        console.log('Delete ordo',err);
        toast.error(`Chưa thể xóa bộ '${err}'`)
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createOrdo(user.token,name).then(res => {
      console.log(res);
      setLoading(false)
      loadOrdos()
      toast.success(`Thêm bộ ${name} thành công!`)
    }).catch(err => {
      console.log(err);
      toast.error(`Không thể thêm bộ ${name}!`)
    })
  }

  const searched = keyword => category => {
    return category.name.toLowerCase().includes(keyword)
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
          : <h3 style ={{textAlign:'center'}}>Tạo Bộ mới</h3>
          }

          <OrdoForm 
            onSubmit = {handleSubmit}
            name = {name}
            change = {setName}
            functionality = 'Hoàn thành'
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
              {ordo.name}
            <span onClick ={()=>handleRemove(ordo.slug)} style={{float:'right'}} className="btn btn-sm float-right">
              <DeleteOutlined className="text-danger"/>
            </span> 
            
            <Link style={{float:'right'}} className="btn btn-sm float-right" to={`/admin/category/${ordo.slug}`}>
              <EditOutlined className="text-primary"/>
            </Link>
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default OrdoCreate
