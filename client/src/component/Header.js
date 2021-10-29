import React,{useEffect, useState} from 'react'
import logo from '../images/logo.png'
import search_icon from '../images/search_icon.png'
import LoginBar from './LoginBar';
import {MenuOutlined} from '@ant-design/icons'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useTranslation } from "react-i18next";
import i18next from 'i18next';
import cookies from 'js-cookie'
import { Button, Modal, Card } from "react-bootstrap";

import '../index.css'
import '../css/style.css'
import 'flag-icon-css/css/flag-icon.min.css'
import '../css/responsive.css'
import icon from '../images/icon-menu.png'
import university from '../images/university.png'

const language = [
  {
    code:'vn',
    name:'Việt Nam',
    country_code:'vn',
  },
  {
    code:'en',
    name:'English',
    country_code:'gb',
  },
]

const Header = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()
  const {user } = useSelector(state => ({...state}))
  const currLangCode = cookies.get('i18next') || 'vn'
  const currLang = language.find(l => l.code === currLangCode)
  const [show, setShow] = useState(false);

  useEffect(() => {
    document.body.dir = currLang.dir || 'ltr'
  },[currLang])
  const href = window.location.href.split('/').slice(-1)[0]

  const GlobeIcon = ({ width = 24, height = 24 }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="currentColor"
      className="bi bi-globe"
      viewBox="0 0 16 16"
    >
      <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
    </svg>
  )

  const logout = () => {
   firebase.auth().signOut()
    dispatch({
      type:'LOGOUT',
      payload:null
    })
    history.push('/login')
  }

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
   
    setShow(true);
  };

  return (
    <div>
  {/* <!-- end loader --> */}
      
          {/* <!-- header inner --> */}
  
          <div className="header">

            <div className="container">
                <div className="row" style ={{width:'100%'}}>
                  <div className="menu-top__child l-12">
                  <img style ={{width:'56px',height:'56px'}} src={icon} alt="#" onClick ={handleShow} />
                    
                    <div className="logo-menu__child"> <a href="/"><img src={university} alt="#" /></a> </div>

                    <div className="dropdown" style ={{marginTop:'10px'}}>
                        <span className ='menu-top-lang__child'><GlobeIcon/></span>
                        
                        <div className="dropdown-content">
                        {language.map(({code,name,country_code}) => (
                            <div style ={{float:'left'}} key = {country_code}><a >{<button onClick ={() => i18next.changeLanguage(code)} disabled ={code ===currLangCode} className="dropdown-item"> <span className ={`flag-icon flag-icon-${country_code} mx-2`}></span> {name}</button>}</a></div>
                          ))}
                        </div>
                        
                      </div>
                  </div>

                </div>
                <div className="row" style ={{marginBottom:'-20px'}}>
                   
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 l-0">
                      <div className="menu-area">
                        <div className="limit-box">
                            <nav className="main-menu">
                              <ul className="menu-area-main" >
                              
                                                            
                              <div className="dropdown">
                                <span style ={{width:'35px',height:'35px',marginRight:'10px'}}><GlobeIcon/></span>
                                <div className="dropdown-content">
                                {language.map(({code,name,country_code}) => (
                                    <div style ={{float:'left'}} key = {country_code}><a >{<button onClick ={() => i18next.changeLanguage(code)} disabled ={code ===currLangCode} className="dropdown-item"> <span className ={`flag-icon flag-icon-${country_code} mx-2`}></span> {name}</button>}</a></div>
                                  ))}
                                </div>
                                
                              </div>
                                  {/* {language.map(({code,name,country_code}) => (
                                    <li key = {country_code}><a >{<button onClick ={() => i18next.changeLanguage(code)} disabled ={code ===currLangCode} className="dropdown-item"> <span className ={`flag-icon flag-icon-${country_code} mx-2`}></span> {name}</button>}</a></li>
                                  ))}  */}
                                 {(!user) ? <><li className ={href === 'login' && 'active'} key = 'login'> <a href="/login">{t('login')}</a> </li>
                                  <li className ={href === 'register' && 'active'} key = 'register'> <a href="/register">{t('register')}</a> </li> </> 
                                  :<> 
                                   <li className ={href === 'dashboard' && 'active'} key = 'dashboard'> <Link to='/admin/dashboard'><span className ='dashboard'>{t('dashboard')}</span></Link>  </li>
                                  <li key = 'name'> <span className ='login'>{user.name}</span>  </li>
                                  <li key = 'logout' onClick = {logout}> <span className ='login'>{t('logout')}</span>  </li> 
                                  </>}
                              </ul>
                            </nav>
                           
                        </div>
                      </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-1 col-sm-4 l-0 col logo_section">
                      <div className="full">
                        <div className="center-desk">
                            <div className="logo"> <a href="/"><img src={logo} alt="#" /></a> </div>
                        </div>
                      </div>
                  </div>
                  <div className="col-xl-9 col-lg-9 col-md-11 col-sm-4 l-0">
                      <div className="menu-area">
                        <div className="limit-box">
                            <nav className="main-menu">
                              <ul className="menu-area-main">
                                  <li className ={!href && 'active'}> <a href="/">{t('home')}</a> </li>
                                  
                                  <li className ={href === 'about' && 'active'}> <a href="/about">{t('about')}</a> </li>
                                  <li className ={href === 'plants' && 'active'}> <a href="/plants">{t('info')}</a> </li>
                                 
                                  <li className ={href === 'statistics' && 'active'}><a href="/statistics">{t('statistics')}</a></li>
                                                                                           
                                  <div className="dropdown">
                                    <span className ={(href === 'search' || href ==='search-image') ? 'dropdown__span--active' : 'dropdown__span'} >{t('search')}</span>
                                    <div className="dropdown-content" style ={{marginTop:'-15px'}}>
                                      <div className ={href === 'search' ? 'dropdown__span-item--active' : 'dropdown__span-item'}><a href="/search">{t('info')}</a></div>
                                    </div>
                                    <div className={"dropdown-content"} style ={{marginTop:'30px'}}>
                                      <div className ={href === 'search-image' ? 'dropdown__span-item--active' : 'dropdown__span-item'}><a href="/search-image">{t('picture')}</a></div>
                                    </div>
                                  </div>
                                  {/* <li className ={href === 'search' ? 'dropdown-content active' : 'dropdown-content'}><a href="/search">{t('search')}</a></li>
                                  <li className ={href === 'search-image' ? 'dropdown-content active' : ''}><a href="/search-image">{t('search')}</a></li> */}
                               
                                  <li className ={href === 'help' && 'active'}><a href="/help">{t('help')}</a></li>
                            
                                  
                              </ul>
                            </nav>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
          {/* <!-- end header inner --> */}
          <Modal show={show} onHide={handleClose} style ={{width:'80%'}}>
            <Modal.Header closeButton>
              <Modal.Title>Menu - {user && user.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            {/* <nav className="main-menu"> */}
              <ul className ='menu-mobile'>
                  <li className ={!href && 'active'}> <a href="/">{t('home')}</a> </li>
                  {(!user) ? <><li className ={href === 'login' && 'active'} key = 'login'> <a href="/login">{t('login')}</a> </li>
                      <li className ={href === 'register' && 'active'} key = 'register'> <a href="/register">{t('register')}</a> </li> </> 
                      :<> 
                        <li className ={href === 'dashboard' && 'active'} key = 'dashboard'> <Link to='/admin/dashboard'>{t('dashboard')}</Link>  </li>
                     
                      <li key = 'logout' onClick = {logout}> <a href ='#'>{t('logout')} </a>  </li> 
                      </>}
                  <li className ={href === 'about' && 'active'}> <a href="/about">{t('about')}</a> </li>
                  <li className ={href === 'plants' && 'active'}> <a href="/plants">{t('info')}</a> </li>
                  
                  <li className ={href === 'statistics' && 'active'}><a href="/statistics">{t('statistics')}</a></li>
                                                                            
                  
                  <li className ={href === 'search' && 'active' }><a href="/search">{t('search')} {t('info')}</a></li>
                
                
                  <li className ={href === 'search-image' && 'active' }><a href="/search-image"> {t('search')} {t('picture')}</a></li>
                   
                  {/* <li className ={href === 'search' ? 'dropdown-content active' : 'dropdown-content'}><a href="/search">{t('search')}</a></li>
                  <li className ={href === 'search-image' ? 'dropdown-content active' : ''}><a href="/search-image">{t('search')}</a></li> */}
                
                  <li className ={href === 'help' && 'active'}><a href="/help">{t('help')}</a></li>
            
                  
              </ul>
            {/* </nav> */}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick = {handleClose}>Close</Button>
              <Button variant="primary" onClick = {handleClose}>Save changes</Button>
            </Modal.Footer>
          </Modal>
      
    </div>
  )
}

export default Header
