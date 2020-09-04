import { createStore, applyMiddleware, /*compose*/ } from "redux";
// Bovenstaande compose import is niet nodig als je de composeWithDevTools (onderaan de imports) gebruikt. Blijkbaar zit dat al in die package ingebrepen
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
// Ik heb de logger even uitgezet
// import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

// Wat algemene redux dingen:
// - Ik heb zelf geleerd om, als je begint met redux, een aparte 'store' folder aan te maken, met daarbinnen 'actions' en 'reducers' folders. Zo houdt je alles mooi apart en het is ook logischer qua flow. Van je component ga je naar action, van action naar reducer, van reducer naar store, en uiteindelijk haalt je component weer dingen uit de store. Maar dat is misschien maar net wat je zelf handig vindt.
// 

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
