import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {  } from 'react-redux';
import '../css/responsive.css'
import '../css/style.css'

import '../index.css'

const LoginBar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {user } = useSelector(state => ({...state}))
  console.log(user);

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
                                 {(!user) ? <><li> <a href="/login">Đăng nhập</a> </li>
                                  <li> <a href="/register">Đăng ký</a> </li> </> 
                                  :<> 
                                   <li> <Link to='/admin/dashboard'><span className ='dashboard'>Danh mục</span></Link>  </li>
                                  <li> <span className ='login'>{user.name}</span>  </li>
                                  <li onClick = {logout}> <span className ='login'>Logout</span>  </li> 
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
