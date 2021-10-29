import React from 'react'

import map from '../images/map.jpg'
import contact from '../images/contactimg.jpg'
import GoogleMap from '../component/form/GoogleMap'
import image from '../images/image.png'
import { useTranslation } from 'react-i18next'

const About = () => {
  const {t} = useTranslation()
  const handleToWeb = () => {
    window.location.href = "http://www.dlu.edu.vn";
  }
  return (
      <div  class="main-layout" style={{marginTop: '120px',backgroundImage:`url(${image})`,paddingTop:'1px',paddingBottom:'1px'}}>
        <div id="contact" class="contact" style ={{marginTop:'48px',padding:'15px',borderRadius:' 20px',background: 'rgba(255, 255, 255, .9)'}}>
          <div class="container">
            
            <div class="row">
                <div class="col-md-12">
                  <div class="titlepage">
                      <div className ='class-tt'>{t('contactUs')}</div>
                      <hr />
                      <span style={{textAlign: 'center' ,marginBottom: '5px'}} >{t('contactUsInfo')}</span>
                  </div>
                </div>
            </div>

            <div class="row" style={{marginBottom: '10px'}}>
                <div class="col-md-3 l-6">
                  <div class="dbox w-100 text-center">
                      <div class="icon d-flex align-items-center justify-content-center">
                        <span class="fa fa-map-marker"></span>
                      </div>
                      <div class="text">
                        <p><span>{t('address')}</span> {t('addressName')}</p>
                      </div>
                  </div>
                </div>
                <div class="col-md-3 l-6">
                  <div class="dbox w-100 text-center">
                      <div class="icon d-flex align-items-center justify-content-center">
                        <span class="fa fa-phone"></span>
                      </div>
                      <div class="text">
                        <p><span>{t('phone')}</span> <a href="tel://1234567920">(+084 123456789)</a></p>
                      </div>
                  </div>
                </div>
                <div class="col-md-3 l-6">
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
                <div class="col-md-3 l-6">
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
                                  <input class="form-control" placeholder={t('name')} type="text" name="Name" />
                              </div>
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                  <input class="form-control" placeholder="Email" type="text" name="Email"/>
                              </div>
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                  <input class="form-control" placeholder={t('phone')} type="text" name="Phone"/>
                              </div>
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                  <textarea class="form-control>" placeholder={t('message')} type="text" name="Message"></textarea>
                              </div>
                           
                            </div>
                        </form>
                      </div>
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12" style ={{overflow:'hidden',height:'310px'}}>
                        <div class="map_section" style ={{marginTop:'15px'}}>
                            <GoogleMap coordinates = {[[11.9545617,108.4436577]]} zoom = {15} />
                        </div>
                      </div>
                  </div>
                </div>
                <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 padding-left top-rs__child">
                  <div class="Nursery-img">
                      <figure>
                        <img src={contact} alt="img" />
                        <div class="text-box">
                            <h3>{t('bestResult')}</h3>
                        </div>
                      </figure>
                  </div>
                </div>
            </div>
          </div>
        </div>

        </div>
    
  )
}

export default About
