import axios from "axios"

export const ADD_TO_CART = "ADD_TO_CART"
export const REMOVE_FROM_CART = "REMOVE_FROM_CART"
export const GET_TOTAL = "GET_TOTAL"
export const GET_QUANTITY = "GET_QUANTITY"
export const GET_PRODUCTS_IN_CART = "GET_PRODUCTS_IN_CART"
export const GET_PRODUCTS_IN_WISHLIST= "GET_PRODUCTS_IN_WISHLIST"

export const getProductsInCart = (userId) => (dispatch, getState) => {
  if (!userId) return
  let cartItems = JSON.parse(localStorage.getItem("cartItems"))

  if (cartItems?.length > 0) {//si hay items en local storage

    //   return axios.post(`/orders/cart/${userId}`).then(order => {
    //  console.log("======================>",order.data.id)

    //     cartItems.forEach(element => {
    //       axios.post(`/${element.id}/order/${order.data.id}/quantity/${element.count}`).then(prod => {
    //       }).
    //       catch(err=>console.log(err))
    //     });

    //   })
    //   .catch(err=>console.error(err))

  } else {
    //si no hay items me traigo los item de la db
    return axios.get(`/orders/userid/${userId}`).then(orders => {

      dispatch({
        type: GET_PRODUCTS_IN_CART,
        payload: orders.data
      })
      localStorage.setItem("cartItems", JSON.stringify(orders.data))
      dispatch(getQuantity())
    })
      .catch(err => console.log(err))
  }


}

export const getQuantity = () => {
  return function (dispatch, getState) {
    let cartItems=[]
    if(getState().cart.cartItems.length>0){cartItems = getState().cart?.cartItems.slice()}
     else if (cartItems[0]) {
      let quantity = cartItems.reduce((a, b) => ({ count: a.count + b.count }))
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
  return function (dispatch, getState) {
    const cartItems = getState().cart.cartItems.slice();
    if (cartItems) {
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
export const restToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let modify = false;
  cartItems.forEach((x) => {
    if (x.name === product.name && x.count > 1) {
      modify = true;
      x.count--;
    }
  });
  if (modify) {
    dispatch({
      type: ADD_TO_CART,
      payload: { cartItems },
    });
    dispatch(getTotal())
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

  }
};

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter((x) => x.name !== product.name);
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch(getTotal())
};
///////////////////WISHLIST
export const addToWishList = (product) => (dispatch, getState) => {
  const userId = getState().userReducer.userId.id;
console.log(userId,product.id)
  return axios.post(`users/${userId}/Product/${product.id}`).then(product => {
    dispatch({
      type: GET_PRODUCTS_IN_WISHLIST,
      payload: product.data
    })
  })
}
