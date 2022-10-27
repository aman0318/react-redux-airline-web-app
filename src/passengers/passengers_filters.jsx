import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {useState,useEffect} from 'react';
import { connect } from 'react-redux';
import React  from 'react';
import {filterPassengersDetails,setSelectedUserDetails} from "../redux/actions"
function PassengerFilters (props){
  const [applieadFilters, setFilters] = useState({});
  const [filterBasedOn,setFilterBasedOn] = useState({});
  const {user_details,filterPassengersDetails,setSelectedUserDetails} = props;
  const loginDetails = JSON.parse(localStorage.getItem("login"));
  const handleChange = (event) => {
      let check = applieadFilters;
      check[event.target.value] =event.target.checked;
      setFilters({...check});
     
      let newfill = filterBasedOn ;
      if( newfill[event.target.value]=== undefined || event.target.checked) {
        newfill[event.target.value] =event.target.checked;
        setFilterBasedOn({...newfill});
      }
      else{
        delete newfill[event.target.value]
        setFilterBasedOn(newfill);
  
      }
      handleFilterChange(event.target.value);
  };
  const handleFilterChange =(filter) =>{
    let dataToBeFilter =user_details;
    var newData =[];
    for(let key in filterBasedOn){
      if(loginDetails.role ==="admin"){
         newData = dataToBeFilter.filter(function(item)
          {
            
            return item[key] ==="" || item[key].length ===0;
          
          }) 
      }
      else{
         newData = dataToBeFilter.filter(function(item)
        {
          
          return filterBasedOn[key] ===true? item[key]===true:item;
        
        }) 
        
      }
      
      dataToBeFilter = newData;
    }
      ;
     if(dataToBeFilter.length ===0){
      setSelectedUserDetails({});
     }
    filterPassengersDetails(dataToBeFilter);
  }
  useEffect(() => {
    
    handleFilterChange();
    
    // eslint-disable-next-line
    }, [props])
  return(
    <>
        <FormControl component="fieldset">
          {loginDetails.role ==="admin"?
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="withoutPassport"
                control={<Checkbox value='passport' onChange={handleChange} />}
                label="Without Passport"
                labelPlacement="end"
                className='mr-10'
              />
              <FormControlLabel
                value="noAdd"
                control={<Checkbox value='address' onChange={handleChange} />}
                label="No Address"
                labelPlacement="end"
              />
              <FormControlLabel
                value="noDOB"
                control={<Checkbox value='date_of_birth' onChange={handleChange} />}
                label="No Date of Birth"
                labelPlacement="end"
              />
            </FormGroup>
            :
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="checked_in"
                control={<Checkbox value='checked_in' onChange={handleChange} />}
                label="Passenger Checked In"
                labelPlacement="end"
                className='mr-10'
              />
              <FormControlLabel
                value="wheelChair"
                control={<Checkbox value='wheelChair' onChange={handleChange} />}
                label="Wheel Chair"
                labelPlacement="end"
              />
              <FormControlLabel
                value="infant"
                control={<Checkbox value='infant' onChange={handleChange} />}
                label="Infant"
                labelPlacement="end"
              />
            </FormGroup>
          }
        </FormControl>
    </>
  )
}


const mapStateToProps = state => ({
  user_details: state.user_details,
});

const mapDispatchToProps = dispatch => {
  return({
    filterPassengersDetails:(data) =>dispatch(filterPassengersDetails(data)),
    setSelectedUserDetails:(data) =>dispatch(setSelectedUserDetails(data))
});
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PassengerFilters);