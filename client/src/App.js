import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Hotels/Home";
import Facilities from "./components/Hotels/Facilities";
import Hotels from "./components/Hotels/Hotels";
import "./assets/css/app.css";
import "font-awesome/css/font-awesome.min.css";
import Reviews from "./components/Hotels/Reviews";
import FacilityHistory from "./components/Hotels/FacilityHistory";
import FacilitiesPhotos from "./components/Hotels/FacilitiesPhotos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel" element={<Hotels />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/facilityhistory" element={<FacilityHistory />} />
        <Route path="/facilitiesphotos" element={<FacilitiesPhotos />} />
      </Routes>
    </Router>
  );
}

export default App;
