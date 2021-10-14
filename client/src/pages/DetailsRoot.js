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

import '../css/styleDetail.css'
import '../css/style.css'
import '../css/bootstrap.min.css'
import '../css/responsive.css'
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

  // const loadParent = () => {
  //   if(type === 'genus') {
  //     getFamiliaById(root['familia']).then(res => {
  //       console.log('parent',res.data);
  //       setParent(res.data)    
  //     })
  //   }
  //   else {
  //     getOrdoById(root['ordo']).then(res => {
  //       console.log('parent',res.data);
  //       setParent(res.data)   
  //     })
  //   }  
  // }

  useEffect(() => {
    loadRoot()
   
  },[root])



  return (
    <div className="main-layout">
      <div id="main-contener">
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
      <div className ="nav-bar">
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
                  <h2>{t('description') }</h2>
              </div>
            </div>
        </div>
        <div className="description">
          <p>{cookie ==='vn' ? description : enDescription}</p>
        </div>
      </div>
      
      <div id="distribution-map" className="plants">
        <div className="container">
          <div className="row">
              <div className="col-md-12 ">
                <div className="titlepage">
                    <h2 >{t('distribution') }</h2>
                </div>
              </div>
          </div>
        </div>
        
        <div className="description">
          <p>{cookie ==='vn' ? distribution : enDistribution}</p>
            
        </div>
      </div>       

    </div>
    <div id="value" className="plants">
      <div className="container">
        <div className="row">
            <div className="col-md-12 ">
              <div className="titlepage">
                  <h2>{t('useValue') }</h2>
              </div>
            </div>
        </div>
      </div>
        <div className="description">
          <div className="row">
            <div className="c-article-section__content">
              <h3>{cookie ==='vn' ? value : enValue}</h3>
              
            </div>
          </div>
        </div>

    </div>
  </div>
    
  )
}

export default DetailsRoot
