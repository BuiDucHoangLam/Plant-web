import React from 'react'
import facebook from '../icon/facebook.png'
import Twitter from '../icon/Twitter.png'
import linkedin from '../icon/linkedin.png'
import instagram from '../icon/instagram.png'
import { useTranslation } from "react-i18next";

import '../css/bootstrap.min.css'
import '../css/style.css'
import '../css/responsive.css'

const Footer = () => {
  const {t} = useTranslation()

  return (
    <div>
      <footer  className = 'footer__child'>
        <div id="contact" className="footer">
          <div className="container" style ={{paddingTop:'12px'}}>
              <div className="row pdn-top-30 row__child">
                        
                          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 l-6 col logo_section">
                              <div className="headinga">
                                  <h3>{t('address')}</h3>
                                  <span>{t('addressName')}</span>
                                  <p>(+084 123456789)</p>
                              </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 l-6">
                          
                            <div className="headinga">
                              <h3>{t('socialNetwork')}</h3>
                              <ul className="location_icon">   
                                <li > <a className ='social-icon' href="#"><img src={facebook}/></a></li>
                                <li> <a className ='social-icon'  href="#"><img src={Twitter}/></a></li>
                                <li> <a className ='social-icon'  href="#"><img src={linkedin}/></a></li>
                                <li> <a className ='social-icon'  href="#"><img src={instagram}/></a></li>
                            </ul>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 l-0 col logo_section"  style ={{display:'flex',justifyContent:'center'}}>
                              <div className="headinga heading__alone">
                                  <h3>{t('menu')}</h3>
                                  <div className="menu-bottom">
                                      <ul className="link">
                                          <div className="row g-2">
                                                <div>
                                              <div style = {{display:'flex',textAlign:'center'}}>
                                              {/* <div className="col-md-6"> */}
                                                  <li style = {{padding:'0',display:'flex'}}> <a  style = {{paddingLeft:'12px',paddingRight:'15px'}} href="#">{t('home')}</a></li>
                                                  <li style = {{padding:'0',display:'flex'}}> <a  style = {{paddingLeft:'12px',paddingRight:'15px'}} href="#">{t('about')}</a></li>
                                                 
                                              </div>
                                              {/* <div className="col-md-6"> */}
                                              <div style = {{display:'flex'}}>
                                                  
                                                  <li  style = {{padding:'0',display:'flex'}} > <a  style = {{paddingLeft:'12px',paddingRight:'15px'}} href="#">{t('info')}</a></li>
                                                  <li style = {{padding:'0',display:'flex'}}> <a  style = {{paddingLeft:'12px',paddingRight:'15px'}} href="#">{t('help')}</a></li>
                                              </div>
                                              </div>
                                          </div>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      
                  
              </div>
          </div>
          <div className="copyright">
              <div className="container">
                  <p>Copyright by <a href="https:dlu.edu.vn/"> Keykul</a></p>
              </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
