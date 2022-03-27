import React,{useState,useEffect} from 'react'
import {auth} from '../auth/firebase'

import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const PasswordChange = ({history}) => {
  const [email,setEmail] = useState('')
  const [loading,setLoading] = useState(false)

  const {user} = useSelector((state) => ({...state}))

  useEffect(()=>{
    if(user && user.token)
      history.push('/')
  },[user,history])

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const config = {
      url:process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    }

    await auth.sendPasswordResetEmail(email,config)
      .then(()=> {
        setEmail('')
        setLoading(false)
        toast.success("Check your email for reset password link!")
      })
      .catch((error)=>{
        setLoading(false)
        toast.error(error.message)
      })
  }

  return (
    <div className="container col-md-6 offset-md-3 p-5" style ={{marginTop:'200px'}}>
      {loading 
      ? <h4 className ="text-danger">Loading...</h4> 
      :<h4>Forgot Password</h4>
      }

      <form onSubmit ={handleSubmit} style ={{background:'none'}}>
        <input 
          type ='email' 
          className ="form-control"
          value = {email}
          onChange = {e=>setEmail(e.target.value)}
          placeholder = 'Insert your email here!'
          autoFocus
        />
        <br/>
        <button 
          className = "btn btn-raised"
          disabled={!email}
        >
          Submit
        </button>
      </form>
      
    </div>
  )
}

export default PasswordChange
