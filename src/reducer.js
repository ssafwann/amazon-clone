// pushing data into the data layer is the important duty of the reducer
// reducer listens to your actions so its always listening

export const initialState = {
  basket: [],
  user: null,
};

// Selector
export const getBasketTotal = (basket) =>
  // reduce iterates through the basket, you have an initial amount which is set to 0
  basket?.reduce(
    (totalAmount, basketItem) => basketItem.price + totalAmount,
    0
  );
// let totalAmount = 0;
// for (let i = 0; i < basket.length; i++) {
//   totalAmount += basket[i].price;
// }
// return totalAmount;

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        // this  pushes the item into the basket
        basket: [...state.basket, action.item], // whatever the basket currently was and the the item you decided to add
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      // get the state and the basket and use the findIndex function
      // that will go through the basket item to see if any of their id matches the id you passed in
      // this only gives u the first id that all matches.
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket]; // copy the current   basket into a temp variable

      // if an item was found
      if (index >= 0) {
        newBasket.splice(index, 1); // it goes the point of where the item was so the index point and it just removes that item basically by 1
      } else {
        console.warn(
          `Cant remove producct (id: ${action.id}) as its not in the basket !`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user, // this action.user is the user u dispatched in app.js
      };

    default:
      return state;
  }
};

export default reducer;
