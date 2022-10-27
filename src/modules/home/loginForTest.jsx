import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {authenticateUser} from '../../utils';
import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
//  import { gapi } from 'gapi-script';
function LoginForm(props){
  
  let navigate = useNavigate();
  let [User,setUser] =useState({
    'name':"",
    'password':""
  });
  const initalizeGoogleLogin = async () =>{
    return await import('gapi-script').then((pack) => pack.gapi);
  }
  const clientId ="900755840353-4v82pbvkaqal7nn6q5pc59kemto6edad.apps.googleusercontent.com"
  let [isUserPresent,setUserPresent] =useState(true);
  useEffect(() => {
     const initialization  = initalizeGoogleLogin();
     initialization.then((gapi)=>{
            const initClient = () => {
              gapi.client.init({
                  clientId: clientId,
                  scope: ''
              });
          };
        gapi.load('client:auth2', initClient);
     })
 
});
 function handelEmail (event){

  setUser({...User ,name:event.target.value});
  setUserPresent(isUserPresent = true);
 }
function handelPass(event){
  setUser({...User ,"password":event.target.value});

}
const navigateToPages =(data) =>{
  navigate('/flights');
}
const googleLoginSuccess =(event) =>{
  let data =event.profileObj
      let LocalSotrageObj = {
        "name":data.givenName,
        "role":"staff",
        "email":data.email,
        "loginby":"google"
      }
      localStorage.setItem("login",JSON.stringify(LocalSotrageObj));
      navigateToPages(LocalSotrageObj);
}
const googleLoginFaild =(event) =>{
  toast.error(event.error);
   ;
}
function handelSubmit(event) {
event.preventDefault();
setUserPresent(isUserPresent = true);
let userDetail = authenticateUser(User.name.trim(), User.password);
userDetail.then((data)=>{
  
  if(!data.length){
    setUserPresent(isUserPresent = false)
    setUser({"name":"","password":""}); 
  }
  else{
    let LocalSotrageObj = {
      "name":data[0].firstName,
      "role":data[0].role,
      "email":data[0].email,
      "loginby":"web"
    }
    localStorage.setItem("login",JSON.stringify(LocalSotrageObj));
    navigateToPages(LocalSotrageObj);
  }
})
}
  return(
    <div className='container loginContainer' >
<div className='LoginHeader'>
  Login Form

</div>
{ !isUserPresent?<div className='noUserFound'>Sorry , No user found </div>:''}

    <Form onSubmit={handelSubmit}>
        <TextField id="standard-basic" fullWidth margin="normal" label="Email address" variant="standard" value={User.name} onChange={handelEmail} />
        <TextField  fullWidth id="standard-password-input"
          label="Password"
          type="password"
          margin="normal"
          autoComplete="current-password"
          value={User.password}
          variant="standard" onChange={handelPass} />
          
        <Button type='submit' variant="outlined"   style={{color:'#71C9CE',borderColor:'#71C9CE', marginTop:'30px'}}>
          Submit
        </Button>
        <div className='googleLogin'>
            <GoogleLogin
              clientId='900755840353-4v82pbvkaqal7nn6q5pc59kemto6edad.apps.googleusercontent.com' //TODO encrypt and abtract
              onSuccess={googleLoginSuccess}
              onFailure={googleLoginFaild}
              buttonText="Sign in with Google"
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
          </div>
    </Form>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
     />
    {/* Same as */}
    <ToastContainer />
    </div>
  )
}
export default LoginForm;