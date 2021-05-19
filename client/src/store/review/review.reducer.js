import { GET_PRODUCT_REVIEWS } from "./review.actions";

const initialState = {
  productReviews: {},
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_REVIEWS:
      return {
        ...state,
        productReviews: action.payload,
      };

    default:
      return state;
  }
};

export default reviewReducer;
