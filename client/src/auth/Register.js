import React, { useState } from 'react'
import {auth} from '../auth/firebase'
import {toast} from 'react-toastify'

const Register = () => {
  const [email,setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL);
    const config = {
      url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp:true
    }
    await auth.sendSignInLinkToEmail(email,config)
    toast.success(`Link is sent to ${email}. Click to complete your registration!`)
    window.localStorage.setItem('emailRegistration',email)
  }

  const registerForm = () => {
    return <form onSubmit ={handleSubmit}>
      <input type="email" placeholder='Nhập email muốn đăng ký' className ='form-control' value ={email} onChange ={e=> setEmail(e.target.value)} autoFocus />
      <button type='submit' className ='btn btn-raised'>Xác nhận</button>
    </form>
  }

  return (
    <div className ='main-layout' style ={{marginTop:'200px'}}>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Đăng ký</h4>
            {registerForm()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
