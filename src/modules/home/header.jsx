import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import {GoogleLogout } from 'react-google-login';
function Header(props){
  const clientId ="900755840353-4v82pbvkaqal7nn6q5pc59kemto6edad.apps.googleusercontent.com"
  const loginDetails = JSON.parse(localStorage.getItem("login"));
  const navigate = useNavigate();
  const handleLogOut = () =>{
    navigate("/")
    // localStorage.clear();
    localStorage.removeItem("login");
   
  }
  return(
    <Navbar >
        <Container >
          <Navbar.Brand href="/">
            <div className='brand'>
                <div className='BrandName'> Airline</div>
            </div> 
          </Navbar.Brand>
          {loginDetails ?
          <div className='login-logout'>
          {loginDetails.loginby ==="web"?
            <Button  variant="outlined"  onClick={handleLogOut}  style={{color:'black',borderColor:'rgb(143 165 166)'}}>
                Logout ({loginDetails.name})
          </Button>
           
         
            : <GoogleLogout clientId={clientId} onLogoutSuccess={handleLogOut}>Logout ({loginDetails.name})</GoogleLogout>
          
          }
        </div>
        :""}

        </Container>
      </Navbar>
  )
}
export default Header;