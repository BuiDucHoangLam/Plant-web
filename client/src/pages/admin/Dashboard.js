import React, { useEffect, useState } from 'react'
import Nav from '../../component/Nav'
import { getSpecies,removeSpecie } from '../../api/specie'
import SpecieCard from '../../component/form/SpecieCard'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const Dashboard = () => {
  const [species,setSpecies] = useState([])

  const {user} = useSelector(state => ({...state}))
  const {t} = useTranslation()

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
    if(window.confirm(`${t('reallyDeleteSpecie')} ${slug}?`)){
      removeSpecie(user.token,slug).then(res => {
        console.log(res.data);
        loadSpeciesList()
        toast.info(`${t('successDeleteSpecie')} ${res.data.name}`)
      }).catch(err => {
        console.log('xóa loài',err);
        toast.error(`${'failDeleteSpecie'}`)
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
        <h4>{t('plans')}</h4>
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
