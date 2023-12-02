import {
  FETCH_HOTELS_SUCCESS,
  FETCH_HOTELS_FAILURE,
  SET_HOTELS_CURRENT_PAGE,
  FETCH_SELECTED_HOTEL_SUCCESS,
  FETCH_SELECTED_HOTEL_FAILURE,
  UPDATE_HOTEL_SUCCESS,
  UPDATE_HOTEL_FAILURE,
} from "../actions/HotelsActions";

const initialState = {
  hotels: [],
  currentPage: 1,
  totalPages: 1,
  selectedHotelData: {},
  error: "",
};

const hotelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOTELS_SUCCESS:
      return {
        ...state,
        hotels: action.payload.hotels,
        totalPages: action.payload.totalPages,
        error: "",
      };
    case FETCH_HOTELS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case SET_HOTELS_CURRENT_PAGE:
      console.log("SET_CURRENT_PAGE:", action.payload);
      return {
        ...state,
        currentPage: action.payload,
      };
    case FETCH_SELECTED_HOTEL_SUCCESS:
      return {
        ...state,
        selectedHotelData: action.payload,
        error: "",
      };
    case FETCH_SELECTED_HOTEL_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_HOTEL_SUCCESS:
      return {
        ...state,
        selectedHotelData: action.payload,
        error: "",
      };
    case UPDATE_HOTEL_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default hotelsReducer;
