export const ADD_TO_CART="ADD_TO_CART"
export const REMOVE_FROM_CART="REMOVE_FROM_CART"
export const GET_TOTAL="GET_TOTAL"
export const GET_QUANTITY="GET_QUANTITY"

export const getQuantity = () => {
  return function (dispatch, getState) {
      let cartItems = getState().cart.cartItems.slice()
      if (cartItems[0]) {
          let quantity = cartItems.reduce((a, b) => ({ count: a.count + b.count }));
          dispatch({
              type: GET_QUANTITY,
              payload: quantity.count
          })
      } else {
          dispatch({
              type: GET_QUANTITY,
              payload: 0
          })
      }

  }
}
export const getTotal = () => {
  return function (dispatch,getState) {
    const cartItems = getState().cart.cartItems.slice();
      if (cartItems) {
        console.log(cartItems)
          let total = 0
          cartItems.forEach(prod => {
              let price = parseInt(prod.price)
              total += price * prod.count
          });
          dispatch({
              type: GET_TOTAL,
              payload: total
          })
          dispatch(getQuantity())
      }
  }
}
export const addToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let alreadyExists = false;
  cartItems.forEach((x) => {
    if (x.name === product.name) {
      alreadyExists = true;
      x.count++;
    }
  });
  if (!alreadyExists) {
    cartItems.push({ ...product, count: 1 });
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });
  dispatch(getTotal())
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter((x) => x.name !== product.name);
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch(getTotal())
};
