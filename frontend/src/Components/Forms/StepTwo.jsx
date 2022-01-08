import React from 'react'
import { useState, useContext } from 'react';
import { Link, useNavigate  } from 'react-router-dom'
import UserContext from '../Context/UserContext';
import axios from 'axios';

function StepTwo() {
  const {userToken, userAnswers} = useContext(UserContext);
  const { setUserAnswers} = useContext(UserContext);
  const [answer, setAnswer] = useState(userAnswers?.step_two_answer || '');

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(answer.trim()){
      axios.post("/api/submit-answer",{
        token: userToken, answer, step: '2'
      }).then((response) => {
        if(response['status'] === 200){
          setUserAnswers({...userAnswers ,step_two_answer: answer})
          navigate('/forms/step-3')
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
    setAnswer('');
  }

  return (
    <div style={{ minHeight : '500px', position: 'relative'}}>
      <header className="alert alert-secondary d-flex justify-content-between align-items-center">
        <strong>Step 2</strong>   
        <Link to="/auth" className="btn btn-sm btn-danger">Logout</Link>  
      </header>
      <form className="needs-validation" onSubmit={handleSubmit}>
        <div className="mb-3 mt-4">
          <label className="form-label">I'm tall when I'm young, and I'm short when I'm old. What am I?</label>
          <input type="text" className="form-control mt-2" placeholder="Enter your answer" value={answer} onChange={e => setAnswer(e.target.value)} required/>
        </div>
        <div style={{position: 'absolute', bottom: 0, left: 0}}>
          <Link to="/forms/step-1" className="btn btn-sm btn-secondary">Back</Link>       
        </div>  
        <div style={{position: 'absolute', bottom: 0, right: 0}}>
          <button type="submit" className="btn btn-sm btn-dark">Next</button>
        </div>  
      </form>
    </div>
  )
}

export default StepTwo
