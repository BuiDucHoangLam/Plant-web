import React from 'react'
import { Carousel } from 'react-responsive-carousel'

import '../css/style.css'
import '../css/responsive.css'
import '../css/bootstrap.min.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

// import '../js/jquery.min.js'
// import '../js/popper.min.js'
// import '../js/bootstrap.bundle.min.js'
// import '../js/jquery-3.0.0.min.js'
// import '../js/plugin.js'
// // import '../js/jquery.mCustomScrollbar.concat.min.js'
// import '../js/custom.js'
// // import '../js/owl.carousel.js'

import gyufyufyu from '../images/gyufyufyu.png'
import contactimg from '../images/contactimg.jpg'
import image5 from '../images/5.jpg'
import Bidens_flwr from '../images/hatkin/Bidens_flwr.jpg'
import unamamed from '../images/hattran/unnamed.jpg'
import reuunamamed from '../images/reu/unnamed.jpg'
import Ferns from '../images/duongxi/Ferns-systems-tracheophytes-leaves-water.jpg'

const Home = () => {
  return (
    <div className = 'main-layout'>
      {/* <!-- loader  --> */}
      {/* <div className="loader_bg">
         <div className="loader"><img src="images/loading.gif" alt="#" /></div>
      </div> */}
      {/* <!-- end loader --> */}
  {/* <!-- end loader --> */}
      {/* <!-- header --> */}
      
      
      {/* <!-- end header --> */}
      <section >
         <Carousel
           showArrows={true}
           autoPlay
           infiniteLoop
           id="main_slider" className="carousel slide banner-main" data-ride="carousel"
         >
               <div className="carousel-item active">
                  <div className="container">
                     <div className="row marginii">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                           <div className="carousel-caption ">
                              <h1>Welcome To The <strong className="color">Nutrients Plants</strong></h1>
                              <p>The Plant List (TPL) was a working list of all known plant species produced by the botanical community in response to Target 1 of the 2002-2010 Global Strategy for Plant Conservation (GSPC).</p>
                              <a className="btn btn-lg btn-primary" href="#" role="button">About</a>
                              <a className="btn btn-lg btn-primary" href="#" role="button">Contact US</a>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
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
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="carousel-caption ">
                              <h1>Plant<strong className="color"> A to Z</strong></h1>
                              <p>From Aloe to Zebra Grass—and with over 1,000 plants to explore—find every plant in the alphabet within our comprehensive A to Z index.</p>
                              <a className="btn btn-lg btn-primary" href="#" role="button">About</a>
                              <a className="btn btn-lg btn-primary" href="#" role="button">Contact US</a>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                           <div className="img-box">
                              <figure className="circleexam"><img src={contactimg} alt="img"/></figure>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="carousel-item active">
                  <div className="container">
                     <div className="row marginii">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="carousel-caption ">
                              <h1>Purpose<strong className="color"> Nutrients Plants</strong></h1>
                              <p>The Plant List is a working list of all known plant species. It aims to be comprehensive for species of Vascular plant (flowering plants, conifers, ferns and their allies) and of Bryophytes (mosses and liverworts).</p>
                              <a className="btn btn-lg btn-primary" href="#" role="button">About</a>
                              <a className="btn btn-lg btn-primary" href="#" role="button">Contact US</a>
                           </div>
                           
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                           <div className="img-box">
                              <figure className="circleexam"><img src={image5} alt="img"/></figure>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
              
         </Carousel>
      </section>
      {/* <!-- plant --> */}
      {/* <div id="plant" className="plants">
         <div className="container">
            <div className="row">
               <div className="col-md-12 ">
                  <div className="titlepage">
                     <h2>Our Wonderful plants</h2>
                     <span>looking at its layout. The point of using Lorem Ipsumletters, as opposed to usingl</span>
                  </div>
               </div>
            </div>
         </div>
         <div className="container">
            <div className="row">
               <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div className="plants-box">
                     <figure><img src="images/plant1.jpg" alt="img"/></figure>
                     <h3> Floral Vibrant</h3>
                     <p>It is a long established fact that a reader will be distracted by the readable content of a page   when looking at its layout. The point of using Lorem Ipsumletters, as opposed to using</p>
                  </div>
               </div>
               <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div className="plants-box">
                     <figure><img src="images/plant2.jpg" alt="img"/></figure>
                     <h3> Floral Vibrant</h3>
                     <p>It is a long established fact that a reader will be distracted by the readable content of a page   when looking at its layout. The point of using Lorem Ipsumletters, as opposed to using</p>
                  </div>
               </div>
               <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div className="plants-box">
                     <figure><img src="images/plant3.jpg" alt="img"/></figure>
                     <h3> Floral Vibrant</h3>
                     <p>It is a long established fact that a reader will be distracted by the readable content of a page   when looking at its layout. The point of using Lorem Ipsumletters, as opposed to using</p>
                  </div>
               </div>
               <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div className="plants-box">
                     <figure><img src="images/plant1.jpg" alt="img"/></figure>
                     <h3> Floral Vibrant</h3>
                     <p>It is a long established fact that a reader will be distracted by the readable content of a page   when looking at its layout. The point of using Lorem Ipsumletters, as opposed to using</p>
                  </div>
               </div>
               <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div className="plants-box">
                     <figure><img src="images/plant2.jpg" alt="img"/></figure>
                     <h3> Floral Vibrant</h3>
                     <p>It is a long established fact that a reader will be distracted by the readable content of a page   when looking at its layout. The point of using Lorem Ipsumletters, as opposed to using</p>
                  </div>
               </div>
               <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div className="plants-box">
                     <figure><img src="images/plant3.jpg" alt="img"/></figure>
                     <h3> Floral Vibrant</h3>
                     <p>It is a long established fact that a reader will be distracted by the readable content of a page   when looking at its layout. The point of using Lorem Ipsumletters, as opposed to using</p>
                  </div>
               </div>
            </div>
         </div>
      </div> --> */}
      {/* <!-- end plant --> */}
     
      
      <div id="gallery" className="Gallery">
       <div className="container">
          <div className="row">
              <div className="col-md-12 ">
                <div className="titlepage">
                    <h2>Major Group</h2>
                    <span>Work down the taxonomic hierarchy from Major Group (to find out which Families belong to each), to Family (to discover the Genera belonging to each) and finally Genus (to list the Species in each).</span>
                </div>
              </div>
          </div>
        </div>
      
      <div className="container-fluid margin-r-l">
         <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 thumb">
               <div className="Gallery-box Gallery_g">
                  <figure>
                     
                     <img  src={Bidens_flwr} className="zoom img-fluid "  alt="" />
                     
                     <span className="hoverle">
                     <a href="angiosperms.php" >
                     <b>Angiosperms</b>
                     </a>
                     </span>  
                  </figure>
               </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 thumb">
               <div className="Gallery-box Gallery_g">
                  <figure>
                    
                     <img  src={unamamed} className="zoom img-fluid "  alt="" />
                   
                     <span className="hoverle">
                     <a href="#" >
                     <b>Gymnosperms</b>
                     </a>
                     </span>
                  </figure>
               </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 thumb">
               <div className="Gallery-box Gallery_g">
                  <figure>
                      <a>
                     <img  src={Ferns} className="zoom img-fluid "  alt="" />
                     </a>
                     <span className="hoverle">
                     <a href="#" >
                     <b>Pteridophytes</b>
                     </a>
                     </span>
                  </figure>
               </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 thumb">
               <div className="Gallery-box Gallery_g">
               <figure>
                    <a>
                     <img  src={reuunamamed} className="zoom img-fluid "  alt="" />
                     </a>
                     <span className="hoverle">
                     <a href="#" >
                     <b>Bryophytes</b>
                     </a>
                     </span>
                  </figure>
               </div>
            </div>
         </div>
      </div>
    </div>
    </div>
  )
}

export default Home
