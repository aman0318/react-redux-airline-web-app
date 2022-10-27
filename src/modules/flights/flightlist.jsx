
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from "react-router-dom";
import {getFlightData,getServicesDetails} from '../../utils';
import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import {setFlight,setFlightsServices} from "../../redux/actions";
import {loadState} from "../../redux/store"
function Flightlist (props){

  const [flights, setFlightList] = useState([]);
  const {setFlight,setFlightsServices} = props
  const theme = createTheme({
    palette: {
      viewMore: {
        main: '#40514E',
          },
    },
  });
  useEffect(() => {
  let preStore =loadState();
  let flightdata =  getFlightData();
      flightdata.then(
            (result) => {
        
              setFlightList(result);
              setFlight(result);
            },
            (error) => {
        
            }
      );
    if(!preStore || Object.keys(preStore.flight_Services).length ===0){
          let flightServices =getServicesDetails();
          
          flightServices.then((result)=>{
            setFlightsServices(false,result)
          })
    }   
   // eslint-disable-next-line
  },[])
return (
  <>
    <Container >
      <div className="flightlisttitle">Flight List</div>
      {flights.map(item => (
          <Card key={item.id} className="m-t-b-20">
              <CardContent className='pb-0 '>
                <Row className='card-details'>
                  <Col xs={2} md={1} className="icon-flight"><img src={"/flight_images/"+item.logo} style={{maxWidth:'80%'}} alt={item.logo}></img>
                  <div className='text'>
                   {item.airline}
                    <div>{item.flightNo}</div>
                    </div></Col>
                  <Col xs={10} md={9} >
                    <Row className="flight-box">
                      <Col xs={4}>
                        <div className="left-wing">
                          <div className="airport-code">{item.departureCityCode}</div>
                          <div className="time">{item.departureTime}</div>
                          <div className="date">{item.departureDate}</div> 
                          <div className="city u-text-ellipsis" title={item.departureCity}>{item.departureCity}</div>
                        </div>
                      </Col>
                      <Col xs={4}>
                          <div className="timeline">
                            <div className="lable">
                                {item.totalTime}
                              </div> 
                              <div className="hrLine">
    
                              </div>
                              <div className="lable">
                               {item.NumberOfStop}
                              </div> 
                          </div>
                      </Col>
                      <Col xs={4}>
                        <div className="right-wing">
                        <div className="airport-code">{item.arrivalCityCode}</div>
                          <div className="time">{item.arrivalTime}</div>
                          <div className="date">{item.arrivalDate}</div> 
                          <div className="city u-text-ellipsis" title={item.arrivalCity}>{item.arrivalCity}</div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col  xs={12} md={2} className='card-action'>  
                      <CardActions  >
                      <ThemeProvider theme={theme}  >
                        <Link to={"/flight_details/"+item.id}  > View Details  <ArrowForwardIosIcon></ArrowForwardIosIcon> </Link>
                      </ThemeProvider>
                      </CardActions>
                  </Col>
                </Row>
              </CardContent>
            
          </Card> 
        ))}
     
    </Container>
  </>
)
}
const mapStateToProps =(state) =>{
  return({
    
  })
}
const mapDispatchToProps =(dispatch) =>{
  return({
    setFlight:(data)=>dispatch(setFlight(data)),
    setFlightsServices:(id,data) =>dispatch(setFlightsServices(id,data))
  })
}
export default connect(
  mapStateToProps,
  mapDispatchToProps

  
)(Flightlist)