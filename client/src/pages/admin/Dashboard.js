import React, { useEffect, useState } from 'react'
import Nav from '../../component/Nav'
import { getSpecies,removeSpecie,getSpecie } from '../../api/specie'
import {singleFileRemove} from '../../api/image'
import SpecieCard from '../../component/form/SpecieCard'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import FileExplorer from '../../component/tree/FileExplorer'
import ReactPaginate from 'react-paginate'

import '../../index.css'
import '../../css/responsive.css'

const Dashboard = () => {
  const [species,setSpecies] = useState([])
  const [pageNumber,setPageNumber] = useState(0)
  
  const plantsPerPage = 12
  const pagesVisited = pageNumber * plantsPerPage
  const pageCount = Math.ceil(species.length / plantsPerPage)
  const {user} = useSelector(state => ({...state}))
  const {t} = useTranslation()

  const loadSpeciesList = () => {
    getSpecies().then(res => {
     
      setSpecies(res.data)
    })
  }

  const changePage = ({selected}) => {
    setPageNumber(selected)
  }

  useEffect(() => {
    loadSpeciesList()
  },[species])

  const handleRemove = (slug) => {
    if(window.confirm(`${t('reallyDeleteSpecie')} ${slug}?`)){
      getSpecie(slug).then(res => {
        if(res.data.images.imagesBackground.length > 0) {
          res.data.images.imagesBackground.map(item => singleFileRemove(item.fileName))
        } 
        if(res.data.images.imagesClove.length > 0) {
          res.data.images.imagesClove.map(item => singleFileRemove(item.fileName))
        } 
        if(res.data.images.imagesFlower.length > 0) {
          res.data.images.imagesFlower.map(item => singleFileRemove(item.fileName))
        } 
        if(res.data.images.imagesFruit.length > 0) {
          res.data.images.imagesFruit.map(item => singleFileRemove(item.fileName))
        } 
        if(res.data.images.imagesLeave.length > 0) {
          res.data.images.imagesLeave.map(item => singleFileRemove(item.fileName))
        } 
        if(res.data.images.imagesSeed.length > 0) {
          res.data.images.imagesSeed.map(item => singleFileRemove(item.fileName))
        } 
      })
      removeSpecie(user.token,slug).then(res => {
        console.log(res.data);
        loadSpeciesList()
        toast.info(`${t('successDeleteSpecie')} ${res.data.name}`)
      }).catch(err => {
        console.log('x??a lo??i',err);
        toast.error(`${'failDeleteSpecie'}`)
      })
    }
  }

  return (
    <div className="container-fluid bg-main" style ={{marginTop:'200px'}}>
    <div className = "row bg-child">
      <div className ="col-md-1 l-0">
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
      <div className="col-md-11 l-12 list-plant__mobile">
        <FileExplorer className ='explorer__phone-show'/>
        <h4 style ={{textAlign:'center'}}>{t('plans')}</h4>
        <div className="col">
          <div className="row">
          {species.slice(pagesVisited,pagesVisited+plantsPerPage).map(s => {
            return <div className='col-md-4 mt-4 l-6 item-plant__mobile' key ={s._id}>
              
                <SpecieCard 
                  specie = {s} 
                  key ={s._id}
                  handleRemove = {handleRemove}
                />
          
              </div>
          })}
          </div>
          {pageCount > 1 && <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount}
            onPageChange = {changePage}
            containerClassName = {'paginationBtn'}
            previousLinkClassName={'previousBtn'}
            nextLinkClassName = {'nextBtn'}
            disabledClassName = {'paginationDisabled'}
            activeClassName = {'paginationActive'}
          />}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Dashboard
