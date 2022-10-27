import React,{useEffect, useState} from 'react';
import {useParams } from 'react-router-dom';
import {connect} from "react-redux"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl'
import {setFlightsServices} from "../../redux/actions";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

 function FlightDetailsCMP (props){
  let tabMapping  ={
    "1":"special_meals",
    "2":"shop",
    "3":"ancillary"
  }
  const {flight_list,selected_user,setFlightsServices,flight_Services} =props;
  const [flightdetails,setFlightDetails] = useState({});
  const [Tabvalue, setTabValue] = React.useState('1');
  const [Selected_User_Details ,setSelectedUsers] =useState({});
  const [flightServices,setServices] =useState({})
  const loginDetails = JSON.parse(localStorage.getItem("login"));
  const[newValue,setNewValue] =useState({
    "text":""
  });
  const handleTabChange = (event,newValue) => {
    setTabValue(newValue);
  };
  const valueChecked =(data) =>{
  let id =  data.selectedby[selected_user.id]
    return id?true:false ;
  }
  const handelNewValue =(event) =>{
    
    let val  = newValue
    val.text = event.target.value
    setNewValue({...newValue,text:val.text});
  }
  const handelAddNewValue =(event) =>{
    let mapping ={
      "1":"meal",
      "2":"shop",
      "3":"service"
    }
    const  loginRole =loginDetails.role
    // let check =loginRole ==="admin"?flightdetails:selected_user;
    let check =flightdetails;
    let objCpy = {
      [mapping[Tabvalue]]:newValue.text,
      "selected":loginRole ==="admin"?true:false,
      "id":check[tabMapping[Tabvalue]].length,
      "selectedby":{}
  }
  check[tabMapping[Tabvalue]].push({...objCpy});
  let servicesCopy =flight_Services[id];
  servicesCopy[tabMapping[Tabvalue]].push({...objCpy});
  setFlightsServices(id,servicesCopy)
  // setServices(servicesCopy);
  setNewValue({...newValue,text:""});
  if(loginRole ==="admin"){
    setFlightDetails({...check});
    return ;
  }
    //   setSelectedUsers({...check})
    // setSelectedUserDetails({...check});
    
   
  }
  const handleCheckBoxChange  =(event) =>{
   const  loginRole =loginDetails.role
    // let check =loginRole ==="admin"?flightdetails:selected_user;
    let check =flightdetails;
    let servicesCopy =flight_Services[id];
    let selectedIds = servicesCopy[tabMapping[Tabvalue]][event.target.value].selectedby
    if(loginRole ==="admin"){
      check[tabMapping[Tabvalue]].splice(event.target.value, 1);
      setFlightDetails({...check});
      servicesCopy[tabMapping[Tabvalue]].splice(event.target.value, 1);
      setFlightsServices(id,servicesCopy)
      return ;
    }
    else if(!event.target.checked && selectedIds[selected_user.id]){
     delete servicesCopy[tabMapping[Tabvalue]][event.target.value].selectedby[selected_user.id];
      setFlightsServices(id,servicesCopy);
      return ;
    }
    check[tabMapping[Tabvalue]][event.target.value].selected =event.target.checked;
    servicesCopy[tabMapping[Tabvalue]][event.target.value].selectedby[selected_user.id] =event.target.checked;
    setFlightsServices(id,servicesCopy)
  
 
    // setServices(servicesCopy);
    // setSelectedUsers({...check})
    // setSelectedUserDetails({...check});
  }
  let {id} = useParams();
  useEffect(()=>{
    setServices(flight_Services[id]);
    setSelectedUsers(selected_user);
    let Flight = flight_list.filter((item)=>{
      return item.id ===id
     })
     setFlightDetails(Flight[0]); 
   // eslint-disable-next-line
  },[selected_user,flight_Services]) // eslint-disable-line react-hooks/exhaustive-deps
  return(
    <>
     <div className='container'>
      { flightdetails && loginDetails.role !=="staff-in-flight" && loginDetails.role !=="staff"?   
       <div className='details_container'>
           <Row>
            <Col>
            <div className='lable'>
              AIRLINE 
            </div>
            <div className='valuediv'>
              {flightdetails.airline}
            </div>
            </Col>
            <Col>
            <div className='lable'>
            Flight No. 
            </div>
              <div className='valuediv'>
                {flightdetails.flightT}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
            <div className='lable'>
            DEP STN 
            </div>
            <div className='valuediv'>
              {flightdetails.departureCity}
            </div>
            </Col>
            <Col>
            <div className='lable'>
              ARV STN 
            </div>
              <div className='valuediv'>
                {flightdetails.arrivalCity}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
            <div className='lable'>
              DEP DATE 
            </div>
            <div className='valuediv'>
              {flightdetails.departureDate}
            </div>
            </Col>
            <Col>
            <div className='lable'>
              ARV DATE 
              </div>
              <div className='valuediv'>{flightdetails.arrivalDate}</div>
            </Col>
          </Row>
          <Row>
            <Col>
            <div className='lable'>
              DEP Time 
            </div>
            <div className='valuediv'>
              {flightdetails.departureTime}
            </div>
            </Col>
            <Col>
            <div className='lable'>
              ARV Time 
            </div>
            <div className='valuediv'>
              {flightdetails.arrivalTime}
            </div>
            </Col>
          </Row>

        </div>
        :<></>
       }
       {selected_user?
        <TabContext value={Tabvalue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Meal" value="1" />
            <Tab label="shopping" value="2" />
            <Tab label="Ancillary" value="3" />
          </TabList>
        </Box>
        {loginDetails.role ==="admin" && flightdetails && Selected_User_Details
        ?
        <div>
            <TabPanel value="1">
            <div className='smallMSG'>Please Uncheck to delete *
            (This is only for flights if you want to select services for  passengers please login with other account )
            </div>
            
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
               
                {(flightServices.special_meals)?
                <div>
                   <TextField id="standard-basic" size="small" variant="standard" margin="normal" label="Enter new value"  value={newValue.text}  onChange={handelNewValue}/>
                   <Button  variant="outlined" onClick={handelAddNewValue}  style={{color:'#71C9CE',borderColor:'#71C9CE',marginTop:"15px",marginLeft:"20px"}}>
                        Add
                    </Button>
                  { flightServices.special_meals.map((item,index)=>(
                      <FormControlLabel
                      key={item.id}
                      value={item.id}
                      control={<Checkbox value={index} checked={item.selected} onChange={handleCheckBoxChange} />}
                      label={item.meal}
                      labelPlacement="end"
                      className='mr-10'
                    />
                   ))
                  }
                </div>
                 :<div>
                    Loading ..
                   </div>
                }
              
               
              </FormGroup>
            </FormControl>
            </TabPanel>
            <TabPanel value="2">
            <div className='smallMSG'>Please Uncheck to delete *
            (This is only for flights if you want to select services for  passengers please login with other account )
            </div>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
               
                {(flightServices.shop)?
                <div>
                   <TextField id="standard-basic" size="small" variant="standard" margin="normal" label="Enter new value"  value={newValue.text}  onChange={handelNewValue}/>
                   <Button  variant="outlined" onClick={handelAddNewValue}  style={{color:'#71C9CE',borderColor:'#71C9CE',marginTop:"15px",marginLeft:"20px"}}>
                        Add
                    </Button>
                  { flightServices.shop.map((item,index) =>(
                      <FormControlLabel
                      key={item.id}
                      value={item.id}
                      control={<Checkbox value={index} checked={item.selected} onChange={handleCheckBoxChange} />}
                      label={item.shop}
                      labelPlacement="end"
                      className='mr-10'
                    />
                   ))
                  }
                </div>
                 :<div>
                    Loading ..
                   </div>
                }
              
               
              </FormGroup>
            </FormControl>

            </TabPanel>
            <TabPanel value="3">
            <div className='smallMSG'>Please Uncheck to delete *
            (This is only for flights if you want to select services for  passengers please login with other account )
            </div>
            <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                  <TextField id="standard-basic" size="small" variant="standard" margin="normal" label="Enter new value"  value={newValue.text}  onChange={handelNewValue}/>
                   <Button  variant="outlined" onClick={handelAddNewValue}  style={{color:'#71C9CE',borderColor:'#71C9CE',marginTop:"15px",marginLeft:"20px"}}>
                        Add
                    </Button>
                  {(flightServices.ancillary)?flightServices.ancillary.map((item,index) =>(
                      <FormControlLabel
                      key={item.id}
                      value={item.id}
                      control={<Checkbox value={index} checked={item.selected} onChange={handleCheckBoxChange} />}
                      label={item.service}
                      labelPlacement="end"
                      className='mr-10'
                    />
                    )):<div>Loading...</div>}
                    
                  
                  </FormGroup>
            </FormControl>
            </TabPanel>
        </div>  
        :
        <div> 
          
            <TabPanel value="1">
            <div className='smallMSG'>Please Uncheck to remove service request  *</div>
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    {(flightServices.special_meals)?
                    <div>
                      <div>
                        <TextField id="standard-basic" size="small" variant="standard" margin="normal" label="Enter new value"  value={newValue.text}  onChange={handelNewValue}/>
                        <Button  variant="outlined" onClick={handelAddNewValue}  style={{color:'#71C9CE',borderColor:'#71C9CE',marginTop:"15px",marginLeft:"20px"}}>
                              Add
                          </Button>
                      </div>
                    
                      { flightServices.special_meals.map((item,index) =>(
                          <FormControlLabel
                          key={item.id}
                          value={index}
                          control={<Checkbox value={item.id} checked={valueChecked(item)} onChange={handleCheckBoxChange} />}
                          label={item.meal}
                          labelPlacement="end"
                          className='mr-10'
                        />
                      ))
                      }
                    </div>
                    :<div>
                        Loading ..
                      </div>
                    }
                  
                  
                  </FormGroup>
                </FormControl>
            </TabPanel>
            <TabPanel value="2">
            <div className='smallMSG'>Please Uncheck to remove service request  *</div>
            <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    {(flightServices.shop)?
                    <div>
                      <div>
                        <TextField id="standard-basic" size="small" variant="standard" margin="normal" label="Enter new value"  value={newValue.text}  onChange={handelNewValue}/>
                        <Button  variant="outlined" onClick={handelAddNewValue}  style={{color:'#71C9CE',borderColor:'#71C9CE',marginTop:"15px",marginLeft:"20px"}}>
                              Add
                          </Button>
                      </div>
                    
                      { flightServices.shop.map((item,index) =>(
                          <FormControlLabel
                          key={item.id}
                          value={index}
                          control={<Checkbox value={index} checked={valueChecked(item)} onChange={handleCheckBoxChange} />}
                          label={item.shop}
                          labelPlacement="end"
                          className='mr-10'
                        />
                      ))
                      }
                    </div>
                    :<div>
                        Loading ..
                      </div>
                    }
                  
                  
                  </FormGroup>
                </FormControl>

            </TabPanel>
            <TabPanel value="3">
            <div className='smallMSG'>Please Uncheck to remove service request  *</div>
            <div>
                        <TextField id="standard-basic" size="small" variant="standard" margin="normal" label="Enter new value"  value={newValue.text}  onChange={handelNewValue}/>
                        <Button  variant="outlined" onClick={handelAddNewValue}  style={{color:'#71C9CE',borderColor:'#71C9CE',marginTop:"15px",marginLeft:"20px"}}>
                              Add
                          </Button>
              </div>
            <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                  
                  {(flightServices.ancillary)?flightServices.ancillary.map((item,index) =>(
                      <FormControlLabel
                      key={item.id}
                      value={index}
                      control={<Checkbox value={index} checked={valueChecked(item)} onChange={handleCheckBoxChange} />}
                      label={item.service}
                      labelPlacement="end"
                      className='mr-10'
                    />
                    )):<div>Loading...</div>}
                    
                  
                  </FormGroup>
                </FormControl>
            </TabPanel>
        </div>
        }
       
      </TabContext>
      :
      <div>Loading ...</div>
      }
     
     </div>
    </>
  )
 }
 const mapStateToProps =(state) =>{
  return({
    
    flight_list:state.flight_list,
    selected_user:state.selected_user,
    flight_Services:state.flight_Services
  })
}
const mapDispatchToProps =(dispatch) =>{
  return({
    // setSelectedUserDetails:(data) =>dispatch(setSelectedUserDetails(data)),
    // setUser: (data) => dispatch(setUser(data))
    setFlightsServices:(id,data) =>dispatch(setFlightsServices(id,data))
  })
}
 export default connect(
  mapStateToProps,
  mapDispatchToProps
 ) (FlightDetailsCMP);