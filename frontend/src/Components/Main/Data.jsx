import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import UserContext from '../Context/UserContext';
import axios from 'axios';
import Layout from '../Layout';

function Data() {
  const {setUserToken, setUserAnswers} = useContext(UserContext);
  const {userToken, userAnswers} = useContext(UserContext);
  const [username, setUsername] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const session_username = sessionStorage.getItem('username');
    if(token ||( userToken && userAnswers)){ 
      axios.get('/api/user-data/'+token)
      .then(function (response) {
        // handle success
        let {userName, ...userAnswers} = response['data'];
        setUserToken(token);
        setUserAnswers(userAnswers)
        setUsername(session_username);
        if(!userAnswers.step_one_answer){
          navigate('/forms/step-1')
        }else if(!userAnswers.step_two_answer){
          navigate('/forms/step-2')
        }else if(!userAnswers.step_three_answer){
          navigate('/forms/step-3')
        }
      })
      .catch(function (error) {
        // handle error
        alert('An error occured')
      })
    }else{
      navigate('/auth');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <article style={{minHeight : '500px'}}>
        <header className="alert alert-secondary d-flex justify-content-between align-items-center">
          <div>Hi! {username}</div>
          <Link to="/auth" className="btn btn-sm btn-danger">Logout</Link>  
        </header>
        <section>
          <div className="mb-3 mt-4">
            <label className="form-label">What gets wetter the more it dries?</label>
            <input type="text" className="form-control mt-1 bg-light" value={userAnswers?.step_one_answer || ''} readOnly/>
          </div>
          <div className="mb-3 mt-4">
            <label className="form-label">I'm tall when I'm young, and I'm short when I'm old. What am I?</label>
            <input type="text" className="form-control mt-1 bg-light" value={userAnswers?.step_two_answer || ''} readOnly/>
          </div>
          <div className="mb-3 mt-4">
            <label className="form-label">What is full of holes but still holds water?</label>
            <input type="text" className="form-control mt-1 bg-light" value={userAnswers?.step_three_answer || ''} readOnly/>
          </div>
        </section>
      </article>
    </Layout>
  )
}

export default Data
