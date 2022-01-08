import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth, Login, Register } from "./Components/Auth"
import { Forms, StepOne, StepTwo, StepThree } from "./Components/Forms";
import Page404 from "./Components/Page404";
import "./App.css";
import UserContext from "./Components/Context/UserContext";
import { useState } from 'react'
import Data from "./Components/Main/Data";

function App() {
  const [userToken, setUserToken] = useState('');
  const [userAnswers, setUserAnswers] = useState({});

  return (
    <UserContext.Provider value={{userToken, setUserToken, userAnswers, setUserAnswers}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Data />} />
          <Route path="auth" element={<Auth/>}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="forms" element={<Forms/>}>
            <Route path="step-1" element={<StepOne />} />
            <Route path="step-2" element={<StepTwo />} />
            <Route path="step-3" element={<StepThree />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;
