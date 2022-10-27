import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { styled } from '@mui/material/styles';
import  { tableCellClasses } from '@mui/material/TableCell';
import React, { useEffect } from 'react';
import Radio from '@mui/material/Radio';
import CreatePassengers from './createPassengers';
import UpdatePassengers from './UpdatePassengers';
import {connect} from "react-redux";
import {setSelectedUserDetails} from "../redux/actions";
import {useParams } from 'react-router-dom';
function PassengersDetails(props){

  const {setSelectedUserDetails,filtered_data,selected_user,flight_Services}=props;
  const loginDetails = JSON.parse(localStorage.getItem("login"));
  let {id} = useParams();
  useEffect(()=>{
    if(filtered_data[0]){  
        let checkArray =selected_user.id ?filtered_data.filter((item)=>{
          return parseInt(item.id) ===parseInt(selected_user.id)
       }):[];
       if(checkArray.length ===0){
        setSelectedUserDetails(filtered_data[0]);
       }
      
       
    }
   
    // eslint-disable-next-line
  },[filtered_data,flight_Services])
  const handleChange = (event) => {
    let row = filtered_data.filter((item) =>{
        return parseInt(item.id) === parseInt(event.target.value);
    })
    setSelectedUserDetails(row[0]);
  };
  const getAcillaryServiceArray = (data) =>{
    let selectedServices  =[]
    flight_Services[id].ancillary.forEach(element => {
      let objlenght =Object.keys(element.selectedby)
      
      
          if(objlenght.length){
            if(objlenght.includes(String(data.id))){
              selectedServices.push(element.service)
            }
        
          }
    });
    return selectedServices.toString() 
  }
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#bdbdbd',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
  return(
    <>
    <Row>
      <Col xs={12} md={12}>
        <TableContainer className='table_container' >
          <Table  stickyHeader aria-label="sticky table">
            <TableHead>
            {loginDetails.role ==="admin"
                ?
                <TableRow>
                <StyledTableCell >Select</StyledTableCell>
                <StyledTableCell  align="right">Seat No.</StyledTableCell> 
                <StyledTableCell align="right" className='thead_color'>Name </StyledTableCell>
                <StyledTableCell align="right" className='thead_color'>Passport</StyledTableCell>
                <StyledTableCell align="right" className='thead_color'>Date of Birth</StyledTableCell>
                <StyledTableCell align="right" className='thead_color'>Address</StyledTableCell>
                {/* <StyledTableCell align="right" className='thead_color'>Ancillary Services</StyledTableCell> */}
                </TableRow>
              :
                  <TableRow>
                  <StyledTableCell >Select</StyledTableCell>
                
                  <StyledTableCell  align="right">Seat No.</StyledTableCell> 
                  <StyledTableCell align="right" className='thead_color'>Name </StyledTableCell>
                  <StyledTableCell align="right" className='thead_color'>Checked In</StyledTableCell>
                  <StyledTableCell align="right" className='thead_color'>Required WheelChair</StyledTableCell>
                  <StyledTableCell align="right" className='thead_color'>Infant</StyledTableCell>
                   <StyledTableCell align="right" className='thead_color'>Ancillary Services</StyledTableCell> 
                  </TableRow>
              }
            
            </TableHead>
            <TableBody>
              {filtered_data.map((row,index) => (
              row.flight_id ===id?
                 loginDetails.role ==="admin" ?
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      hover role="checkbox" tabIndex={-1}
                    >
                      <TableCell className='' component="th" scope="row">
                    
                        <Radio
                            checked={parseInt(row.id) ===parseInt(selected_user.id) }
                            onChange={handleChange}
                            value={row.id}
                            name={"radio-buttons"+row.id}
                            inputProps={{ 'aria-label':'Radio'+row.id }}
                          />
                      </TableCell>
                      <TableCell align="right">{row.seat_no}</TableCell>
                      <TableCell align="right">{row.first_name +" "+row.last_name}</TableCell>
                      <TableCell align="right">{row.passport}</TableCell>
                      <TableCell align="right">{row.date_of_birth}</TableCell>
                      <TableCell align="right">{row.address}</TableCell>
                      {/* <TableCell align="right" title={getAcillaryServiceArray(row)}><div className='textElips'>
                      {getAcillaryServiceArray(row)}
                        </div></TableCell> */}
                    </TableRow>
                :
                    <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    hover role="checkbox" tabIndex={-1}
                  >
                    <TableCell className='' component="th" scope="row">
                  
                      <Radio
                          checked={ parseInt(row.id) ===parseInt(selected_user.id) }
                          onChange={handleChange}
                          value={row.id}
                          name={"radio-buttons"+row.id}
                          inputProps={{ 'aria-label':'Radio'+row.id }}
                        />
                    </TableCell>
                    <TableCell align="right">{row.seat_no}</TableCell>
                    <TableCell align="right">{row.first_name +" "+row.last_name}</TableCell>
                    <TableCell align="right">{row.checked_in ===true?"Yes":"No"}</TableCell>
                    <TableCell align="right">{row.wheelChair ===true?"Yes":"No"}</TableCell>
                    <TableCell align="right">{row.infant ===true?"Yes":"No"}</TableCell>
                    <TableCell align="right" title={getAcillaryServiceArray(row)}><div className='textElips'>
                      {getAcillaryServiceArray(row)}
                        </div></TableCell>
                  </TableRow>
              
              :
              <></>

               
              ))}
            </TableBody>
            
          </Table>
        </TableContainer>
     { (loginDetails.role ==="admin")?
           <div className='BottomAction'>
           <div >
           <CreatePassengers ></CreatePassengers>
           <UpdatePassengers ></UpdatePassengers>
           </div>
         </div>
         :""
    }
       
      </Col>
    </Row>
  
     
    </>
  )
}

const mapStateToProps =(state) =>{
return({
  user_details: state.user_details,
  selected_user:state.selected_user,
  filtered_data:state.filtered_data,
  flight_Services:state.flight_Services
})
};
const mapDispatchToProps =(dispatch) =>{
  return({
    setSelectedUserDetails :(data) =>dispatch(setSelectedUserDetails(data)),

  })
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
) (PassengersDetails);