import { createStore } from "redux";
import { initialItems, initialProfile } from "./Data.js";

let reducer = (state, action) => {
  console.log(state);
  if (action.type === "login-success") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "logout-success") {
    return { ...state, loggedIn: false };
  }
  if (action.type === "add-item") {
    return { ...state, items: state.items.concat(action.item) };
  }
  if (action.type === "query") {
    return { ...state, searchQuery: action.q };
  }
  if (action.type === "minimum-price") {
    return { ...state, min: action.price };
  }
  if (action.type === "maximum-price") {
    return { ...state, max: action.price };
  }
  if (action.type === "select-group") {
    return { ...state, group: action.value };
  }
  if (action.type === "additemcart") {
    return { ...state, cart: state.cart.concat(action.item) };
  }
  if (action.type === "select-category") {
    // if should be included, add to the array if not there
    if (action.include && !state.categories.includes(action.category)) {
      return { ...state, categories: state.categories.concat(action.category) };
    }
    // if should not be included, and is in the array remove
    if (!action.include) {
      return {
        ...state,
        categories: state.categories.filter(cat => {
          return cat !== action.category;
        })
      };
    }
    return { ...state, categories: [...state.categories, action.category] };
  }
  return state;
};
const store = createStore(
  reducer,
  {
    loggedIn: false,
    items: initialItems,
    sellers: initialProfile,
    searchQuery: "",
    min: 0,
    max: 100000,
    categories: [],
    group: "",
    cart: []
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
