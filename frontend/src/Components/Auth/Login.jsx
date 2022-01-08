import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate  } from 'react-router-dom'
import loginImage from '../../images/login-image.png'
import axios from 'axios';
import UserContext from '../Context/UserContext';

function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const {setUserToken, setUserAnswers} = useContext(UserContext);

  useEffect(() => {
    setUserToken('')
    setUserAnswers({})
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginStatus('loading');
    axios.post("/api/login-user",{
      username, password
    }).then((response) => {
      if(response['status']===200){
        setUserToken(response['data']['token'])
        setUserAnswers(response['data']['answers'])
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('token', response['data']['token'])
        setUsername('');
        setPassword('');
        navigate('/');
      }else{
        setLoginStatus('failed');
      }
    })
    .catch((error) => {
      setLoginStatus('failed');
    });
  }
  
  return (
    <div className='row' style={{minHeight : '500px'}}>
      <section className="col-sm-6 d-flex align-items-center">
        <img src={loginImage} className='w-100 justify-content-center' alt="LoginImage"/>
      </section>
      <section className="col-sm-6 d-flex align-items-center px-3">
        <article className='w-100'>
          <div className='my-4 text-center'>
             <h1 className="display-6 text-dark">Login</h1>
          </div>
          <form className="needs-validation" onSubmit={handleSubmit}>
            <div className="input-group my-3">
              <span className="input-group-text">
                <Icon icon="healthicons:ui-user-profile" style={{ fontSize: '25px' }} />
              </span>
              <input type="text" className="form-control" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required/>
            </div>
            <div className="input-group my-3">
              <span className="input-group-text">
                <Icon icon="wpf:password1" style={{ fontSize: '25px' }} />
              </span>
              <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
            </div>
            <LoginStatus status={loginStatus}/>
            <div className='text-center'>
              <button type="submit" className="btn btn-sm btn-dark mt-3">Sign in</button><br />
            </div>  
          </form>
          <div className='text-center mt-5'>
            <span className='text-secondary'>Need an account? {' '}</span>
            <Link to="/auth/register" className="mt-3 text-primary">Register here</Link>
          </div>
        </article>
      </section>
    </div>
  )
}

function LoginStatus({ status }){
  if(status==='failed'){
    return (
      <div className="text-center alert alert-danger alert-dismissible p-2">
        <button type="button" className="btn-close pt-1" data-bs-dismiss="alert"></button>
        <span>Login failed!</span>
      </div>
    )
  }else if(status==='loading'){
    return (
      <div className="text-center">
        <button className="btn btn-danger">
          <span className="spinner-border spinner-border-sm"></span>
          <span style={{ marginLeft: '10px' }}>Please wait..</span>
        </button>
      </div>
    )
  }
  return null
}

export default Login
