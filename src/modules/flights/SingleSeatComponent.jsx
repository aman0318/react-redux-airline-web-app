import React  from "react"
import {connect} from "react-redux";
import {updateUserDetails,setSelectedUserDetails} from "../../redux/actions";
function SingleSeat (props){
  const {selected_user,updateUserDetails,setSelectedUserDetails,selectedFor} = props
  const colorMapping ={
    "selected":"rgb(189 196 197)",
    "booked":"rgb(0 95 235)",
    "available":"white",
    "infant":"#4cf0b9",
    "infant-wheelChair":"#007951",
    "wheelChair":"red"

  }
  const handelButtonClick =(event)=>{
     ;
    let userCopy = {...selected_user};
    if(selected_user.seat_no && selected_user.seat_no !=="" && selected_user.seat_no === selectedFor.seatNo){
      userCopy.checked_in = false ;
      userCopy.seat_no =""
      updateUserDetails(userCopy);
      setSelectedUserDetails(userCopy);
      return ;
    }
    
    userCopy.seat_no =selectedFor.seatNo
    userCopy.checked_in = true ;

    updateUserDetails(userCopy);
    setSelectedUserDetails(userCopy);
  }
return(
  <>
    {selectedFor && selectedFor.id?
      <button className="Seat_Selection_button" disabled={selectedFor.disabled} title={selectedFor.name}
      onClick={handelButtonClick}
      style={{backgroundColor:colorMapping[selectedFor.colorCode]}}>
        {selectedFor.seatNo}
      </button>
      :
      <button className="Seat_Selection_button" 
      onClick={handelButtonClick}
      style={{backgroundColor:colorMapping.available}}>
        {selectedFor.seatNo}
      </button>
      }
  </>

 
)
}
const mapStateToProps =(state) =>{
  return({
    // user_details: state.user_details,
     selected_user:state.selected_user,
    // filtered_data:state.filtered_data
  })
  };
  const mapDispatchToProps =(dispatch) =>{
    return({
      updateUserDetails : (data) =>dispatch(updateUserDetails(data)),
      setSelectedUserDetails:(data) =>dispatch(setSelectedUserDetails(data))
    })
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
) ( SingleSeat);
// export default SingleSeat;