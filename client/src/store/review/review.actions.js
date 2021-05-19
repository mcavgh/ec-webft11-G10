import axios from "axios";

export const GET_PRODUCT_REVIEWS = "GET_PRODUCT_REVIEWS";

export const getProductReviews = (productId) => {
  return (dispatch) => {
    return axios.get(`/review/product/${productId}`).then((result) => {
      dispatch({
        type: GET_PRODUCT_REVIEWS,
        payload: result.data,
      });
    });
  };
};
