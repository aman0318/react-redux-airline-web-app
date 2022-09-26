
import React, {useState, useEffect,Suspense } from 'react';
import {getPassengerDetails,getFlightData} from '../utils';
import { connect } from "react-redux";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useParams } from 'react-router-dom';
import {setUser,filterPassengersDetails,setSelectedUserDetails,setFlight} from "../redux/actions"
import PassengersDetails from "./passengersDetails";
import PassengerFilters from "./passengers_filters";
import FlightDetails from '../modules/flights/flightdetails';
import FlightDetailsCard from '../modules/flights/flightDetailCard';
import SeatSelection from '../modules/flights/seatMap';

function PasssengerMain (props){
  const loginDetails = JSON.parse(localStorage.getItem("login"));
  const {setUser,filterPassengersDetails,setSelectedUserDetails,setFlight} = props;
  const [flightdetails,setFlightDetails] =useState({});
  let {id} = useParams();
  useEffect(() => {
    
    let _PassengersDetails =  getPassengerDetails();
    _PassengersDetails.then(
          (result) => {
          filterPassengersDetails(result); 
          setUser(result);
          setSelectedUserDetails(result[0])
          },
          (error) => {
          
          }
        )

        let flightdata =  getFlightData();
        flightdata.then(
              (result) => {
                setFlight(result); 
                let Flight = result.filter((item)=>{
                  return item.id ===id
                 })
                 setFlightDetails(Flight[0]);        
              },
              (error) => {
           
              }
            )
    },[])
  return (
   
    <> 

     <div className='mainTitle'>Passenger  Details</div>
     <div className='flightDetailCard'>
      <FlightDetailsCard flightdetails={flightdetails}></FlightDetailsCard>
     </div>
     <div className='pasenger_detail_container'>
     
            <Row>
                <Col xs={12} md={8}>
                  <div className='filters'>
                  <Suspense fallback={<div>Loding...</div>}>
                    <PassengerFilters  ></PassengerFilters>
                    </Suspense>
                </div>
                <Suspense fallback={<div>Loding...</div>}>
                    <PassengersDetails ></PassengersDetails>
                    </Suspense>
                </Col>
                {loginDetails.role ==="admin"?
                  <Col xs={12} md={4}>
                      <h3 className='flightTitle'> Flight Details</h3>
                      <Suspense fallback={<div>Loding...</div>}>
                      <FlightDetails></FlightDetails>
                      </Suspense>
                  </Col>
                  :
                  <Col xs={12} md={4}>
                    <Suspense fallback={<div>Loding...</div>}>
                    <SeatSelection></SeatSelection>
                    </Suspense>
                  </Col>
                }
            </Row>
            <Row>
              <Col >
             { (loginDetails.role ==="staff-in-flight")
                   ?
                    <div>
                    
                      <FlightDetails></FlightDetails></div>:""
              }
              </Col>
            </Row>
        {/* </Suspense> */}
      </div>
    </>
  )
};
const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => {
  return({
    setUser: (data) => dispatch(setUser(data)),
    filterPassengersDetails:(data) =>dispatch(filterPassengersDetails(data)),
    setSelectedUserDetails :(data) =>dispatch(setSelectedUserDetails(data)),
    setFlight:(data) =>dispatch(setFlight(data))
})
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasssengerMain);
