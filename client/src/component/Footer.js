import React from 'react'
import facebook from '../icon/facebook.png'
import Twitter from '../icon/Twitter.png'
import linkedin from '../icon/linkedin.png'
import instagram from '../icon/instagram.png'

import '../css/bootstrap.min.css'
import '../css/responsive.css'
import '../css/style.css'
// import '../css/jquery.mCustomScrollbar.min.css'

const Footer = () => {
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
                                  <h3>Address</h3>
                                  <span>01 Phù Đổng Thiên Vương, Phường 8, Thành Phố Đà Lạt</span>
                                  <p>(+084 123456789)</p>
                              </div>
                          </div>
                          <div className="col-6">
                            <div className="headinga">
                              <h3>Social Link</h3>
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
                                  <h3>Menu</h3>
                                  <div className="menu-bottom">
                                      <ul className="link">
                                          <div className="row g-2">
                                              <div className="col-md-6">
                                                  <li> <a href="#">Home</a></li>
                                                  <li> <a href="#">About</a></li>
                                                  <li> <a href="#">Plant</a></li>
                                              </div>
                                              <div className="col-md-6">
                                                  <li> <a href="#">Gallery</a></li>
                                                  <li> <a href="#">Statistics</a></li>
                                                  <li> <a href="#">Help</a></li>
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
