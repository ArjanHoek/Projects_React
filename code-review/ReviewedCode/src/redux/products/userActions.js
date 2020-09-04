import axios from "axios";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./userTypes";

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

// Mooi dat je al met async functies (thunk) hebt gewerkt. Klein puntje, de success en failure functies hoef je niet te exporteren, alleen de fetchUsers zelf gebruik je in de component.
export const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    // Het is overigens niet per se nodig om een payload property te gebruiken. Als je maar 1 of 2 values mee wil geven, in dit geval alleen de users, kun je het ook gewoon users noemen. Dan kun je het simpelweg zo schrijven:
    users,
    // Weet je misschien wel, maar dan heet de property users en krijg het automatisch de value van users (die je als argument meegeeft) toegewezen. Je hoeft dan in de reducer ook niet action.payload.users te typen, maar gewoon action.users
    payload: users,
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest);
    axios
      // Er is ook een manier om een apart axios.js bestand te maken, waarin je de standaard pathname aangeeft. Dan hoef je bij get() alleen nog het eindpoint aan te geven (axios.get('/users') bijvoorbeeld)
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data;
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        // Hierover ergens anders ook al iets getypt. Maar denk dat het beter is om de hele error op te slaan in de state, niet alleen de message. Er zijn nog andere properties van het error object die hier nu verloren gaan. Geen idee welke dat zijn en of je ze kunt gebruiken, maar het is wel best practice om gewoon alles mee te nemen.
        const errorMsg = error.message;
        dispatch(fetchUsersFailure(errorMsg));
      });
  };
};
