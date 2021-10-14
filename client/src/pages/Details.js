import React, {  useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import {getSpecie} from '../api/specie'
import { getGenusById } from '../api/genus'
import GoogleMap from '../component/form/GoogleMap'
import {useTranslation} from 'react-i18next'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

import '../css/styleDetail.css'
import '../css/style.css'
import '../css/bootstrap.min.css'

import '../css/carousel.css'

import plant1 from '../images/plant1.jpg'
import plant2 from '../images/plant2.jpg'
import plant3 from '../images/plant3.jpg'


const Details = ({match}) => {
  const [plant,setPlant] = useState({images:[{url:''}],synonyms:[]})
   const [specie,setSpecie] = useState({images:[{url:''}],synonyms:[]})
   const [genus,setGenus] = useState({})
   const {t} = useTranslation()
  const {slug} = match.params
   const cookie = Cookies.get('i18next')
  const type = 'genus'
 
  useEffect(() => {
    const loadSpecie = () => getSpecie(slug).then(res => {
       setSpecie(res.data)
      
    }) 
  loadSpecie()
  },[slug]) 

  const loadGenus = () => {
      getGenusById(specie.genus).then(res => setGenus(res.data))
   }

  useEffect(() => {
     loadGenus()
  },[specie])

  console.log('specie',specie);
  console.log('genus',genus);

  return (
    <div className="main-layout">
      <div id="main-contener">
    
   <div className="intro-di">
      <div className="intro-details">
         <strong>{t('vnName')}: </strong> <br/>
         <div><em lang="la">{cookie ==='vn' ? specie.vnName : specie.enName}</em> </div>
         <br/>
         <br/>
         <strong>{t('specie')}: </strong> <br/>
         <div href="/"><em lang="la">{cookie ==='vn' ? specie.vnName : specie.enName}</em>   </div>  
         <div> {t('dependencyGenus')}: <Link to ={`/details-${type}/${genus.slug}`}> {genus.name} </Link> </div>
         <br />
         <br />
         {(specie.synonyms && specie.synonyms.length > 0) && 
         <div> <strong>{t('synonyms')} </strong> <br/>
         <div style={{paddingRight: '1em'}}>{t('have')} {specie.synonyms.length} {t('synonyms')} </div>
         {specie.synonyms.map(s => <div key ={s}>{s}</div>)} </div>}
      </div>

      {specie.images && Object.values(specie.images).flat().length 
        ? <Carousel 
          showArrows={true}
          autoPlay
          infiniteLoop
          className ='into-images'
        >
           {Object.values(specie.images).flat().map(i => <img style={{width: '1000px',height: '350px'}} alt ={i.public_id} src ={i.url} key = {i.public_id}/>)}
          
        </Carousel>
        : <div>{t('noImage')} </div>}
</div>
</div>


  <div className ="nav-bar">
    <ul className="nav-items">
        
      <li className="nav-li"><a href="#descriptions">{t('description')}</a></li>
      <li className="nav-li"><a href="#distribution-map">{t('distribution')}</a></li>
      <li className="nav-li"><a href="#value">{t('useValue')}</a></li>
      <li className="nav-li"><a href="#sources">{t('source')}</a></li>
    </ul>
</div>


  <div id="descriptions" className="plants">
    <div className="container">
       <div className="row">
          <div className="col-md-12 ">
             <div className="titlepage">
                <h2>{t('description')}</h2>
             </div>
          </div>
       </div>
    </div>
    <div className="description">
  
      <p>{cookie ==='vn' ? specie.description : specie.enDescription}</p>
  </div>
   
    
  </div>


  <div id="distribution-map" className="plants">
    <div className="container">
       <div className="row">
          <div className="col-md-12 ">
             <div className="titlepage">
                <h2 >{t('distribution')}</h2>
             </div>
          </div>
       </div>
    </div>
    
    <div className="description">
      <p>{cookie ==='vn' ? specie.distribution : specie.enDistribution}</p>
         
    </div>
  </div>

 

  <div id="value" className="plants">
    <div className="container">
       <div className="row">
          <div className="col-md-12 ">
             <div className="titlepage">
                <h2>{t('useValue')}</h2>
             </div>
          </div>
       </div>
    </div>
      <div className="description">
        <div className="row">
          <div className="c-article-section__content">
            <h3>{cookie ==='vn' ?  specie.value : specie.enValue}</h3>
            
          </div>
        </div>
      </div>

  </div>

  
  <div id="sources" className="plants">
    <div className="container">
       <div className="row">
          <div className="col-md-12 ">
             <div className="titlepage">
                <h2>{t('source')}</h2>
             </div>
          </div>
       </div>
    </div>
      <div className="description">
        <div className="row">
          {cookie ==='vn' ? specie.source : specie.enSource}
        </div>
      </div>

  </div>
  
      
      {(specie.coordinates && specie.coordinates.length > 0) && <GoogleMap
         coordinates ={specie.coordinates}
      />}
   </div>
  )
}

export default Details
