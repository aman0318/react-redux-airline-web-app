import React,{useState,useEffect} from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SingleSeat from "./SingleSeatComponent";
import {connect} from "react-redux";

function  SeatSelection (props){
  const colorMapping ={
    "selected":"rgb(189 196 197)",
    "booked":"rgb(0 95 235)",
    "available":"white",
    "infant":"#4cf0b9",
    "infant-wheelChair":"#007951",
    "wheelChair":"red"

  }
  const rowCount =10;
  const {user_details,selected_user} = props;
  const [Seats,setSeats] =useState([]);
  useEffect(()=>{
    if(user_details[0]){
      passengersSelectSeatMapping(user_details);
      
    }
  
    // eslint-disable-next-line
  },[user_details,selected_user]);
 const passengersSelectSeatMapping =(data)=>{
  let colorCoddedData ={}
  for(let key in data){
    let newmap ={
      "name":"",
      "id":"",
      "isInfant":false,
      "isOnWheelChair":false,
      "withBoth":false,
      "colorCode":"available",
      "seatNo":"",
      "disabled":false
    }
    
    if(data[key].seat_no && data[key].seat_no!==""){
      if(selected_user.id ===data[key].id){
        newmap.colorCode ="selected"
        newmap.disabled =false
      }
       else if(data[key].wheelChair ===true && data[key].infant ===true){
          newmap.withBoth = true ;
          newmap.colorCode ="infant-wheelChair"
          newmap.disabled =true
         
        }
        else if(data[key].wheelChair ===true){
          newmap.isOnWheelChair = true
          newmap.colorCode ="wheelChair"
          newmap.disabled =true
        }
        else if(data[key].infant ===true){
          newmap.isInfant =true;
          newmap.colorCode ="infant"
          newmap.disabled =true
        }
        else{
          newmap.colorCode ="booked";
          newmap.disabled =true
        }
        newmap.name = data[key].first_name +" "+data[key].last_name
        newmap.id =data[key].id;
        newmap.seatNo =data[key].seat_no;
        colorCoddedData[data[key].seat_no] =newmap
    }
    else if(selected_user.id ===data[key].id){
      newmap.colorCode ="selected"
      newmap.disabled =false
      newmap.name = data[key].first_name +" "+data[key].last_name
      newmap.id =data[key].id;
      newmap.seatNo =data[key].seat_no;
      colorCoddedData[data[key].seat_no] =newmap
    }
   
  }
  createSeats(colorCoddedData);
 }
 const createSeats =(data)=>{
  let seatCopy =[];
  for(let i = 1; i <= rowCount; i++){
    seatCopy.push(
     <Row className="SeatRow" key={i}>
     <Col>
        <SingleSeat  selectedFor={data["A"+i]?data["A"+i]:{"seatNo":"A"+i}} ></SingleSeat>
     </Col>
     <Col>
        <SingleSeat  selectedFor={data["B"+i]?data["B"+i]:{"seatNo":"B"+i}} ></SingleSeat>
     </Col>
     <Col>
       <div>|</div>
     </Col>
     <Col>
        <SingleSeat  selectedFor={data["C"+i]?data["C"+i]:{"seatNo":"C"+i}}  ></SingleSeat>
     </Col>
     <Col>
        <SingleSeat  selectedFor={data["D"+i]?data["D"+i]:{"seatNo":"D"+i}} ></SingleSeat>
     </Col>
     
   </Row>
    )
   }
   setSeats(seatCopy);
 }
  return(
    <>
    <div className="seatTitle">
      Select Seat 
    </div>
    <div className='container'>
        <Row className='seat-color-details'>
          <Col>
            <button className="Seat-Colors" disabled={true} style={{backgroundColor:colorMapping["booked"]}}> 
                  
            </button> 
            <span>Booked</span>
          </Col>
          <Col>
                <button className="Seat-Colors" disabled={true} style={{backgroundColor:colorMapping["selected"]}}> 
                  
                </button> 
              <span>Selected</span>
          </Col>
          <Col>
                <button className="Seat-Colors" disabled={true} style={{backgroundColor:colorMapping["available"]}}> 
                
                </button>  
              <span>Available</span>
          </Col>
          <Col>
            <button className="Seat-Colors" disabled={true} style={{backgroundColor:colorMapping["infant"]}}> 
                    
              </button> 
            <span>Infant</span>
          </Col>
        </Row>
        <Row className='seat-color-details'>
        <Col>
                  <button className="Seat-Colors" disabled={true} style={{backgroundColor:colorMapping["wheelChair"]}}> 
                  
                  </button>  
              <span>With WheelChair</span>
          </Col>

          <Col>
               <button className="Seat-Colors" disabled={true} style={{backgroundColor:colorMapping["infant-wheelChair"]}}> 
                  
                  </button>  
            <span>With WheelChair & Infant</span>
          </Col>
        
        </Row>
        <div>
          <Row>
              <Col className="SeatHeaderLable">
                <div>A</div>
              </Col>
              <Col className="SeatHeaderLable">
                <div>B</div>
              </Col>
              <Col></Col>
              <Col className="SeatHeaderLable">
                <div>C</div>
              </Col>
              <Col className="SeatHeaderLable">
                <div>D</div>
              </Col>
              
          </Row>
          <div className="scroll_y">{
            Seats
          }</div>
          
         
        </div>
    </div>
    </>
  )

}
const mapStateToProps =(state) =>{
  return({
    user_details: state.user_details,
     selected_user:state.selected_user,
    // filtered_data:state.filtered_data
  })
  };
  const mapDispatchToProps =(dispatch) =>{
    return({
   
    })
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  ) ( SeatSelection);