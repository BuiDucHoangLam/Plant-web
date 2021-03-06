import React,{lazy,Suspense, useEffect} from 'react'
import {Switch,Route} from 'react-router-dom'

import Footer from './component/Footer'
import Home from './pages/Home'
import Search from './pages/Search'
import Statistics from './pages/Statistics'
import Help from './pages/Help'
import Dashboard from './pages/admin/Dashboard'
import AdminRoute from './routes/AdminRoute'
import OrdoCreate from './pages/admin/ordo/OrdoCreate'
import FamiliaCreate from './pages/admin/familia/FamiliaCreate'
import GenusCreate from './pages/admin/genus/GenusCreate'
import SpecieCreate from './pages/admin/specie/SpecieCreate'
import SpecieEdit from './pages/admin/specie/SpecieEdit'
import OrdoEdit from './pages/admin/ordo/OrdoEdit'
import FamiliaEdit from './pages/admin/familia/FamiliaEdit'
import GenusEdit from './pages/admin/genus/GenusEdit'
import Plants from './pages/Plants';
import DetailsRoot from './pages/DetailsRoot';
import FileExplorer from './component/tree/FileExplorer'
import About from './pages/About';
import SearchImage from './pages/SearchImage';
import Map from './component/googleMap/Map';
import PasswordForgot from './auth/PasswordForgot';
import OrdoHome from './pages/ordo/OrdoHome'

import Login from './auth/Login'
import Register from './auth/Register'
import RegisterComplete from './auth/RegisterComplete'

import { auth } from './auth/firebase'
import { useDispatch } from 'react-redux'
import { currentUser } from './api/auth'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 

import loader from '../src/images/loading.gif'
import './css/style.css'

const Header =lazy(() => import ('./component/Header'))
const Details =lazy(() => import ('./pages/Details'))

const App = () => {
  const dispatch = useDispatch()

 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user)=> {
      
      if(user) {
        const idTokenResult = await user.getIdTokenResult()

        // Use current instead of createOrUpdate to prevent losing info
        
        currentUser(idTokenResult.token).then(res => {
          dispatch({
            type:'LOGGED_IN_USER',
            payload: {
              name:res.data.name,
              email:res.data.email,
              token:idTokenResult.token,
              role:res.data.role,
              _id:res.data._id,
            }
          })
        }).catch(err => {
        })
       
      }
    })

    return () => unsubscribe()
  },[dispatch])
  return (
    <Suspense fallback = {
      <div className="loader_bg">
        <div className="loader"><img src={loader} alt="#" /></div>
    </div>
    }>
      

      <Header/>
      <ToastContainer/>
        <Switch>
          <Route exact path = '/' component ={Home} />
          <Route exact path = '/search' component ={Search} />
          <Route exact path = '/search-image' component ={SearchImage} />
          <Route exact path = '/about' component ={About} />
          <Route exact path = '/statistics' component ={Statistics} />
          <Route exact path = '/help' component ={Help} />
          <Route path = '/details-specie/:slug' component ={Details} />
          <Route exact path = '/details-:type/:slug' component ={DetailsRoot} />
          <Route exact path = '/plants' component ={Plants} />
          <Route exact path = '/login' component ={Login} />
          <Route exact path = '/register' component ={Register} />
          <Route exact path = '/register/complete' component ={RegisterComplete} />
          <Route exact path = '/map' component ={Map} />
          
          <Route exact path = '/tree' component ={FileExplorer} />
        

          <AdminRoute exact path = '/admin/dashboard' component ={Dashboard} />
          <AdminRoute exact path = '/admin/ordo' component ={OrdoCreate} />
          <AdminRoute exact path = '/admin/ordo-home' component ={OrdoHome} />
          <AdminRoute exact path = '/admin/familia' component ={FamiliaCreate} />
          <AdminRoute exact path = '/admin/genus' component ={GenusCreate} />
          <AdminRoute exact path = '/admin/specie' component ={SpecieCreate} />
          <AdminRoute exact path = '/admin/specie/:slug' component ={SpecieEdit} />
          <AdminRoute exact path = '/admin/ordo/:slug' component ={OrdoEdit} />
          <AdminRoute exact path = '/admin/familia/:slug' component ={FamiliaEdit} />
          <AdminRoute exact path = '/admin/genus/:slug' component ={GenusEdit} />
          <Route exact path = '/forgot/password' component ={PasswordForgot} />
        
          

        </Switch>
      <Footer/>

    </Suspense>
  )
}

export default App
