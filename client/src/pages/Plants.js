import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getSpecies } from '../api/specie'
import { getListOrdo } from '../api/ordo'
import { getListFamilia } from '../api/familia'
import { getListGenus } from '../api/genus'
import PlantCard from '../component/form/PlantCard'
import image from '../images/image.png'
import ReactPaginate from 'react-paginate'

import '../index.css'
import '../css/responsive.css'

const Plants = () => {
  const {t} = useTranslation()
  const [species,setSpecies] = useState([])
  const [familias,setFamilias] = useState([])
  const [genusList,setGenusList] = useState([])
  const [ordos,setOrdos] = useState([])
  const [test,setTest] = useState([])
  const [pageNumber,setPageNumber] = useState(0)

  const plantsPerPage = 12
  const pagesVisited = pageNumber * plantsPerPage
  const pageSpecieCount = Math.ceil(species.length / plantsPerPage)
  const pageOrdoCount = Math.ceil(ordos.length / plantsPerPage)
  const pageFamiliaCount = Math.ceil(familias.length / plantsPerPage)
  const pageGenusCount = Math.ceil(genusList.length / plantsPerPage)



  const loadData = () => {
    getListOrdo().then(rsO => {
      setOrdos([...rsO.data.map(item => ({...item,type:'ordo'}))])
      getListFamilia().then(rsF => {
        setFamilias([...rsF.data.map(item => ({...item,type:'familia'}))])
        getListGenus().then(rsG => {
          setGenusList([...rsG.data.map(item => ({...item,type:'genus'}))])
          getSpecies().then(rsS => {
            setSpecies([...rsS.data.map(item => ({...item,type:'specie'}))])
          })
        })
      })
    })

  }


  useEffect(() => {
    loadData()
  },[])

  const changePage = ({selected}) => {
    setPageNumber(selected)
  }

  const tabs = document.querySelectorAll('.operations__tab');
  const tabsContainer = document.querySelector('.operations__tab-container');
  const tabsContent = document.querySelectorAll('.operations__content');

  const handleOperationClick = (e) => {
    const clicked = e.target.closest('.operations__tab');

    // Guard clause
    if (!clicked) return;
    else {
       // Remove active classes
       tabs.forEach(t => t.classList.remove('operations__tab--active'));
       tabsContent.forEach(c => c.classList.remove('operations__content--active'));

       // Activate tab
       clicked.classList.add('operations__tab--active');

       // Activate content area
       document
          .querySelector(`.operations__content--${clicked.dataset.tab}`)
          .classList.add('operations__content--active');
    }
    
 }

  return (
    <div style={{marginTop: '120px',backgroundImage:`url(${image})`,paddingTop:'1px',paddingBottom:'1px'}}>
      {/* <div className="main-layout" style ={{width:'80%',margin:'120px auto 0 auto',padding:'10px 0 50px 0',borderRadius:' 20px',opacity:'.94'}}> */}
       
        <div className = "row operations plants__child">
        <div class="titlepage" style ={{marginTop:"24px"}}>
            <div className ='class-tt'>{t('info')}</div>
            <hr style ={{width:'96%',marginLeft:'auto',marginRight:'auto'}}/>  
        </div>
          <div className ="col-md-2 l-12">
            <nav className ="nav-plants__child" style ={{margin:'50px 0 0 70px'}}>
              <div className = "nav flex-column operations__tab-container" onClick ={handleOperationClick}>
                <div className="row">
                <button className="mt-4 btn operations__tab operations__tab--1 operations__tab--active l-3" data-tab="1">
                  {t('ordo')}
                </button>
                
                <button className="mt-4 btn operations__tab operations__tab--2 l-3" data-tab="2">
                  {t('familia')}
                </button>
                <button className="mt-4 btn operations__tab operations__tab--3 l-3" data-tab="3">
                  {t('genus')}
                </button>
                <button className="mt-4 btn operations__tab operations__tab--4 l-3" data-tab="4">
                  {t('specie')}
                </button>
                </div>
                
              </div>
            </nav>
          </div>
          <div className="col-md-10">
              {ordos && ordos.length > 0 
                ? <div className ='operations__content operations__content--1 operations__content--active'>
                  <div className="row">
                    {ordos.slice(pagesVisited,pagesVisited+plantsPerPage).map(s => 
                        <div className='col-xl-4 col-lg-4 col-md-6 mt-4 l-6 item-plant__mobile' key ={s._id}>
                          <PlantCard 
                            specie = {s} 
                            key ={s._id}
                          />
                        </div>
                    )}
                    </div>
                    <br />
                    <br />
                    {pageOrdoCount > 1 && <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        pageCount={pageOrdoCount}
                        onPageChange = {changePage}
                        containerClassName = {'paginationBtn'}
                        previousLinkClassName={'previousBtn'}
                        nextLinkClassName = {'nextBtn'}
                        disabledClassName = {'paginationDisabled'}
                        activeClassName = {'paginationActive'}
                      />}
                  </div>
                :  <div className ='operations__content operations__content--1 operations__content--active'> Not have data yet </div>
              }

              {familias && familias.length > 0 
                ? <div className ='operations__content operations__content--2'>
                    <div className="row">
                      {familias.slice(pagesVisited,pagesVisited+plantsPerPage).map(s => 
                        <div className='col-xl-4 col-lg-4 col-md-6 mt-4 l-6 item-plant__mobile' key ={s._id}>
                          <PlantCard 
                            specie = {s} 
                            key ={s._id}
                          />
                        </div>
                      )}
                    </div>
                    <br />
                    <br />
                   {pageFamiliaCount > 1 && <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        pageCount={pageFamiliaCount}
                        onPageChange = {changePage}
                        containerClassName = {'paginationBtn'}
                        previousLinkClassName={'previousBtn'}
                        nextLinkClassName = {'nextBtn'}
                        disabledClassName = {'paginationDisabled'}
                        activeClassName = {'paginationActive'}
                      />}
                  </div>
                :  <div className ='operations__content operations__content--2'> Not have data yet </div>
              }

              {genusList && genusList.length > 0 
                ? <div className ='operations__content operations__content--3'>
                    <div className="row">
                      {genusList.slice(pagesVisited,pagesVisited+plantsPerPage).map(s => 
                        <div className='col-xl-4 col-lg-4 col-md-6 mt-4 l-6 item-plant__mobile' key ={s._id}>
                          <PlantCard 
                            specie = {s} 
                            key ={s._id}
                          />
                        </div>
                      )}
                    </div>
                    <br />
                    <br />
                    {pageGenusCount > 1 && <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        pageCount={pageGenusCount}
                        onPageChange = {changePage}
                        containerClassName = {'paginationBtn'}
                        previousLinkClassName={'previousBtn'}
                        nextLinkClassName = {'nextBtn'}
                        disabledClassName = {'paginationDisabled'}
                        activeClassName = {'paginationActive'}
                      />}
                  </div>
                :  <div className ='operations__content operations__content--3'> Not have data yet </div>
              }

              {species && species.length > 0 
                ? <div className ='operations__content operations__content--4'>
                    <div className="row">
                      {species.slice(pagesVisited,pagesVisited+plantsPerPage).map(s => 
                        <div className='col-xl-4 col-lg-4 col-md-6 mt-4 l-6 item-plant__mobile' key ={s._id}>
                          <PlantCard 
                            specie = {s} 
                            key ={s._id}
                          />
                        </div>
                      )}
                      </div> 
                       <br />
                        <br />
                      {pageSpecieCount > 1 && <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        pageCount={pageSpecieCount}
                        onPageChange = {changePage}
                        containerClassName = {'paginationBtn'}
                        previousLinkClassName={'previousBtn'}
                        nextLinkClassName = {'nextBtn'}
                        disabledClassName = {'paginationDisabled'}
                        activeClassName = {'paginationActive'}
                      />}
                    
                  </div>
                :  <div className ='operations__content operations__content--4'> Not have data yet </div>
              }
          </div>
        </div>
      {/* </div> */}
    </div>
  
  )
}

export default Plants
