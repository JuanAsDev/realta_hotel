import axios from "axios";

export const FETCH_HOTELS_SUCCESS = "FETCH_HOTELS_SUCCESS";
export const FETCH_HOTELS_FAILURE = "FETCH_HOTELS_FAILURE";
export const SET_HOTELS_CURRENT_PAGE = "SET_HOTELS_CURRENT_PAGE";

export const fetchHotelsSuccess = (hotels, totalPages) => ({
  type: FETCH_HOTELS_SUCCESS,
  payload: { hotels, totalPages },
});

export const fetchHotelsFailure = (error) => ({
  type: FETCH_HOTELS_FAILURE,
  payload: { error },
});
export const setCurrentPage = (page) => ({
  type: SET_HOTELS_CURRENT_PAGE,
  payload: page,
});
export const fetchHotels = (currentPage) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/hotels/gethotels?page=${currentPage}`
    );
    const { hotels, totalPages } = response.data;

    dispatch(fetchHotelsSuccess(hotels, totalPages));
  } catch (error) {
    dispatch(fetchHotelsFailure("Terjadi kesalahan saat mengambil data hotel"));
  }
};

export const FETCH_SELECTED_HOTEL_SUCCESS = "FETCH_SELECTED_HOTEL_SUCCESS";
export const FETCH_SELECTED_HOTEL_FAILURE = "FETCH_SELECTED_HOTEL_FAILURE";
export const UPDATE_HOTEL_SUCCESS = "UPDATE_HOTEL_SUCCESS";
export const UPDATE_HOTEL_FAILURE = "UPDATE_HOTEL_FAILURE";

export const fetchSelectedHotelSuccess = (selectedHotel) => ({
  type: FETCH_SELECTED_HOTEL_SUCCESS,
  payload: selectedHotel,
});

export const fetchSelectedHotelFailure = (error) => ({
  type: FETCH_SELECTED_HOTEL_FAILURE,
  payload: error,
});

export const updateHotelSuccess = (updatedHotel) => ({
  type: UPDATE_HOTEL_SUCCESS,
  payload: updatedHotel,
});

export const updateHotelFailure = (error) => ({
  type: UPDATE_HOTEL_FAILURE,
  payload: error,
});

export const fetchSelectedHotel = (hotelId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/hotels/gethotels/${hotelId}`
    );
    const selectedHotel = response.data.hotel;
    dispatch(fetchSelectedHotelSuccess(selectedHotel));
  } catch (error) {
    dispatch(fetchSelectedHotelFailure("Error fetching selected hotel"));
  }
};

export const updateHotel =
  (selectedHotelId, updatedHotelData) => async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/hotels/update/${selectedHotelId}`,
        updatedHotelData
      );
      const updatedHotel = response.data.updatedHotel;

      if (
        updatedHotel &&
        updatedHotel.hotel_modified_date &&
        updatedHotel.hotel_modified_date !==
          updatedHotelData.hotel_modified_date
      ) {
        dispatch(updateHotelSuccess(updatedHotel));
      } else {
        dispatch(
          updateHotelFailure("Failed to update hotel or data is unchanged")
        );
      }
    } catch (error) {
      dispatch(updateHotelFailure("Error updating hotel"));
    }
  };
