import React from 'react'

import map from '../images/map.jpg'
import contact from '../images/contactimg.jpg'
import GoogleMap from '../component/form/GoogleMap'
import image from '../images/image.png'

const About = () => {
  const handleToWeb = () => {
    window.location.href = "http://www.dlu.edu.vn";
  }
  return (
    <div style ={{backgroundImage:`url(${image})`}}>
      <div class="main-layout" style ={{width:'80%',margin:'120px auto 0 auto',padding:'50px 0',borderRadius:' 20px'}}>
        <div id="contact" class="contact" style ={{padding:'15px',borderRadius:' 20px'}}>
          <div class="container">
            
            <div class="row">
                <div class="col-md-12">
                  <div class="titlepage">
                      <div className ='class-tt'>Contact Us</div>
                      <hr />
                      <span style={{textAlign: 'center' ,marginBottom: '5px'}} >For further information, to provide feedback, or make an enquiry about POWO, please please contact:</span>
                  </div>
                </div>
            </div>

            <div class="row" style={{marginBottom: '10px'}}>
                <div class="col-md-3">
                  <div class="dbox w-100 text-center">
                      <div class="icon d-flex align-items-center justify-content-center">
                        <span class="fa fa-map-marker"></span>
                      </div>
                      <div class="text">
                        <p><span>Address:</span> 01 Phù Đổng Thiên Vương, Phường 8, Thành Phố Đà Lạt</p>
                      </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="dbox w-100 text-center">
                      <div class="icon d-flex align-items-center justify-content-center">
                        <span class="fa fa-phone"></span>
                      </div>
                      <div class="text">
                        <p><span>Phone:</span> <a href="tel://1234567920">(+084 123456789)</a></p>
                      </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="dbox w-100 text-center">
                      <div class="icon d-flex align-items-center justify-content-center">
                        <span class="fa fa-envelope-o"></span>
                      </div>
                      <div class="text">
                        <p><span>Email:</span> <a href="mailto:duyth@dlu.edu.vn">duyth@dlu.edu.vn</a>
                        </p>
                      </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="dbox w-100 text-center">
                      <div class="icon d-flex align-items-center justify-content-center">
                        <span class="fa fa-globe"></span>
                      </div>
                      <div class="text">
                        <p><span>Website</span> <a href="#" onClick = {handleToWeb}>dlu.edu.vn</a></p>
                      </div>
                  </div>
                </div>
            </div>

            <div class="row" style={{marginBottom: '10px'}}>
                <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 padding-right">
                  <div class="row">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <form>
                            <div class="row">
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                  <input class="form-control" placeholder="Name" type="text" name="Name" />
                              </div>
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                  <input class="form-control" placeholder="Email" type="text" name="Email"/>
                              </div>
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                  <input class="form-control" placeholder="Phone" type="text" name="Phone"/>
                              </div>
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                  <textarea class="form-control>" placeholder="Message" type="text" name="Message"></textarea>
                              </div>
                           
                            </div>
                        </form>
                      </div>
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12" style ={{overflow:'hidden',height:'300px'}}>
                        <div class="map_section" style ={{marginTop:'15px'}}>
                            <GoogleMap coordinates = {[[11.9545617,108.4436577]]} zoom = {15} />
                        </div>
                      </div>
                  </div>
                </div>
                <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 paddimg-left">
                  <div class="Nursery-img">
                      <figure>
                        <img src={contact} alt="img" />
                        <div class="text-box">
                            <h3>Best Green Nursery</h3>
                        </div>
                      </figure>
                  </div>
                </div>
            </div>
          </div>
        </div>

        </div>
    </div>
  )
}

export default About
