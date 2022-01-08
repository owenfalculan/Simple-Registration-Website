import React from 'react'
import { useState, useContext } from 'react';
import { Link, useNavigate  } from 'react-router-dom'
import UserContext from '../Context/UserContext';
import axios from 'axios';

function StepThree() {
  const {userToken, userAnswers} = useContext(UserContext);
  const { setUserAnswers} = useContext(UserContext);
  const [answer, setAnswer] = useState(userAnswers?.step_three_answer || '');

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(answer.trim()){
      if(answer.trim() !== userAnswers?.step_three_answer){
        axios.post("/api/submit-answer",{
          token: userToken, answer, step: '3'
        }).then((response) => {
          console.log(response)
          if(response['status'] === 200){
            setUserAnswers({...userAnswers ,step_three_answer: answer})
            navigate('/')
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }else{
        navigate('/')
      }
    }
    setAnswer('');
  }

  return (
    <div style={{ minHeight : '500px', position: 'relative'}}>
      <header className="alert alert-secondary d-flex justify-content-between align-items-center">
        <strong>Step 3</strong>   
        <Link to="/auth" className="btn btn-sm btn-danger">Logout</Link>  
      </header>
      <form className="needs-validation" onSubmit={handleSubmit}>
        <div className="mb-3 mt-4">
          <label className="form-label">What is full of holes but still holds water?</label>
          <input type="text" className="form-control mt-2" placeholder="Enter your answer" value={answer} onChange={e => setAnswer(e.target.value)} required/>
        </div>
        <div style={{position: 'absolute', bottom: 0, left: 0}}>
          <Link to="/forms/step-2" className="btn btn-sm btn-secondary">Back</Link>       
        </div>  
        <div className='text-center' style={{position: 'absolute', bottom: 0, right: 0}}>
          <button type="submit" className="btn btn-sm btn-dark mt-3">Next</button><br />
        </div>  
      </form>
    </div>
  )
}

export default StepThree
