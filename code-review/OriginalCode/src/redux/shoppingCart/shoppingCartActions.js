import {
  ADD_ITEM,
  // Onderstaande imports uitgecomment en alles werkt nog, zie punt 1 (hieronder). Op deze manier zijn deze imports dus overbodig/verkeerd geïmplementeerd
  // INCREMENT_AMOUNT,
  // DECREMENT_AMOUNT,
} from "./shoppingCartTypes";

// 1 - Hierboven importeer je de action types. In de functies onderaan typ je ze alsnog als string, dat maakt die action types een beetje overbodig. Ik heb de bovenste verbeterd, het is de bedoeling dat je ze niet als string typt. Het idee achter action types is dat je ze op twee verschillende plekken importeert en dat de import verwijst naar hetzelfde bestand, zodat je geen bugs krijgt doordat je de strings net iets verschillend hebt genoemd. De string is opgeslagen in het bestand met action types, die wordt door die verwijzing dus in beide bestanden hetzelfde.

import * as actionTypes from './shoppingCartTypes'

// 2 - Nog handiger (heb ik uit die course gehaald) is om met * alles te importeren en het actionTypes te noemen (of iets anders, wat je wil). In de tweede functie heb ik deze aangepast.

// Originele code hieronder

export const addItem = (item) => {
  return {
    // Code aangepast, zie punt 1
    type: ADD_ITEM,
    payload: item,
  };
};

export const incrementAmount = (item) => {
  return {
    // Code aangepast, zie punt 2
    type: actionTypes.INCREMENT_AMOUNT,
    payload: item,
  };
};

export const decrementAmount = (item) => {
  return {
    // Originele code
    type: "DECREMENT_AMOUNT",
    payload: item,
  };
};
