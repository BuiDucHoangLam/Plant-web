import React,{useState,useEffect} from 'react'
import { auth } from './firebase'
import { createOrUpdateUser } from '../api/auth'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

const RegisterComplete = ({history}) => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {t} = useTranslation()

  const dispatch = useDispatch()

  useEffect(() => {
    
    setEmail(window.localStorage.getItem('emailRegistration'))
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await auth.signInWithEmailLink(email,window.location.href)
      if(result.user.emailVerified) {
        window.localStorage.removeItem('emailRegistration')
        let user =auth.currentUser
        await user.updatePassword(password)
        const idTokenResult = user.getIdTokenResult()
        console.log('user',user,'id',idTokenResult);
        createOrUpdateUser(idTokenResult.token).then(res => {
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
        }).catch(
  
        )
        history.push('/')
      }
    } catch (error) {
      
    }
  }

  const registerCompleteForm = () => {
    return <form onSubmit ={handleSubmit}>
      <input type="email" className ='form-control' value ={email} disabled/>
      <input type="password" placeholder ={t('insertPassword')} className ='form-control' value ={password} onChange ={e=> setPassword(e.target.value)} autoFocus />
      <br />
      <button type='submit' className ='btn btn-raised'>{t('confirm')} </button>
    </form>
  }

  return (
    <div className = 'main-layout' style ={{marginTop:'200px'}}>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>{t('registerComplete')} </h4>
            {registerCompleteForm()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterComplete
