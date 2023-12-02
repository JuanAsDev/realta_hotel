import React, { useState } from "react";
import { FaHotel } from "react-icons/fa";

const MyAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="nav-item">
      <a
        className={`nav-link collapsed ${isOpen ? "show" : ""}`}
        href="#"
        onClick={toggleAccordion}
        aria-expanded={isOpen ? "true" : "false"}
      >
        <FaHotel />

        <span> Hotels </span>
      </a>
      <div
        className={`collapse ${isOpen ? "show" : ""}`}
        id="collapseUsers"
        aria-labelledby="headingUsers"
        data-bs-parent="#accordionSidebar"
      >
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Menus:</h6>
          <a className="collapse-item" href="/hotel">
            Hotel
          </a>
          <a className="collapse-item" href="/facilities">
            Facilities
          </a>
          <a
            className="collapse-item"
            href="/reviews"
            // onClick={handleReviewsClick}
          >
            Reviews
          </a>
          <a
            className="collapse-item"
            href="/facilityhistory"
            // onClick={handleFacilityHistoryClick}
          >
            FacilitiyHistory
          </a>
          <a
            className="collapse-item"
            href="/facilitiesphotos"
            // onClick={handleFacilityHistoryClick}
          >
            Facility Photos
          </a>
        </div>
      </div>
    </li>
  );
};

export default MyAccordion;
