import React from 'react'
import { useState, useContext } from 'react';
import { Link, useNavigate  } from 'react-router-dom'
import UserContext from '../Context/UserContext';
import axios from 'axios';

function StepOne() {
  const {userToken, userAnswers} = useContext(UserContext);
  const { setUserAnswers} = useContext(UserContext);
  const [answer, setAnswer] = useState(userAnswers?.step_one_answer || '');

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(answer.trim()){
      axios.post("/api/submit-answer",{
        token: userToken, answer, step: '1'
      }).then((response) => {
        if(response['status'] === 200){
          setUserAnswers({...userAnswers ,step_one_answer: answer})
          setAnswer('');
          navigate('/forms/step-2')
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  return (
    <div style={{ minHeight : '500px', position: 'relative'}}>
      <header className="alert alert-secondary d-flex justify-content-between align-items-center">
        <strong>Step 1</strong>   
        <Link to="/auth" className="btn btn-sm btn-danger">Logout</Link>  
      </header>
      <form className="needs-validation" onSubmit={handleSubmit}>
        <div className="mb-3 mt-4">
          <label className="form-label">What gets wetter the more it dries?</label>
          <input type="text" className="form-control mt-2" placeholder="Enter your answer" value={answer} onChange={e => setAnswer(e.target.value)} required/>
        </div>
        <div className='text-center' style={{position: 'absolute', bottom: 0, right: 0}}>
          <button type="submit" className="btn btn-sm btn-dark mt-3">Next</button>
        </div>  
      </form>
    </div>
  )
}

export default StepOne
