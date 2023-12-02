import { combineReducers } from "redux";
import facilityPriceHistoryReducer from "./FacilityHistoryReducer";
// import facilitiesReducer from "./facilitiesReducer";
import HotelsReducer from "./HotelsReducer";
import reviewsReducer from "./ReviewsReducer";

const rootReducer = combineReducers({
  facilityPriceHistory: facilityPriceHistoryReducer,
  //   facilities: facilitiesReducer,
  hotels: HotelsReducer,
  reviews: reviewsReducer,
});

export default rootReducer;
