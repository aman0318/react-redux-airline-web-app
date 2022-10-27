import axios from "axios";
import { LOGIN } from "./axios/configForAxios";
import { FLIGHT } from "./axios/configForAxios";
import {PASSENGER} from "./axios/configForAxios"
import {SERVICES} from "./axios/configForAxios"
export  const authenticateUser = async (username, password) => {
  return await axios
    .get(LOGIN, {
      params: {
        email: username,
        password
      }
    })
    .then(response => response.data);
};
export  const  getFlightData = async () => {
  return await axios
    .get(FLIGHT)
    .then(response => response.data);
};

export const getPassengerDetails = async () =>{
  return await axios.get(PASSENGER).then(response =>response.data);
}


export const getServicesDetails = async () =>{
  return await axios
  .get(SERVICES).then(response =>response.data);
}