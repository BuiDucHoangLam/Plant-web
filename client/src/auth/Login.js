import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { auth, googleAuthProvider } from './firebase'
import { toast } from 'react-toastify'
import { useDispatch,useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import {Button} from 'antd'
import {MailOutlined, GoogleOutlined} from '@ant-design/icons';
import { createOrUpdateUser } from '../api/auth'
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const Login = () => {
  const [email,setEmail] = useState('longcot000@gmail.com')
  const [password,setPassword] = useState('123456')
  const [loading,setLoading] = useState(false)

  const {user} = useSelector(state => ({...state}))
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if(user && user.token) history.push('/') 
  },[user])

  const redirectRole = (role) => {
    role === 'admin' ? history.push('/admin/dashboard') : history.push('/')
  } 

  const loginForm = () => {
    return(
      <form onSubmit={handleSubmit} style ={{background:'none'}}>
      <div className ="form-group">
        <input 
          type='email' 
          className='form-control' 
          value={email} 
          onChange={e=>setEmail(e.target.value)}
          placeholder="Nhập email"
          autoFocus
        />
      </div>
      <div className ="form-group">
       <input 
        type='password' 
        className='form-control' 
        value={password} 
        onChange={e=>setPassword(e.target.value)}
        placeholder="Nhập mật khẩu"
        autoFocus
      />
      </div>
      <br/>
      <Button 
        onClick={handleSubmit}
        type='primary'
        className="mb-3"
        block
        shape='round'
        size='large'
        icon ={<MailOutlined/>}
        disabled={!email || password.length < 6}
      >
        Login with Email
      </Button>
      <Button 
            onClick={googleSubmit}
            type='danger'
            className="mb-3"
            block
            shape='round'
            size='large'
            icon ={<GoogleOutlined/>}
          >
            Login with Google
          </Button>

          <Link to="/forgot/password" style ={{marginLeft:'50px',background:'none',width:'100%'}} className ='text-danger' >
            Forgot Password
          </Link>
    </form>
    )
    
  }

  const googleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    auth.signInWithPopup(googleAuthProvider).then(async res => {
      const {user} = res
      const idTokenResult = await user.getIdTokenResult()
      createOrUpdateUser(idTokenResult.token).then(res => {
        console.log(res);
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
        redirectRole(res.data.role)
      }).catch(
        err => console.log(err)
      )
      toast.success('Đăng nhập thành công!')
      // history.push('/')
    }).catch(error => {
      console.log('err',error);
      toast.error('Đăng nhập với google thất bại!')
      setLoading(false)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(email,password);
    try {
      const result = await auth.signInWithEmailAndPassword(email,password)
      const {user} = result
      const idTokenResult = await user.getIdTokenResult()
      console.log(result);

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
        redirectRole(res.data.role)

      }).catch(
        err => console.log(err)
      )
      
      toast.success('Đăng nhập thành công!')
      // history.push('/')
    } catch (error) {
      console.log('err',error);
      toast.error('Đăng nhập thất bại')
      setLoading(false)
    }

  }
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3"  style ={{marginTop:'200px'}}>
          { !loading ?  <h4 style={{alignItems:'center'}}>Login</h4> : <h4 className="text-danger">Loading...</h4>}
          {loginForm()}

         
        </div>
      </div>
    </div>
  )
}

export default Login
