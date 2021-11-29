import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'

import '../css/style.css'
import '../css/bootstrap.min.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../css/responsive.css'
import { useTranslation } from 'react-i18next'
import { getSpecies } from '../api/specie'

import gyufyufyu from '../images/gyufyufyu.png'
import contactimg from '../images/contactimg.jpg'
import image5 from '../images/5.jpg'
import Bidens_flwr from '../images/hatkin/Bidens_flwr.jpg'
import unamamed from '../images/hattran/unnamed.jpg'
import reuunamamed from '../images/reu/unnamed.jpg'
import Ferns from '../images/duongxi/Ferns-systems-tracheophytes-leaves-water.jpg'

const Home = () => {
   const {t} = useTranslation()
   const [species,setSpecies] = useState([])

   useEffect(() => {
      getSpecies().then(res => setSpecies(res.data))
   },[])
   console.log('species',species);
  return (
    <div className = 'main-layout l-12'>
      <section className ='banner-main l-12'>
         <Carousel
           showArrows={true}
           autoPlay
           infiniteLoop
           showThumbs={false}
           id="main_slider" className="carousel slide" data-ride="carousel"
         >
               <div className="carousel-item active">
                  <div className="container">
                     <div className="row marginii">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 l-12">
                           <div className="carousel-caption ">
                              <h1>{t('welcome')} <strong className="color">Plants Dalat</strong></h1>
                              <p>{t('info1')}</p>
                             
                           
                              <a className="btn btn-lg btn-md btn-primary" href="/about" role="button">{t('about')}</a>
                              <a className="btn btn-lg btn-md btn-primary" href="/help" role="button">{t('help')}</a>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 l-12">
                           <div className="img-box">
                              <figure className="circleexam"><img src={gyufyufyu} alt="img"/></figure>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="carousel-item active">
                  <div className="container">
                     <div className="row marginii">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 l-12">
                        <div className="carousel-caption ">
                           <br />
                              <h1>{t('characteristics')}<strong className="color"> Plants Dalat</strong></h1>
                              <p>{t('info2')}</p>
                              
                              <a className="btn btn-lg btn-md btn-primary" href="/about" role="button">{t('about')}</a>
                              <a className="btn btn-lg btn-md btn-primary" href="/help" role="button">{t('help')}</a>
                           </div>
                           
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 l-12">
                           <div className="img-box">
                              <figure className="circleexam"><img src={image5} alt="img"/></figure>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="carousel-item active">
                  <div className="container">
                     <div className="row marginii">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 l-12">
                        <div className="carousel-caption ">
                              <h1>{t('purpose')}<strong className="color"> Plants Dalat</strong></h1>
                              <p>{t('info3')}</p>
                              
                              <a className="btn btn-lg btn-md btn-primary" href="/about" role="button">{t('about')}</a>
                              <a className="btn btn-lg btn-md btn-primary" href="/help" role="button">{t('help')}</a>
                           </div>
                           
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 l-12">
                           <div className="img-box">
                              <figure className="circleexam"><img src={Bidens_flwr} alt="img"/></figure>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
              
         </Carousel>
      </section>
        
     
      
      <div id="gallery" className="Gallery">
    
      
      <div className="container-fluid margin-r-l">
          { (species && species.length >= 4 && Object.values(species[0].images).flat()[0].url 
          && Object.values(species[1].images).flat()[0].url
          && Object.values(species[2].images).flat()[0].url
          && Object.values(species[3].images).flat()[0].url) && <div className="row">
            
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 thumb l-6">
               <div className="Gallery-box Gallery_g">
                  <figure>
                  `
                     <img src={`${process.env.REACT_APP_LOCAL}${Object.values(species[0].images).flat()[0].url}`} className="zoom img-fluid "  alt="" />
                     
                     <span className="hoverle">
                     <a href={`/details-specie/${species[0].slug}`} >
                     <b>{species[0].name}</b>
                     </a>
                     </span>  
                  </figure>
               </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 thumb l-6">
               <div className="Gallery-box Gallery_g">
                  <figure>
                     
                     <img src={`${process.env.REACT_APP_LOCAL}${Object.values(species[1].images).flat()[0].url}`} className="zoom img-fluid "  alt="" />
                     
                     <span className="hoverle">
                     <a href={`/details-specie/${species[1].slug}`} >
                     <b>{species[1].name}</b>
                     </a>
                     </span>  
                  </figure>
               </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 thumb l-6">
               <div className="Gallery-box Gallery_g">
                  <figure>
                     
                     <img src={`${process.env.REACT_APP_LOCAL}${Object.values(species[2].images).flat()[0].url}`} className="zoom img-fluid "  alt="" />
                     
                     <span className="hoverle">
                     <a href={`/details-specie/${species[2].slug}`} >
                     <b>{species[2].name}</b>
                     </a>
                     </span>  
                  </figure>
               </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 thumb l-6">
               <div className="Gallery-box Gallery_g">
                  <figure>
                     
                     <img src={`${process.env.REACT_APP_LOCAL}${Object.values(species[3].images).flat()[0].url}`} className="zoom img-fluid "  alt="" />
                     
                     <span className="hoverle">
                     <a href={`/details-specie/${species[3].slug}`} >
                     <b>{species[3].name}</b>
                     </a>
                     </span>  
                  </figure>
               </div>
            </div>
            
         </div>}
      </div>
    </div>
    </div>
  )
}

export default Home
