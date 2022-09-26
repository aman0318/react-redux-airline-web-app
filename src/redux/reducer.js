const initialState = {
  user_details:[],
  selected_user:{},
  filtered_data:[],
  flight_list:[]
};

function addReducer(state = initialState, action) {
  switch (action.type) {
    case "set_user_data":
      return { ...state, user_details: action.payload.data};
      case "get_flights_detail":
        return { ...state, flight_list: action.payload.data};
    case "set_selected_user_data":
      
      return { ...state, selected_user: action.payload.data };
      case "update_sigle_user_data":
        let stateCopy =[...state.user_details];
        stateCopy.forEach((element,index) => {
                   if( element.id === action.payload.data.id){
                    stateCopy[index] = action.payload.data
                   }          
         });
         return{...state ,user_details:stateCopy};
         case "filter_passengers_detail":
          
          return {...state,filtered_data:action.payload.data};
         case "add_new_passenegr":
          let newState =[...state.user_details];
             newState.push(action.payload.data);
              
          return{...state ,user_details:newState};
         
    default:
      return state;
  }
}

export default addReducer;