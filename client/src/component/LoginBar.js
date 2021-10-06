import React,{useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useTranslation } from "react-i18next";
import i18next from 'i18next';
import cookies from 'js-cookie'

import '../css/responsive.css'
import '../css/style.css'

import '../index.css'
import 'flag-icon-css/css/flag-icon.min.css'

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

const LoginBar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {user } = useSelector(state => ({...state}))
  const currLangCode = cookies.get('i18next') || 'vn'
  const currLang = language.find(l => l.code === currLangCode)
  const {t} = useTranslation()
 
  useEffect(() => {
    document.body.dir = currLang.dir || 'ltr'
  },[currLang])
 

  const logout = () => {
   firebase.auth().signOut()
    dispatch({
      type:'LOGOUT',
      payload:null
    })
    history.push('/login')
  }

  return (
    <header>
          {/* <!-- header inner --> */}
          <div className="header" style ={{marginTop:'0'}}>
            <div className="container">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="menu-area">
                        <div className="limit-box">
                            <nav className="main-menu">
                              <ul className="menu-area-main" >
                              {/* <li className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  Dropdown button
                                </button>
                                <div className='dropdown-menu' aria-labelledby="dropdownMenuButton">
                                  {language.map(({code,name,country_code}) => (
                                    <a key = {country_code}>{<button onClick ={() => i18next.changeLanguage(code)} disabled ={code ===currLangCode} className="dropdown-item"> <span className ={`flag-icon flag-icon-${country_code} mx-2`}></span> {name}</button>}</a>
                                  ))} 
                                </div>
                              

                              </li> */}
                                  {language.map(({code,name,country_code}) => (
                                    <li><a key = {country_code}>{<button onClick ={() => i18next.changeLanguage(code)} disabled ={code ===currLangCode} className="dropdown-item"> <span className ={`flag-icon flag-icon-${country_code} mx-2`}></span> {name}</button>}</a></li>
                                  ))} 
                                 {(!user) ? <><li key = 'login'> <a href="/login">{t('login')}</a> </li>
                                  <li key = 'register'> <a href="/register">{t('register')}</a> </li> </> 
                                  :<> 
                                   <li key = 'dashboard'> <Link to='/admin/dashboard'><span className ='dashboard'>{t('dashboard')}</span></Link>  </li>
                                  <li key = 'name'> <span className ='login'>{user.name}</span>  </li>
                                  <li key = 'logout' onClick = {logout}> <span className ='login'>{t('logout')}</span>  </li> 
                                  </>}
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
  )
}

export default LoginBar
