import React,{useEffect, useState} from 'react'
import { Carousel } from 'react-responsive-carousel'
import {getSpecie} from '../api/specie'
import GoogleMap from '../component/form/GoogleMap'
import { getOrdo,getOrdoById } from '../api/ordo'
import { getFamilia,getFamiliaById } from '../api/familia'
import { getGenus,getGenusById } from '../api/genus'
import {Link} from 'react-router-dom'

import '../css/styleDetail.css'
import '../css/style.css'
import '../css/bootstrap.min.css'
import '../css/responsive.css'
import '../css/carousel.css'

const DetailsRoot = ({match}) => {
  const [root,setRoot] = useState({})
  const [parent,setParent] = useState({})
  
  const {name,description,enDescription,distribution,enDistribution,value,enValue,images} = root
  const {slug,type} = match.params
 
  console.log(match.params);

  const loadRoot = () => {
    if(type === 'ordo') 
      getOrdo(slug).then(res => {
        console.log('data',res.data);
        console.log('type',typeof(res.data));
        setRoot(res.data)
      })
    else if(type === 'familia')
      getFamilia(slug).then(res => setRoot(res.data))
    else 
      getGenus(slug).then(res => setRoot(res.data))
  }

  const loadParent = () => {
    if(type === 'genus') {
      getFamiliaById(root['familia']).then(res => {
        console.log('parent',res.data);
        setParent(res.data)    
      })
    }
    else {
      getOrdoById(root['ordo']).then(res => {
        console.log('parent',res.data);
        setParent(res.data)   
      })
    }  
  }

  console.log('root',root);
  console.log('parent',parent);
  useEffect(() => {
    loadRoot()
   
  },[root])

  useEffect(() => {
    loadParent()
  },[root])

  return (
    <div className="main-layout">
      <div id="main-contener">
        <div className="intro-di">
          <div className="intro-details">
            <strong>{type === 'genus' ? 'Chi' : (type === 'familia') ? 'Họ' : 'Bộ'} </strong> <br/>
            <div><em lang="la">{name}</em> </div>
            <br/>
            <br/>
            
            {type !== 'ordo' && <div> thuộc {type === 'genus' ? 'Họ' : (type === 'familia') ? 'Bộ' : null}
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
            : <div>Không có hình ảnh </div>}
        </div>
      </div>
      <div className ="nav-bar">
        <ul className="nav-items">
          <li className="nav-li"><a href="#descriptions">Miêu tả</a></li>
          <li className="nav-li"><a href="#distribution-map">Phân bổ</a></li>
          <li className="nav-li"><a href="#value">Giá trị sử dụng</a></li>
        </ul>
      </div>
      <div id="descriptions" className="plants">
      <div className="container">
        <div className="row">
            <div className="col-md-12 ">
              <div className="titlepage">
                  <h2>Miêu tả</h2>
              </div>
            </div>
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
      </div>
      
      <div id="distribution-map" className="plants">
        <div className="container">
          <div className="row">
              <div className="col-md-12 ">
                <div className="titlepage">
                    <h2 >Phân bổ</h2>
                </div>
              </div>
          </div>
        </div>
        
        <div className="description">
          <p>{distribution}</p>
            
        </div>
      </div>       

    </div>
    <div id="value" className="plants">
      <div className="container">
        <div className="row">
            <div className="col-md-12 ">
              <div className="titlepage">
                  <h2>Giá trị sử dụng</h2>
              </div>
            </div>
        </div>
      </div>
        <div className="description">
          <div className="row">
            <div className="c-article-section__content">
              <h3>{value}</h3>
              
            </div>
          </div>
        </div>

    </div>
  </div>
    
  )
}

export default DetailsRoot
