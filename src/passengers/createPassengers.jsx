import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { connect } from "react-redux";
import {addNewPassenger} from "../redux/actions";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {useParams } from 'react-router-dom';
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

 function CreatePassengers(props) {
  let {id} = useParams();
  const servicesCopyForUser ={
    "special_meals": [
      {
        "id":0,
        "meal":"Veg Meal",
        "selected":false
      },
      {
        "id":1,
        "meal":"Non-Veg Meal",
        "selected":false
      },{
        "id":2,
        "meal":"child food",
        "selected":false
      },
      {
        "id":3,
        "meal":"alcohol",
        "selected":false
      }
    ],
    "ancillary": [
      {
        "id":0,
        "service":"Paid Baggage Services",
        "selected":false
      },
      {
        "id":1,
        "service":"Lounges",
        "selected":false
      },
      {
        "id":2,
        "service":"Preferred Seat Purchase",
        "selected":false
      },
      {
        "id":3,
        "service":"Pre-book our vitality and spa",
        "selected":false
      },
      {
        "id":4,
        "service":"Car Rental",
        "selected":false
      }
    ],
    "shop":[
      {
        "id":0,
        "shop":"shoe",
        "selected":false
      },
      {
        "id":1,
        "shop":"bag",
        "selected":false
      }
    ]
  }
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {addNewPassenger} = props;
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
    "wheelChair":"",
    "flight_id":id
  });
  const TextFieldCss ={
    'margin':'5px'
  }
  const handleDateChange =(date) =>{
    let userCopy = {...User};
    userCopy['date_of_birth'] =date.format("DD-MM-YYYY");
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
  }
  const handelSubmit =(event) =>{
    let userCopy = {...User};
    if(userCopy.date_of_birth === dayjs().format("DD-MM-YYYY")){
      userCopy.date_of_birth =""
    }

    userCopy["id"] = Math.floor(Math.random() * 10)+userCopy.last_name;
    userCopy["ancillary"] =servicesCopyForUser.ancillary;
    userCopy["special_meals"] =servicesCopyForUser.special_meals
    userCopy["shop"] =servicesCopyForUser.shop;
    setUser(userCopy)
    event.preventDefault();
    addNewPassenger(userCopy);
    let resetUserObj ={
      'first_name':"",
      'last_name':"",
      'mobile_no':"",
      "id":"",
      'date_of_birth':dayjs().format("DD-MM-YYYY"),
      'passport':"",
      'address':"",
      'gender':"",
      "infant":"",
      "wheelChair":""
    }
    setUser(resetUserObj);
    handleClose();

  }

  return (
    <>
      <Button variant="outlined"  color='success'  style={{ margin:'10px'}} onClick={handleOpen}>Create</Button>
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
              {/* <TextField id="date_of_birth" classes ={TextFieldCss} type="date"  InputLabelProps={{
                      shrink: true,
                    }} size='normal' format="dd-MM-yyyy" margin="dense" label="Date of Birth" variant="standard" value={User.date_of_birth} onChange={handleChange} /> */}
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DesktopDatePicker
                          label="Date Of Birth"
                          value={User.date_of_birth}
                          format="DD-MM-YYYY"
                          onChange={(newValue) => {
                            handleDateChange(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                     </LocalizationProvider>
                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                              margin="normal"
                                              id="date_of_birth"
                                              name="date_of_birth"
                                              label="Date of Birth"
                                              format="MM-dd-yyyy"
                                              value={User.date_of_birth}
                                              onChange={handleDateChange}
                                              KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                              }}
                                            />
                            </MuiPickersUtilsProvider> */}
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
          <Button variant="outlined" type="submit"  color="success" onClick={handelSubmit} size="small"  style={{ margin:'5px',float:"right"}} >Add</Button>
          </Form>
      

        </Box>
      </Modal>
    </>
  );
}
const mapStateToProps =state =>({
  selected_user:state.selected_user
})
const mapDispatchToProps = dispatch =>{
  return ({
    addNewPassenger : (data) =>dispatch(addNewPassenger(data))
  })

}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePassengers);