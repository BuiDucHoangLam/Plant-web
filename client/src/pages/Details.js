import React, {  useEffect, useRef, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import {getSpecie} from '../api/specie'
import { getGenusById } from '../api/genus'
import GoogleMap from '../component/form/GoogleMap'
import {useTranslation} from 'react-i18next'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import {PDFDownloadLink,PDFViewer} from '@react-pdf/renderer'
import image from '../images/image.png'
import PlantDocument from '../component/pdf/PlantDocument'

import '../css/styleDetail.css'
import '../css/style.css'
import '../css/bootstrap.min.css'
import '../index.css'
import '../css/carousel.css'
import '../css/responsive.css'

import icon_background from '../images/icon_background.png'
import icon_flower from '../images/icon_flower.png'
import icon_clove from '../images/icon_clove.png'
import icon_fruit from '../images/icon_fruit.png'
import icon_leaf from '../images/icon_leaf.png'
import icon_seed from '../images/icon_seed.png'

const Details = ({match}) => {
 
   const [specie,setSpecie] = useState({images:[{url:''}],synonyms:[]})
   const [genus,setGenus] = useState({})
   const {t} = useTranslation()
  const {slug} = match.params
   const cookie = Cookies.get('i18next')
  const type = 'genus'

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
 
  useEffect(() => {
    const loadSpecie = () => getSpecie(slug).then(res => {
       setSpecie(res.data)
      
    }) 
  loadSpecie()
  },[slug]) 

  const loadGenus = () => {
      getGenusById(specie.genus).then(res => setGenus(res.data))
   }

   const showDownloadLink = (specie) => {
      return <PDFDownloadLink 
         document = {
            <PlantDocument specie = {specie} />
         }
         fileName ='plant.pdf'
         className ='btn btn-sm btn-block btn-outline-primary'
      >
          Download PDF
      </PDFDownloadLink>
   }

  useEffect(() => {
     loadGenus()
  },[specie])

  console.log('specie',specie);
  console.log(specie.coordinates);


  return (
    <div style={{marginTop: '120px',backgroundImage:`url(${image})`,paddingTop:'1px',paddingBottom:'1px'}}>
       <div className="main-layout plants__child" style = {{width:'75%',margin:'80px auto',backgroundColor:'white',borderRadius:'20px',background: 'rgba(255, 255, 255, .9)'}}>
      <div id="main-contener" style ={{margin:'20px'}}>
         <div className="titlepage" style ={{paddingTop:'20px'}}>
            <div className ='class-tt'>{t('infoDetails')}</div>
            <div >{showDownloadLink(specie)}</div>
            {/* style ={{position:'absolute',top:'30%',right:'0'}} */}
            <hr />
      
                  </div>
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
                  <br />
               <hr />
               <div className="operations">
                  <div className="operations__tab-container" onClick = {handleOperationClick}>
                     <button
                        className="btn operations__tab operations__tab--1 operations__tab--active"
                        data-tab="1"
                     >
                        <img style ={{height:'50px',width:'50px'}} src ={icon_background} alt='bg' />
                     </button>
                     <button className="btn operations__tab operations__tab--2" data-tab="2">
                     <img style ={{height:'50px',width:'50px'}} src ={icon_clove} alt='bg' />
                     </button>
                     <button className="btn operations__tab operations__tab--3" data-tab="3">
                     <img style ={{height:'50px',width:'50px'}} src ={icon_flower} alt='bg' />
                     </button>
                     <button className="btn operations__tab operations__tab--4" data-tab="4">
                     <img style ={{height:'50px',width:'50px'}} src ={icon_fruit} alt='bg' />
                     </button>
                     <button className="btn operations__tab operations__tab--5" data-tab="5">
                     <img style ={{height:'50px',width:'50px'}} src ={icon_leaf} alt='bg' />
                     </button>
                     <button className="btn operations__tab operations__tab--6" data-tab="6">
                     <img style ={{height:'50px',width:'50px'}} src ={icon_seed} alt='bg' />
                     </button>
                     
                  </div>
                  {specie.images['imagesBackground'] && specie.images['imagesBackground'].length > 0
                  ? <div className ='operations__content operations__content--1 operations__content--active'>
                     <Carousel 
                     showArrows={true}
                     autoPlay
                     infiniteLoop
                     className ='into-images'
                  >
                     {specie.images['imagesBackground'].map(i => <img style={{width: '1000px',height: '350px'}} alt ={i.public_id} src ={`${process.env.REACT_APP_LOCAL}${i.url}`} key = {i.public_id}/>)}
                     
                  </Carousel>
                  </div>
                  : <div className ='operations__content operations__content--1 operations__content--active'>{t('noImage')} </div>}

                  {specie.images['imagesClove'] && specie.images['imagesClove'].length > 0
                  ? <div className ='operations__content operations__content--2'>
                     <Carousel 
                     showArrows={true}
                     autoPlay
                     infiniteLoop
                     className ='into-images'
                  >
                     {specie.images['imagesClove'].map(i => <img style={{width: '1000px',height: '350px'}} alt ={i.public_id} src ={`${process.env.REACT_APP_LOCAL}${i.url}`} key = {i.public_id}/>)}
                     
                  </Carousel>
                  </div>
                  : <div className ='operations__content operations__content--2'>{t('noImage')} </div>}

                  {specie.images['imagesFlower'] && specie.images['imagesFlower'].length > 0
                  ? <div className ='operations__content operations__content--3'>
                     <Carousel 
                     showArrows={true}
                     autoPlay
                     infiniteLoop
                     className ='into-images'
                  >
                     {specie.images['imagesFlower'].map(i => <img style={{width: '1000px',height: '350px'}} alt ={i.public_id} src ={`${process.env.REACT_APP_LOCAL}${i.url}`} key = {i.public_id}/>)}
                     
                  </Carousel>
                  </div>
                  : <div className ='operations__content operations__content--3'>{t('noImage')} </div>}

                  {specie.images['imagesFruit'] && specie.images['imagesFruit'].length > 0
                  ? <div className ='operations__content operations__content--4'>
                     <Carousel 
                     showArrows={true}
                     autoPlay
                     infiniteLoop
                     className ='into-images'
                  >
                     {specie.images['imagesFruit'].map(i => <img style={{width: '1000px',height: '350px'}} alt ={i.public_id} src ={`${process.env.REACT_APP_LOCAL}${i.url}`} key = {i.public_id}/>)}
                     
                  </Carousel>
                  </div>
                  : <div className ='operations__content operations__content--4'>{t('noImage')} </div>}

                  {specie.images['imagesLeave'] && specie.images['imagesLeave'].length > 0
                  ? <div className ='operations__content operations__content--5'>
                     <Carousel 
                     showArrows={true}
                     autoPlay
                     infiniteLoop
                     className ='into-images'
                  >
                     {specie.images['imagesLeave'].map(i => <img style={{width: '1000px',height: '350px'}} alt ={i.public_id} src ={`${process.env.REACT_APP_LOCAL}${i.url}`} key = {i.public_id}/>)}
                     
                  </Carousel>
                  </div>
                  : <div className ='operations__content operations__content--5'>{t('noImage')} </div>}

                  {specie.images['imagesSeed'] && specie.images['imagesSeed'].length > 0
                  ? <div className ='operations__content operations__content--6'>
                     <Carousel 
                     showArrows={true}
                     autoPlay
                     infiniteLoop
                     className ='into-images'
                  >
                     {specie.images['imagesSeed'].map(i => <img style={{width: '1000px',height: '350px'}} alt ={i.public_id} src ={`${process.env.REACT_APP_LOCAL}${i.url}`} key = {i.public_id}/>)}
                     
                  </Carousel>
                  </div>
                  : <div className ='operations__content operations__content--6'>{t('noImage')} </div>}
               </div>

            
             </div>
         </div>
      </div>


  <div className ="nav-bar" style ={{marginTop:'500px',padding:'0 20px'}}>
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
          <div className="col-md-12 l-12">
             <div className="titlepage">
                <div className ='class-tt'>{t('description')}</div>
                <hr />
             </div>
          </div>
       </div>
    </div>
    <div className="description">
  
      <em>{cookie ==='vn' ? specie.description : specie.enDescription}</em>
  </div>
   
    
  </div>


  <div id="distribution-map" className="plants">
    <div className="container">
       <div className="row">
          <div className="col-md-12 ">
             <div className="titlepage">
                <div className ='class-tt'>{t('distribution')}</div>
                <hr />
             </div>
          </div>
       </div>
    </div>
    
    <div className="description">
      <em>{cookie ==='vn' ? specie.distribution : specie.enDistribution}</em>
         
    </div>
  </div>

 

  <div id="value" className="plants">
    <div className="container">
       <div className="row">
          <div className="col-md-12 ">
             <div className="titlepage">
                <div className ='class-tt'>{t('useValue')}</div>
                <hr />
             </div>
          </div>
       </div>
    </div>
      <div className="description">
        <div className="row">
          <div className="c-article-section__content">
            <em>{cookie ==='vn' ?  specie.value : specie.enValue}</em>
            
          </div>
        </div>
      </div>

  </div>

  
  <div id="sources" className="plants">
    <div className="container">
       <div className="row">
          <div className="col-md-12 ">
             <div className="titlepage">
                <div className ='class-tt'>{t('source')}</div>
                <hr />
             </div>
          </div>
       </div>
    </div>
      <div className="description">
        <div className="row">
          <em>{cookie ==='vn' ? specie.source : specie.enSource}</em>
        </div>
      </div>

  </div>
  
      
      <div style ={{padding:'20px'}}>
      {(specie.coordinates && specie.coordinates.length > 0) && <GoogleMap
         coordinates ={specie.coordinates}
         varClick = {true}
         
      />}
      </div>
   </div>
    </div>
  )
}

export default Details
