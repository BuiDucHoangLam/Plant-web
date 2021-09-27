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

const GenusCreate = () => {
  const [name,setName] = useState('')
  const [loading,setLoading] = useState('')
  const [familias,setFamilias] = useState([])
  const [familia,setFamilia] = useState('')
  const [ordos,setOrdos] = useState([])
  const [ordo,setOrdo] = useState('Chưa có')
  const [genusList,setGenusList] = useState([])

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
    if(window.confirm(`Bạn thực sự muốn xóa chi ${slug}?`)) {
      setLoading(true)
      deleteGenus(user.token,slug).then(res => {
        console.log(res);
        setLoading(false)
        toast.info(`Đã xóa chi '${res.data.name}'`)
        loadGenusList()
      }).catch(err => {
        console.log('Delete genus',err);
        toast.error(`Chưa thể xóa chi '${err}'`)
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createGenus(user.token,name,ordo,familia).then(res => {
      console.log(res);
      setLoading(false)
      loadGenusList()
      toast.success(`Thêm chi ${name} thành công!`)
    }).catch(err => {
      console.log(err);
      toast.error(`Không thể thêm chi ${name}!`)
    })
  }

  const search = (keyword) => genus => {
    return genus.name.toLowerCase().includes(keyword)
  }

  const handleChange = e => {
    setFamilia(e.target.value)
    // if(familia) setOrdo(ordos.find(({_id}) => _id === familia.ordo).name)
    console.log(familia);
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
          : <h3 style ={{textAlign:'center'}}>Tạo chi mới</h3>
          }
          <div className='form-group'>
            <label>Tên bộ</label>
            <select 
              name="ordo" 
              className='form-control'
              onChange ={e => {
                setOrdo(e.target.value)
                getOrdoListFamilia(e.target.value).then(res => {
                  console.log(res.data);
                  setFamilias(res.data)
                })
              }}
              // disabled
            >
              <option>Chọn tên bộ</option>
              {ordos.length > 0 && ordos.map(ordo => {
                return <option key={ordo._id} value={ordo._id}>{ordo.name}</option>
              })}

            </select>
          </div>
          

          <div className='form-group'>
            <label>Tên Họ</label>
            <select 
              name="ordo" 
              className='form-control'
              onChange ={e => {
                setFamilia(e.target.value)
              }}
            >
              <option>Chọn tên họ</option>
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
          {genusList.filter(search(keyword)).map(genus => 
            <div 
            className ="alert alert-secondary" 
            key ={genus._id}>
              {genus.name}
            <span onClick ={()=>handleRemove(genus.slug)} style={{float:'right'}} className="btn btn-sm float-right">
              <DeleteOutlined className="text-danger"/>
            </span> 
            
            <Link style={{float:'right'}} className="btn btn-sm float-right" to={`/admin/category/${genus.slug}`}>
              <EditOutlined className="text-primary"/>
            </Link>
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default GenusCreate
