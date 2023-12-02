import {
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAILURE,
  SET_CURRENT_PAGE,
} from "../actions/ReviewsActions";

const initialState = {
  hotelreview: [],
  currentPage: 1,
  totalPages: 1,
  error: "",
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEWS_SUCCESS:
      console.log("FETCH_REVIEWS_SUCCESS:", action.payload);

      return {
        ...state,
        hotelreview: action.payload.reviews,
        totalPages: action.payload.totalPages,
        error: "",
      };
    case FETCH_REVIEWS_FAILURE:
      console.log("FETCH_REVIEWS_FAILURE:", action.payload); // Tambahkan ini

      return {
        ...state,
        error: action.payload.error,
      };
    case SET_CURRENT_PAGE:
      console.log("SET_CURRENT_PAGE:", action.payload); // Tambahkan ini

      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};
export default reviewsReducer;
