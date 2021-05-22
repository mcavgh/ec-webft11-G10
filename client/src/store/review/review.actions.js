import axios from "axios";
import Swal from "sweetalert2";

export const GET_PRODUCT_REVIEWS = "GET_PRODUCT_REVIEWS";
export const CREATE_PRODUCT_REVIEWS = "CREATE_PRODUCT_REVIEWS";

export const getProductReviews = (productId) => {
  return (dispatch) => {
    return axios
      .get(`/review/product/${productId}`)
      .then((result) => {
        dispatch({
          type: GET_PRODUCT_REVIEWS,
          payload: result.data,
        });
      })
      .catch((err) => console.log({ message: err.message }));
  };
};

export const createProductReviews = (review) => {
  return (dispatch) => {
    return axios
      .post(`/review`, review)
      .then((result) => {
        dispatch({
          type: CREATE_PRODUCT_REVIEWS,
          payload: {
            reviewText: review.reviewText,
            rating: review.rating,
            productId: review.productId,
            userId: review.userId,
          },
        });
        Swal.fire("Genial!", "Tu opinion se guardó correctamente!", "success");
      })
      .catch((err) => console.log({ message: err.message }));
  };
};
