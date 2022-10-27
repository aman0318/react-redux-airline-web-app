import {getUser,getFlights,updateUser,setSelectedUser,addNewUser,filterPassengers,flight_Services} from './actionType';


export function setUser(data) {
  return function(dispatch) {
    dispatch({
      type: getUser,
      payload:{
        data
      }
    }); 
  };
};
export function setFlightsServices(id,data) {
  return function(dispatch) {
    dispatch({
      type: flight_Services,
      payload:{
        id,
       data
      }
    }); 
  };
};
export function setFlight(data) {
  return function(dispatch) {
    dispatch({
      type: getFlights,
      payload:{
        data
      }
    }); 
  };
};
export function setSelectedUserDetails(data) {
  return function(dispatch) {
    dispatch({
      type: setSelectedUser,
      payload:{
        data
      }
    }); 
  };
}
export function updateUserDetails(data) {
  return function(dispatch) {
    dispatch({
      type: updateUser,
      payload:{
        data
      }
    }); 
  };
}
export function addNewPassenger(data) {
  return function(dispatch) {
    dispatch({
      type: addNewUser,
      payload:{
        data
      }
    }); 
  };
}
export function filterPassengersDetails(data) {
  return function(dispatch) {
    dispatch({
      type: filterPassengers,
      payload:{
        data
      }
    }); 
  };
}
