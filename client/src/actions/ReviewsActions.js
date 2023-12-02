import axios from "axios";

export const FETCH_REVIEWS_SUCCESS = "FETCH_REVIEWS_SUCCESS";
export const FETCH_REVIEWS_FAILURE = "FETCH_REVIEWS_FAILURE";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

export const fetchReviews = (currentPage) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/hotelreviews/hotelreviewspagination?page=${currentPage}`
    );
    dispatch({
      type: FETCH_REVIEWS_SUCCESS,
      payload: {
        reviews: response.data.reviews,
        totalPages: response.data.totalPages,
      },
    });
  } catch (error) {
    dispatch({
      type: FETCH_REVIEWS_FAILURE,
      payload: {
        error: "Terjadi kesalahan saat mengambil data hotel",
      },
    });
  }
};

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});
