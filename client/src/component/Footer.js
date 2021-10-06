import React from 'react'
import facebook from '../icon/facebook.png'
import Twitter from '../icon/Twitter.png'
import linkedin from '../icon/linkedin.png'
import instagram from '../icon/instagram.png'
import { useTranslation } from "react-i18next";

import '../css/bootstrap.min.css'
import '../css/responsive.css'
import '../css/style.css'
// import '../css/jquery.mCustomScrollbar.min.css'

const Footer = () => {
  const {t} = useTranslation()

  return (
    <div>
      <footer>
        <div id="contact" className="footer">
          <div className="container">
              <div className="row pdn-top-30">
                  <div className="col-md-12">
                      <div className="row">
                          <div className="col">
                              <div className="headinga">
                                  <h3>{t('address')}</h3>
                                  <span>{t('addressName')}</span>
                                  <p>(+084 123456789)</p>
                              </div>
                          </div>
                          <div className="col-6">
                            <div className="headinga">
                              <h3>{t('socialNetwork')}</h3>
                              <ul className="location_icon">
                                
                                <li> <a href="#"><img src={facebook}/></a></li>
                                <li> <a href="#"><img src={Twitter}/></a></li>
                                <li> <a href="#"><img src={linkedin}/></a></li>
                                <li> <a href="#"><img src={instagram}/></a></li>
                            </ul>
                            </div>
                          </div>
                          <div className="col">
                              <div className="headinga">
                                  <h3>{t('menu')}</h3>
                                  <div className="menu-bottom">
                                      <ul className="link">
                                          <div className="row g-2">
                                              <div className="col-md-6">
                                                  <li> <a href="#">{t('home')}</a></li>
                                                  <li> <a href="#">{t('about')}</a></li>
                                                 
                                              </div>
                                              <div className="col-md-6">
                                                  
                                                  <li> <a href="#">{t('info')}</a></li>
                                                  <li> <a href="#">{t('help')}</a></li>
                                              </div>
                                          </div>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          {/* <div className="copyright">
              <div className="container">
                  <p>Copyright 2019 All Rights Reserved Design By <a href="https://html.design/">Free Html Templates</a></p>
              </div>
          </div> */}
        </div>
      </footer>
    </div>
  )
}

export default Footer
