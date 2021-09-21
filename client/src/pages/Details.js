import React, {  useEffect, useState } from 'react'

import { getPlantBySlug } from '../api/plant'

import '../css/styleDetail.css'
import '../css/style.css'
import '../css/bootstrap.min.css'
import '../css/responsive.css'

import plant1 from '../images/plant1.jpg'
import plant2 from '../images/plant2.jpg'
import plant3 from '../images/plant3.jpg'


const Details = ({match}) => {
  const [plant,setPlant] = useState({images:[{url:''}],synonyms:[]})

  const {slug} = match.params
 
  useEffect(() => {
    const loadPlant = () => getPlantBySlug(slug).then(res => 
        setPlant(res.data)
      )
    
  loadPlant()

  },[slug]) 

  console.log(plant);

  return (
    <div className="main-layout">
      <div id="main-contener"></div>
    
<div className="intro-di">
  <div className="intro-details">
      <strong>Tên:</strong> <br/>
    <a href="/taxon/urn:lsid:ipni.org:names:77126684-1"><em lang="la">{plant.name}</em> </a>
    <br/>
    <br/>
    <strong>Loài: </strong> <br/>
    <div href="/"><em lang="la">{plant.genus}</em>   </div>
      
  </div>

  <div className="into-images">
    <img  style={{width: '650px',height: '350px'}} src={plant.images[0].url} alt="" />
  </div>
</div>
{/* <!--end intro--> */}


{/* <!--navbar--> */}

  <div className ="nav-bar">
    <ul className="nav-items">
        
      <li className="nav-li"><a href="#descriptions">Miêu tả</a></li>
      <li className="nav-li"><a href="#image-gallery">Hình ảnh</a></li>
      <li className="nav-li"><a href="#distribution-map">Phân bổ</a></li>
      <li className="nav-li"><a href="#synonyms">Tên khác</a></li>
      <li className="nav-li"><a href="#relatives">Họ hàng</a></li>
      <li className="nav-li"><a href="#other-data">Thông tin khác</a></li>
      <li className="nav-li"><a href="#bibliography">Lược sử</a></li>
      <li className="nav-li"><a href="#sources">Nguồn tin</a></li>
    </ul>
</div>
{/* <!--end navbar--> */}

  {/* <!--description--> */}

  <div id="descriptions" className="plants">
    <div className="container">
       <div className="row">
          <div className="col-md-12 ">
             <div className="titlepage">
                <h2>Miêu tả</h2>
             </div>
          </div>
       </div>
    </div>
    <div className="description">
      <h3>
      <button className="btn collapser" role="button" data-toggle="collapse" data-target="#descriptions-FTEA-0" aria-expanded="true">
        {plant.description}
      </button>
      </h3>
   
  </div>
   
    
  </div>
  {/* <!--end description--> */}

  {/* <!--distribution--> */}

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
      <p>{plant.distribution}</p>
         
    </div>
  </div>

  {/* <!--end distribution--> */}

  {/* <!--synomyms--> */}

  <div id="synonyms" className="plants">
    <div className="container">
       <div className="row">
          <div className="col-md-12 ">
             <div className="titlepage">
                <h2>Tên khác</h2>
             </div>
          </div>
       </div>
    </div>
      <div className="description">
        <div className="row">
        <aside role="complementary" className="c-article-section__aside">
            <p style={{paddingRight: '1em'}}>Có {plant.synonyms.length}  </p>
         
          </aside>
          <div className="c-article-section__content">
            <ul className="c-synonym-list two-col">
              {plant.synonyms.map(s => <li key ={s}>{s}</li>)}
            </ul>
          </div>
          
        </div>
      </div>

  </div>
  {/* <!--end synomyms--> */}

  {/* <!--other data--> */}

  <div id="other-data" className="plants">
    <div className="container">
       <div className="row">
          <div className="col-md-12 ">
             <div className="titlepage">
                <h2>Thông tin khác</h2>
             </div>
          </div>
       </div>
    </div>
      <div className="description">
        <div className="row">
          <div className="c-article-section__content">
            <h3>{plant.otherData}</h3>
            
          </div>
        </div>
      </div>

  </div>

  {/* <!--end other data--> */}

  {/* <!--bibliography--> */}

  <div id="bibliography" className="plants">
    <div className="container">
       <div className="row">
          <div className="col-md-12 ">
             <div className="titlepage">
                <h2>Lược sử</h2>
             </div>
          </div>
       </div>
    </div>
    <div className="description" >
      
        <div className="row">
          
          {plant.bibliography}    
        </div>
    </div>
  </div>

  {/* <!--end bibliography--> */}

  {/* <!--sources--> */}
  <div id="sources" className="plants">
    <div className="container">
       <div className="row">
          <div className="col-md-12 ">
             <div className="titlepage">
                <h2>Nguồn tin</h2>
             </div>
          </div>
       </div>
    </div>
      <div className="description">
        <div className="row">
          {plant.source}
        </div>
      </div>

  </div>
  {/* <!--end sources--> */}

      {/* <!-- relatives --> */}

      <div id="relatives" className="plants">
         <div className="container">
            <div className="row">
               <div className="col-md-12 ">
                  <div className="titlepage">
                     <h2>Relatives</h2>
                  </div>
               </div>
            </div>
         </div>
         <div className="container">
            <div className="row">
               <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div className="plants-box">
                     <figure><img src={plant1} alt="img"/></figure>
                     <h3> Floral Vibrant</h3>
                     <p>It is a long established fact that a reader will be distracted by the readable content of a page   when looking at its layout. The point of using Lorem Ipsumletters, as opposed to using</p>
                  </div>
               </div>
               <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div className="plants-box">
                     <figure><img src={plant2} alt="img"/></figure>
                     <h3> Floral Vibrant</h3>
                     <p>It is a long established fact that a reader will be distracted by the readable content of a page   when looking at its layout. The point of using Lorem Ipsumletters, as opposed to using</p>
                  </div>
               </div>
               <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div className="plants-box">
                     <figure><img src={plant3} alt="img"/></figure>
                     <h3> Floral Vibrant</h3>
                     <p>It is a long established fact that a reader will be distracted by the readable content of a page   when looking at its layout. The point of using Lorem Ipsumletters, as opposed to using</p>
                  </div>
               </div>
               <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div className="plants-box">
                     <figure><img src={plant1} alt="img"/></figure>
                     <h3> Floral Vibrant</h3>
                     <p>It is a long established fact that a reader will be distracted by the readable content of a page   when looking at its layout. The point of using Lorem Ipsumletters, as opposed to using</p>
                  </div>
               </div>
               <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div className="plants-box">
                     <figure><img src={plant2} alt="img"/></figure>
                     <h3> Floral Vibrant</h3>
                     <p>It is a long established fact that a reader will be distracted by the readable content of a page   when looking at its layout. The point of using Lorem Ipsumletters, as opposed to using</p>
                  </div>
               </div>
               <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div className="plants-box">
                     <figure><img src={plant3} alt="img"/></figure>
                     <h3> Floral Vibrant</h3>
                     <p>It is a long established fact that a reader will be distracted by the readable content of a page   when looking at its layout. The point of using Lorem Ipsumletters, as opposed to using</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
      {/* <!-- end relatives --> */}
     
      {/* <!--Images --> */}

      <div id="image-gallery" className="Gallery">
        <div className="container">
          <div className="row">
              <div className="col-md-12">
                <div className="titlepage">
                    <h2>Hình ảnh </h2>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div className="container-fluid margin-r-l">
         <div className="row">
           {plant.images.map(img => <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 thumb">
               <div className="Gallery-box" key ={img.public_id}>
                  <figure>
                     <a href={img.url} className="fancybox" rel="ligthbox">
                     <img  src={img.url} className="zoom img-fluid "  alt="" />
                     </a>
                     <span className="hoverle">
                     <a href={img.url} className="fancybox" rel="ligthbox">View</a>
                     </span>
                  </figure>
               </div>
            </div>)}
            
         </div>
      </div>
      {/* <!-- end Images --> */}
      
   </div>
  )
}

export default Details
