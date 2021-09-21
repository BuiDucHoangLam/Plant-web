import React from 'react'
import logo from '../images/logo.png'
import search_icon from '../images/search_icon.png'

// import '../css/bootstrap.min.css'
import '../css/responsive.css'
import '../css/style.css'

const Header = () => {
  return (
    <div>
      
  {/* <!-- end loader --> */}
      <header>
          {/* <!-- header inner --> */}
          <div className="header">
            <div className="container">
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                      <div className="full">
                        <div className="center-desk">
                            <div className="logo"> <a href="index.html"><img src={logo} alt="#" /></a> </div>
                        </div>
                      </div>
                  </div>
                  <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                      <div className="menu-area">
                        <div className="limit-box">
                            <nav className="main-menu">
                              <ul className="menu-area-main">
                                  <li className="active"> <a href="/">Home</a> </li>
                                  <li> <a href="/about">About</a> </li>
                                  <li><a href="/plant">Plant</a></li>
                                  <li><a href="/search">Search</a></li>
                                  <li><a href="/statistics">Statistics</a></li>
                                  <li><a href="/help">Help</a></li>
                                  <li className="last"><a href="/search"><img src={search_icon} alt="icon" /></a></li>
                              </ul>
                            </nav>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
          {/* <!-- end header inner --> */}
      </header>
    </div>
  )
}

export default Header
