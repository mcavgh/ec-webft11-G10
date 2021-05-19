import axios from 'axios'
import Swal from 'sweetalert2'
export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
export const GET_ORDER_BY_ID = "GET_ORDER_BY_ID";
export const PUT_ORDER_BY_ID = "PUT_ORDER_BY_ID";
export const PUT_QUANTITY_OF_ORDER = "PUT_QUANTITY_OF_ORDER";
export const GET_ORDER_BY_USER_ID = "GET_ORDER_BY_USER_ID";
export const AMOUNT_DEPOSITS = "AMOUNT_DEPOSITS";
export const GET_PRODUCTS_OF_USER = "GET_PRODUCTS_OF_USER";
export const DELETE_CART = "DELETE_CART"
export const POST_ORDERS = "POST_ORDERS"

export const postOrders = (data) => {
  return (dispatch, getState) => {
    console.log(data)
    axios.post(`/orders/ols`, data).then((res) => {
      dispatch({ type: POST_ORDERS, payload: res.data });
      const cartItems = getState().cart.cartItems.slice();
      cartItems.forEach(product => {
        dispatch(addProducttoOrder(res.data.id, product.id))
      });
      Swal.fire(
        'Muy bien!',
        'Completa los datos para terminar la compra',
        'success'
      )
    }).catch(err => console.log(err))
  };
};

export const addProducttoOrder = (orderId, productId) => {
  return (dispatch, getState) => {
    axios.post(`/cart/${productId}/order/${orderId}`).then((res) => {
    }).catch(err => { console.log(err) })
  }
}

export const getAllOrders = () => {
  return (dispatch) => {
    axios.get(`/orders/`).then((res) => {
      console.log(res)
      return dispatch({ type: GET_ALL_ORDERS, payload: res.data });
    });
  };
};

export const getOrderById = (id) => {
  return function (dispatch) {
    axios.get(`/orders/${id}`).then(order => {
      dispatch({ type: GET_ORDER_BY_ID, payload: order.data[0] })
    })
    .catch(err=>console.log(err))
  }
}
export const getOrderByUserId = (id) => {
  return function (dispatch) {
    axios.get(`/orders/userid/${id}`).then(payload => {
      dispatch({ type: GET_ORDER_BY_USER_ID, payload: payload.data[0] })
    })
  }
}

export const putOrderById = (id, data) => {
  return function (dispatch) {
    axios.put(`/orders/${id}/modifica`, data)
      .then((payload) => {
        console.log(payload)
        dispatch({ type: PUT_ORDER_BY_ID, payload: payload.data });
        dispatch(getOrderById(id))
        // Swal.fire({
        //   position: 'center',
        //   icon: 'success',
        //   title: 'tu orden se a modificado',
        //   showConfirmButton: false,
        //   timer: 1500
        // })
      }).catch((err) => console.log(err))
  };
};

export const cleanCart = (id) => {
  return function (dispatch) {
    axios.delete(`/cart/${id}/cart`).then((payload) => {
      dispatch({ type: DELETE_CART, payload: payload });
      // Swal.fire({
      //   position: 'center',
      //   icon: 'success',
      //   title: 'tu orden se cancelado',
      //   showConfirmButton: false,
      //   timer: 1500
      // })
    }).catch((err) => console.log(err))
  };
};

