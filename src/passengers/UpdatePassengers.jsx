import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
// import dayjs from 'dayjs';
import React, { useState,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { connect } from "react-redux";
import {updateUserDetails,setSelectedUserDetails} from "../redux/actions";
import { ToastContainer, toast } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";
 import 'react-toastify/dist/ReactToastify.css';
const useStyles = makeStyles({
  root: {
    '& .MuiTextField-root': {
      margin: '1ch',
      width: '19ch',
    },
  },
});
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'white',
  boxShadow: '0px 11px 17px 1px #5a4b4b',
  p: 4,
};
const genders = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
  {
    value: 'Other',
    label: 'Other',
  }
];
 function UpdatePassengers(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {updateUserDetails,selected_user,setSelectedUserDetails} = props;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let [User,setUser] =useState({
    'first_name':"",
    'last_name':"",
    'mobile_no':"",
    'date_of_birth':"",
    'passport':"",
    'address':"",
    'gender':"",
    "infant":"",
    "wheelChair":""
  });
  useEffect(()=>{
    if(selected_user && selected_user.id !== ""){
      let newUser =selected_user
      setUser(newUser)
    }
    
    // eslint-disable-next-line
},[props])
  const TextFieldCss ={
    'margin':'5px'
  }
  const handleDateSelect =(date) =>{
    
    let userCopy = {...User};
     userCopy['date_of_birth'] =date.format("DD/MM/YYYY");   
    setUser(userCopy);   
  }
  const handleChange =(event) =>{
    let name  = event.target.name ;
    let value = event.target.value;
    let userCopy = {...User};
    userCopy[name] =value;
    setUser(userCopy);
  }
  const handleCheck =(event) =>{
    let name  = event.target.name ;
    let ischecked = event.target.checked;
    let userCopy = {...User};
    userCopy[name] =ischecked?'T':'F';
    setUser(userCopy); 
  };
  const handleToast =() =>{
    
    toast.error("Please Select Passenger.");
  };
  const handelSubmit =(event) =>{ 
    let userCopy = {...User};
    event.preventDefault();
    updateUserDetails(userCopy);
    setSelectedUserDetails(userCopy);
    handleClose();
    let user_reset ={
      'first_name':"",
      "id":"",
      'last_name':"",
      'mobile_no':"",
      'date_of_birth':"",
      'passport':"",
      'address':"",
      'gender':"",
      "infant":"",
      "wheelChair":""
    };
    setUser(user_reset);

  }

  return (
    <>
       {Object.keys(selected_user).length >1?
      <Button variant="outlined"  color='error'  style={{ margin:'10px'}} onClick={handleOpen}>Update</Button>
      :<Button variant="outlined"  color="error"  style={{ margin:'10px'}} onClick={handleToast}>Update</Button>
    }
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form className={classes.root}  noValidate autoComplete="off">
              <TextField id="first_name" name="first_name" classes ={TextFieldCss} size='normal' margin="dense" label="First Name" variant="standard" value={User.first_name} onChange={handleChange} />
              <TextField id="last_name" name="last_name" size='normal' margin="dense" label="Last Name" variant="standard" value={User.last_name} onChange={handleChange} />   
            
              <TextField id="passport" name="passport" size='normal' margin="dense" label="Passport" variant="standard" value={User.passport} onChange={handleChange} />   
              <TextField id="mobile_no" name="mobile_no" type="number"
                    InputLabelProps={{
                      shrink: true,
                    }} classes ={TextFieldCss} size='normal' margin="dense" label="Mobile " variant="standard" value={User.mobile_no} onChange={handleChange} />
              <TextField id="address" name="address" size='normal' margin="dense" label="Address" variant="standard" value={User.address} onChange={handleChange} />   
              <TextField
                    id="standard-select-gender"
                    select
                    label="Gender"
                    name="gender"
                    value={User.gender}
                    variant="standard"
                    onChange={handleChange}
                    helperText="Please select Gender"
                  >
                    {genders.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </TextField>
                <FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              control={<Checkbox name='infant'  checked={User.infant ==="T"} onChange={handleCheck} />}
              label="infant"
              labelPlacement="bottom"
              className='mr-10'
            />
            <FormControlLabel
              control={<Checkbox name="wheelChair" checked={User.wheelChair ==="T"}  onChange={handleCheck} />}
              label="Wheel Chair"
              labelPlacement="bottom"
            />
          </FormGroup>
         
        </FormControl>
        <div></div>
          
          <Button variant="outlined"   color="error" size="small" style={{ margin:'5px',float:'right'}} onClick={handleClose}>Close</Button>
          <Button variant="outlined"  onClick={handelSubmit}  color="success" size="small"  style={{ margin:'5px',float:"right"}} >Add</Button>
      </Form>
      

        </Box>
      </Modal>
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
    </>
  );
}
const mapStateToProps =state =>({
  selected_user:state.selected_user
})
const mapDispatchToProps = dispatch =>{
  return ({
    updateUserDetails : (data) =>dispatch(updateUserDetails(data)),
    setSelectedUserDetails:(data) =>dispatch(setSelectedUserDetails(data))
  })

}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePassengers);