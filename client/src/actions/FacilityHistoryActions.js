// actions.js
import axios from "axios";
export const FETCH_FACILITY_HISTORY_SUCCESS = "FETCH_FACILITY_HISTORY_SUCCESS";
export const FETCH_FACILITY_HISTORY_FAILURE = "FETCH_FACILITY_HISTORY_FAILURE";
export const SET_FACILITY_HISTORY_CURRENT_PAGE =
  "SET_FACILITY_HISTORY_CURRENT_PAGE";

export const fetchFacilityHistorySuccess = (
  facilityPriceHistories,
  totalPages
) => ({
  type: FETCH_FACILITY_HISTORY_SUCCESS,
  payload: { facilityPriceHistories, totalPages },
});

export const fetchFacilityHistoryFailure = (error) => ({
  type: FETCH_FACILITY_HISTORY_FAILURE,
  payload: { error },
});

export const setCurrentPage = (page) => ({
  type: SET_FACILITY_HISTORY_CURRENT_PAGE,
  payload: { page },
});

export const fetchFacilityHistory = (currentPage) => {
  return async (dispatch) => {
    try {
      console.log("Fetching data from the server...");

      const response = await axios.get(
        `http://localhost:3001/facilitypricehistory/getfacilitypricehistoriespage?page=${currentPage}`
      );

      console.log(
        "Response from server:",
        response.data.facilityPriceHistories
      );

      const { facilityPriceHistories, totalPages } = response.data;

      dispatch(fetchFacilityHistorySuccess(facilityPriceHistories, totalPages));
    } catch (error) {
      console.log("Error fetching data:", error);

      dispatch(fetchFacilityHistoryFailure(error));
    }
  };
};
