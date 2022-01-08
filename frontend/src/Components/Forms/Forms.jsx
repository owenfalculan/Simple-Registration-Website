import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import Layout from '../Layout';
import { useEffect, useContext } from 'react';
import UserContext from '../Context/UserContext';
import axios from 'axios';

function Forms() {
  const {setUserToken, setUserAnswers} = useContext(UserContext);
  const {userToken, userAnswers} = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if(token || ( userToken && userAnswers)){ 
      axios.get('/api/user-data/'+token)
      .then(function (response) {
        // handle success
        const {userName, ...userAnswers} = response['data'];
        setUserToken(token);
        setUserAnswers(userAnswers)
        if(!userAnswers.step_one_answer){
          navigate('/forms/step-1')
        }else if(!userAnswers.step_two_answer){
          navigate('/forms/step-2')
        }else if(!userAnswers.step_three_answer){
          navigate('/forms/step-3')
        }else{
          navigate('/')
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

  if(userToken){
    return (
      <Layout>
        <Outlet/>
      </Layout>
    )
  }
  return null
}

export default Forms
