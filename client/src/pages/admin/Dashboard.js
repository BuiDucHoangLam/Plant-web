import React, { useEffect, useState } from 'react'
import Nav from '../../component/Nav'
import { getSpecies,removeSpecie } from '../../api/specie'
import SpecieCard from '../../component/form/SpecieCard'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

const Dashboard = () => {
  const [species,setSpecies] = useState([])

  const {user} = useSelector(state => ({...state}))

  const loadSpeciesList = () => {
    getSpecies().then(res => {
      console.log(res.data);
      setSpecies(res.data)
    })
  }

  useEffect(() => {
    loadSpeciesList()
  },[])

  const handleRemove = (slug) => {
    if(window.confirm(`Xác nhận xóa loài ${slug}?`)){
      removeSpecie(user.token,slug).then(res => {
        console.log(res.data);
        loadSpeciesList()
        toast.info(`Xóa thành công loài ${res.data.name}`)
      }).catch(err => {
        console.log('xóa loài',err);
        toast.error(`Không thể xóa`)
      })
    }
  }

  return (
    <div className="container-fluid" style ={{marginTop:'200px'}}>
    <div className = "row">
      <div className ="col-md-2">
        <Nav />
      </div>
      <div className="col-md-10">
        <h4>Các loài thực vật</h4>
        <div className="col">
          <div className="row">
          {species.map(s => {
            return <div className='col-md-4' key ={s._id}>
              
                  <SpecieCard 
                    specie = {s} 
                    key ={s._id}
                    handleRemove = {handleRemove}
                  />
          
              </div>
          })}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Dashboard
