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

const FamiliaCreate = () => {
  const [name,setName] = useState('')
  const [loading,setLoading] = useState('')
  const [familias,setFamilia] = useState([])
  const [ordo,setOrdo] = useState('')
  const [ordos,setOrdos] = useState([])
  const [keyword,setKeyword] = useState('')

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
    if(window.confirm(`Bạn thực sự muốn xóa họ ${slug}?`)) {
      setLoading(true)
      deleteFamilia(user.token,slug).then(res => {
        console.log(res);
        setLoading(false)
        toast.info(`Đã xóa họ '${res.data.name}'`)
        loadFamilias()
      }).catch(err => {
        console.log('Delete ordo',err);
        toast.error(`Chưa thể xóa họ '${err}'`)
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createFamilia(user.token,name,ordo).then(res => {
      console.log(res);
      setLoading(false)
      loadFamilias()
      toast.success(`Thêm họ ${name} thành công!`)
    }).catch(err => {
      console.log(err);
      toast.error(`Không thể thêm họ ${name}!`)
    })
  }

  const search = (keyword) => familias => {
    return familias.name.toLowerCase().includes(keyword)
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
          : <h3 style ={{textAlign:'center'}}>Tạo họ mới</h3>
          }
          <div className='form-group'>
            <label>Tên bộ</label>
            <select 
              name="ordo" 
              className='form-control'
              onChange ={e => {
                setOrdo(e.target.value)
                console.log(ordo);
              }}
            >
              <option>Chọn tên bộ</option>
              {ordos.length > 0 && ordos.map(ordo => {
                return <option key={ordo._id} value={ordo._id}>{ordo.name}</option>
              })}

            </select>
          </div>
          <OrdoForm 
            onSubmit = {handleSubmit}
            name = {name}
            change = {setName}
            functionality = 'Hoàn thành'
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
            
            <Link style={{float:'right'}} className="btn btn-sm float-right" to={`/admin/category/${familia.slug}`}>
              <EditOutlined className="text-primary"/>
            </Link>
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default FamiliaCreate
