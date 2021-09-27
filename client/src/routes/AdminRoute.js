import React, {useEffect, useState} from 'react'
import {Route} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { currentAdmin } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'

const AdminRoute = ({children,...rest}) => {
  const {user} = useSelector(state => state)
  const [ok,setOk] = useState(false)

  useEffect(()=>{
    if(user && user.token) {
      currentAdmin(user.token)
      .then(res => {
        console.log('Current Admin Response',res);
        setOk(true)
      })
      .catch(err => {
        console.log('Admin Route Error',err);
        setOk(false)
      })
    }
  }, [user])

  return (
    ok 
    ? <Route {...rest} /> 
    : <LoadingToRedirect />
    
  )
}

export default AdminRoute
