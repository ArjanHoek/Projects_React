import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./userTypes";

const initialState = {
  loading: false,
  users: [],
  // In de praktijk worden errors geloof ik vaak geinitialieerd als null, niet als een lege string. Niet helemaal zeker, maar een error kan ook een object zijn met properties. Daarom is het niet logisch om dit als string te initialiseren. Ik zie wel dat je in de actions de error.message doorgeeft, maar dan gaat er dus wel informatie verloren. Beter sla je het hele error object op in onderstaande property.
  error: "",
};

// 1 - Je kunt de reducer wat duidelijker schrijven door de return values uit aparte functies te halen, zoals hieronder (tweede case van de reducer). Uiteindelijk iets meer code, maar het maakt alles een stuk overzichtelijker, vooral als je je app nog uit wil breiden
const fetchUsersSucces = (state, action) => {
  return { ...state, loading: false, users: action.payload, error: "" }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      // Originele code
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      // Aangepaste code (zie punt 1)
      return fetchUsersSucces(state, action)
    case FETCH_USERS_FAILURE:
      return {
        // Nooit vergeten om { ...state } mee te nemen. In dit geval override je toch alle properties, maar stel dat je de app later uit wil breiden, dan moet je dit overal weer aanpassen.
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
