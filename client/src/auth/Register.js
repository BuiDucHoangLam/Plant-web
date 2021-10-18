import React, { useState } from 'react'
import {auth} from '../auth/firebase'
import {toast} from 'react-toastify'
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'antd'
import { useTranslation } from 'react-i18next'

const Register = () => {
  const [email,setEmail] = useState('')
  const {t} = useTranslation()

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
    return <form onSubmit ={handleSubmit} style={{background:'none'}}>
      <input type="email" placeholder={t('insertEmailRegister')} className ='form-control' value ={email} onChange ={e=> setEmail(e.target.value)} autoFocus />
      <Button block
            onClick ={handleSubmit}
            shape='round'
            size='large' type='submit' className ='btn btn-raised'>{t('confirm')} </Button>
    </form>
  }

  return (
    <div className ='main-layout' style ={{marginTop:'200px'}}>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>{t('register')} </h4>
            {registerForm()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
