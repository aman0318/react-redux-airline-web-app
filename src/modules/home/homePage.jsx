import Header from './header'
import LoginForm from './login';
import { Routes ,Route } from 'react-router-dom';
import { BrowserRouter as Router} from "react-router-dom";
import Flightlist from '../flights/flightlist';
import PasssengerMain from '../../passengers/passengers_main';
import React from 'react';
function homePage (){
  return(
    <>
  
    <div className='caseStudyText'>
      {/* <LoginForm></LoginForm> */}
      <Router>
          <Header></Header>
            <Routes>
              <Route path="/"  element={<LoginForm/>} />
              <Route path="flights"  element={<Flightlist/>} />
              <Route path="/flight_details/:id"  element={<PasssengerMain />} /> 
            </Routes> 
        </Router>

    </div>
    </>
  )
}
export default homePage;