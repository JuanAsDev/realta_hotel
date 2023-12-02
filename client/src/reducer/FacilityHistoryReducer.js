import {
  FETCH_FACILITY_HISTORY_SUCCESS,
  FETCH_FACILITY_HISTORY_FAILURE,
  SET_FACILITY_HISTORY_CURRENT_PAGE,
} from "../actions/FacilityHistoryActions";

const initialState = {
  facilityPriceHistories: [],
  currentPage: 1,
  totalPages: 1,
  error: null,
};

const facilityHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FACILITY_HISTORY_SUCCESS:
      console.log(
        "Updating facility history:",
        action.payload.facilityPriceHistories
      );

      return {
        ...state,
        facilityPriceHistories: action.payload.facilityPriceHistories,
        totalPages: action.payload.totalPages,
        error: null,
      };
    case FETCH_FACILITY_HISTORY_FAILURE:
      console.log("Error updating facility history:", action.payload.error);

      return {
        ...state,
        error: action.payload.error,
      };
    case SET_FACILITY_HISTORY_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload.page,
      };
    default:
      return state;
  }
};

export default facilityHistoryReducer;
