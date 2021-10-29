import React,{useEffect, useState} from 'react'
import { Carousel } from 'react-responsive-carousel'
import {getSpecie} from '../api/specie'
import GoogleMap from '../component/form/GoogleMap'
import { getOrdo,getOrdoById } from '../api/ordo'
import { getFamilia,getFamiliaById } from '../api/familia'
import { getGenus,getGenusById } from '../api/genus'
import {Link} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Cookies from 'js-cookie'
import image from '../images/image.png'

import '../css/styleDetail.css'
import '../css/style.css'
import '../css/bootstrap.min.css'
import '../css/responsive.css'
import '../index.css'
import '../css/carousel.css'

const DetailsRoot = ({match}) => {
  const [root,setRoot] = useState({})
  const [parent,setParent] = useState({})
  const cookie = Cookies.get('i18next')
  const {name,description,enDescription,distribution,enDistribution,value,enValue,images} = root
  const {slug,type} = match.params
  const {t} = useTranslation()

  const loadRoot = () => {
    if(type === 'ordo') 
      getOrdo(slug).then(res => {

        setRoot(res.data)
      })
    else if(type === 'familia')
      getFamilia(slug).then(res => {
        setRoot(res.data)
        getOrdoById(res.data.ordo).then(rs => setParent(rs.data))
      })
    else 
      getGenus(slug).then(res => {
        setRoot(res.data)
        getFamiliaById(res.data.familia).then(rs => setParent(rs.data))
      })
  }

  useEffect(() => {
    loadRoot()
   
  },[root])

  return (
   <div style={{marginTop: '120px',backgroundImage:`url(${image})`,paddingTop:'1px',paddingBottom:'1px'}}>
      <div className="main-layout plants__child" style = {{width:'75%',margin:'80px auto',backgroundColor:'white',borderRadius:'20px',background: 'rgba(255, 255, 255, .9)'}}>
      <div id="main-contener" style ={{margin:'20px'}}>
      <div class="titlepage" style ={{paddingTop:'20px'}}>
            <div className ='class-tt'>{t('infoDetails')}</div>
            <hr />
      
                  </div>
        <div className="intro-di">
          <div className="intro-details">
            <strong>{type === 'genus' ? t('genus')  : (type === 'familia') ?  t('familia') : t('ordo') } </strong> <br/>
            <div><em lang="la">{name}</em> </div>
            <br/>
            <br/>
            
            {type !== 'ordo' && <div>  {type === 'genus' ? t('familia') : (type === 'familia') ? t('ordo') : null}
            :<Link to={`/details-${type === 'genus' ? 'familia' : 'ordo'}/${parent.slug}`}> {parent.name} </Link>  </div>}
            <br />
         
            
          </div>

          {images && Object.values(images).flat().length 
            ? <Carousel 
              showArrows={true}
              autoPlay
              infiniteLoop
              className ='into-images'
            >
              {Object.values(images).flat().map(i => <img style={{width: '1000px',height: '350px'}} alt ={i.public_id} src ={i.url} key = {i.public_id}/>)}
              
            </Carousel>
            : <div>{t('noImage') } </div>}
        </div>
      </div>
      <div className ="nav-bar" style ={{marginTop:'220px',padding:'0 50px'}}>
        <ul className="nav-items">
          <li className="nav-li"><a href="#descriptions">{t('description') }</a></li>
          <li className="nav-li"><a href="#distribution-map">{t('distribution') }</a></li>
          <li className="nav-li"><a href="#value">{t('useValue') }</a></li>
        </ul>
      </div>
      <div id="descriptions" className="plants">
      <div className="container">
        <div className="row">
            <div className="col-md-12 ">
              <div className="titlepage">
              <div className ='class-tt'>{t('description')}</div>
                <hr />
              </div>
            </div>
        </div>
        <div className="description">
          <em>{cookie ==='vn' ? description : enDescription}</em>
        </div>
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
          <em>{cookie ==='vn' ? distribution : enDistribution}</em>
            
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
        
            <div className="c-article-section__content">
              <em>{cookie ==='vn' ? value : enValue}</em>
              
            </div>
       
        </div>

    </div>
  </div>
   </div>
    
  )
}

export default DetailsRoot
