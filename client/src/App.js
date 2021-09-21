import React,{lazy,Suspense} from 'react'
import {Switch,Route} from 'react-router-dom'

import Footer from './component/Footer'
import Home from './pages/Home'
import Search from './pages/Search'
import Statistics from './pages/Statistics'
import Help from './pages/Help'
import CreatePlant from './pages/CreatePlant'
import Plans from './pages/Plans'

import loader from '../src/images/loading.gif'
import './css/style.css'

const Header =lazy(() => import ('./component/Header'))
const Details =lazy(() => import ('./pages/Details'))

const App = () => {
  return (
    <Suspense fallback = {
      <div className="loader_bg">
        <div className="loader"><img src={loader} alt="#" /></div>
    </div>
    }>
      <Header/>
        <Switch>
          <Route exact path = '/' component ={Home} />
          <Route exact path = '/search' component ={Search} />
          <Route exact path = '/statistics' component ={Statistics} />
          <Route exact path = '/help' component ={Help} />
          <Route path = '/details/:slug' component ={Details} />
          <Route path = '/create' component ={CreatePlant} />
          <Route path = '/plant' component ={Plans} />
       
        </Switch>
      <Footer/>

    </Suspense>
  )
}

export default App
