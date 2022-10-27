
import React from "react"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import WestIcon from '@mui/icons-material/West';
import { useNavigate } from "react-router-dom";
 const   FlightDetailsCard  = (props) =>{
  let navigate = useNavigate();
  const {flightdetails} =props;
  const redirectTOFlightList  =() =>{
    navigate('/flights');
  }
  return (
    
    <div>
    { props.flightdetails?   
      <div className='flight_details_container'>
       
        
         <Row>
          <Col md={2}  className="card-title" title="go back " onClick={redirectTOFlightList}>
            <WestIcon ></WestIcon>  Flight Details
          </Col>
          <Col md={10} xs={12}>
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
              DEP STN 
              </div>
              <div className='valuediv'>
                {flightdetails.departureCity}
              </div>
              </Col>
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
                DEP Time 
              </div>
              <div className='valuediv'>
                {flightdetails.departureTime}
              </div>
              </Col>
            </Row>
            <Row>
            <Col>
              <div className='lable'>
              Flight No. 
              </div>
                <div className='valuediv'>
                  {flightdetails.flightT}
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
              <Col>
              <div className='lable'>
                ARV DATE 
                </div>
                <div className='valuediv'>{flightdetails.arrivalDate}</div>
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
          </Col>
       
         </Row>

       </div>
       :
       <div> Loading...</div>
      }
    </div>
  )
}
export default FlightDetailsCard