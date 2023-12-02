import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";

const Facilities = () => {
  const [facilitieses, setfacilities] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [startdate, setstartdate] = useState("");

  // edit option
  const [selectedFacilityId, setSelectedFacilityId] = useState(null);
  const [selectedFacilitiesData, setSelectedFacilitiesData] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchSelectedFacility = async (selectedFacilityId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/facilities/facilities/${selectedFacilityId}`
      );
      console.log("Selected Facility Data:", response.data);
      setSelectedFacilitiesData(response.data);
    } catch (error) {
      console.error("Error fetching selected facility:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      setShowEditModal(false);
    } catch (error) {
      console.error("Error saving edited facility:", error);
    }
  };
  // end edit option

  const handleShowEditModal = (selectedFacilityId) => {
    setSelectedFacilityId(selectedFacilityId);
    fetchSelectedFacility(selectedFacilityId);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const fetchfacilities = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/facilities/facilities?page=${currentPage}`
      );
      console.log("Response from API:", response.data);

      setfacilities(response.data.facilities);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchfacilities();
  }, [currentPage]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleeditfacilities = async () => {
    const newfacilities = {
      faci_name: selectedFacilitiesData.faci_name,
      faci_category: selectedFacilitiesData.faci_category,
      faci_room_number: selectedFacilitiesData.faci_room_number,
      faci_max_number: selectedFacilitiesData.faci_max_number,
      faci_low_price: selectedFacilitiesData.faci_low_price,
      faci_high_price: selectedFacilitiesData.faci_high_price,
      faci_discount: selectedFacilitiesData.faci_discount,
      faci_tax_rate: selectedFacilitiesData.faci_tax_rate,
      faci_startdate: selectedFacilitiesData.faci_startdate,
      faci_enddate: selectedFacilitiesData.faci_enddate,
      // faci_exposeprice: setSelectedFacilityId.faci_low_price,setSelectedFacilityId.faci_high_price,setSelectedFacilityId.faci_rate_price,
    };
    console.log("Data facilities yang akan dikirim:", newfacilities);

    try {
      const response = await axios.put(
        `http://localhost:3001/facilities/facilities/${selectedFacilityId}`,
        newfacilities
      );
      console.log("Data facilities berhasil ditambahkan:", response.data);

      const updatedPriceHistoryData = {
        faph_faci_id: newfacilities.faph_faci_id,
        faph_startdate: newfacilities.faci_startdate,
        faph_enddate: newfacilities.faci_enddate,
        faph_low_price: newfacilities.faci_low_price,
        faph_high_price: newfacilities.faci_high_price,
        faph_rate_price: newfacilities.faci_rate_price,
        faph_discount: newfacilities.faci_discount,
        faph_tax_rate: newfacilities.faci_tax_rate,
        faph_modified_date: new Date().toISOString(),
      };

      const priceHistoryResponse = await axios.post(
        `http://localhost:3001/facilitypricehistory/create`,
        updatedPriceHistoryData
      );
      console.log(
        "Data facility price history berhasil diperbarui:",
        priceHistoryResponse.data
      );
      fetchfacilities();

      handleCloseEditModal();
      handleCloseAddModal();
      Swal.fire({
        icon: "success",
        title: "Facility Updated",
        text: "The facility and its price history have been updated successfully!",
      });
    } catch (error) {
      console.error({ error: error.message });
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update facility and its price history. Please try again later.",
      });
    }
  };
  const handlefacilitiesNameChange = (event) => {
    setSelectedFacilitiesData({
      ...selectedFacilitiesData,
      faci_name: event.target.value,
    });
  };

  const handleCategoryChange = (event) => {
    setSelectedFacilitiesData({
      ...selectedFacilitiesData,
      faci_category: event.target.value,
    });
  };

  const handleRoomNumberChange = (event) => {
    setSelectedFacilitiesData({
      ...selectedFacilitiesData,
      faci_room_number: event.target.value,
    });
  };

  const handleMaxVacantChange = (event) => {
    setSelectedFacilitiesData({
      ...selectedFacilitiesData,
      faci_max_number: event.target.value,
    });
  };
  const handleLowPriceChange = (event) => {
    setSelectedFacilitiesData({
      ...selectedFacilitiesData,
      faci_low_price: event.target.value,
    });
  };
  const handleHighPriceChange = (event) => {
    setSelectedFacilitiesData({
      ...selectedFacilitiesData,
      faci_high_price: event.target.value,
    });
  };
  const handleDiscChange = (event) => {
    setSelectedFacilitiesData({
      ...selectedFacilitiesData,
      faci_discount: event.target.value,
    });
  };
  const handleTaxChange = (event) => {
    setSelectedFacilitiesData({
      ...selectedFacilitiesData,
      faci_tax_rate: event.target.value,
    });
  };
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    setSelectedFacilitiesData({
      ...selectedFacilitiesData,
      faci_startdate: event.target.value,
    });
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    setSelectedFacilitiesData({
      ...selectedFacilitiesData,
      faci_enddate: event.target.value,
    });
  };

  useEffect(() => {
    if (selectedFacilitiesData && selectedFacilitiesData.faci_startdate) {
      setstartdate(selectedFacilitiesData.faci_startdate);
    }
  }, [selectedFacilitiesData]);
  const [startDate, setStartDate] = useState(
    selectedFacilitiesData.faci_startdate || ""
  );
  const [endDate, setEndDate] = useState(
    selectedFacilitiesData.faci_enddate || ""
  );

  // upload
  const [showUploadModal, setShowUploadModal] = useState(false);
  const handleShowUploadModal = (selectedFacilityId) => {
    setSelectedFacilityId(selectedFacilityId);
    fetchSelectedFacility(selectedFacilityId);
    setShowUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
  };
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const photosArray = Array.from(files);

    const promises = photosArray.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          resolve({ url: e.target.result, file });
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then((results) => {
        setUploadedPhotos([...uploadedPhotos, ...results]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      uploadedPhotos.forEach((photoData, index) => {
        formData.append("fapho_faci_id", selectedFacilityId);
        formData.append("fapho_url", photoData.file);
      });

      const response = await axios.post(
        "http://localhost:3001/facility/create",
        formData
      );
      console.log("Response from server:", response.data);

      Swal.fire({
        icon: "success",
        title: "Upload Successful",
        text: "Photos have been uploaded successfully!",
      });
      setShowUploadModal(false);
    } catch (error) {
      console.error("Error uploading photos:", error);

      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Failed to upload photos. Please try again later.",
      });
    }
  };

  //   add faci
  const [facilityNames, setfacilityNames] = useState("");
  const [roomnumbers, setroomnumber] = useState("");
  const [maxvacants, setmaxvacant] = useState("");
  const [startdates, setstartdates] = useState("");
  const [enddates, setenddates] = useState(""); // Menyimpan tanggal saat ini
  const [lowpricess, setlowpricess] = useState("");
  const [highpricess, sethighpricess] = useState("");
  const [discounts, setdiscounts] = useState("");
  const [ratepricess, setrateprice] = useState("");
  const [taxs, settaxs] = useState("");
  const [measureunits, setmeasureunits] = useState("");

  const [descriptions, setdescriptions] = useState("");
  const [currentDate, setCurrentDate] = useState(""); // Menyimpan tanggal saat ini

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  }, []);

  const handleaddfacilitiesname = (event) => {
    setfacilityNames(event.target.value);
  };

  const handleaddmaxvacant = (event) => {
    setmaxvacant(event.target.value);
  };
  const handleaddstartdate = (event) => {
    setstartdates(event.target.value);
  };

  const handleaddroomnumber = (event) => {
    setroomnumber(event.target.value);
  };
  const handleaddenddate = (event) => {
    setenddates(event.target.value);
  };

  const handleaddlowprice = (event) => {
    setlowpricess(event.target.value);
  };

  const handleadddiscount = (event) => {
    setdiscounts(event.target.value);
  };
  const handleaddrateprice = (event) => {
    setrateprice(event.target.value);
  };
  const handleaddtax = (event) => {
    settaxs(event.target.value);
  };

  const handleaddhighprice = (event) => {
    sethighpricess(event.target.value);
  };
  const handleaddmeasureunit = (event) => {
    setmeasureunits(event.target.value);
  };

  const handleadddescription = (event) => {
    setdescriptions(event.target.value);
  };
  const handleaddfacilities = async () => {
    try {
      const formData = new FormData();
      formData.append("faci_name", facilityNames);
      formData.append("faci_description", descriptions);
      formData.append("faci_room_number", roomnumbers);
      formData.append("faci_max_number", maxvacants);
      formData.append("faci_measure_unit", measureunits);
      formData.append("faci_startdate", startdates);
      formData.append("faci_enddate", enddates);
      formData.append("faci_low_price", lowpricess);
      formData.append("faci_high_price", highpricess);
      formData.append("faci_discount", discounts);
      formData.append("faci_rate_price", ratepricess);
      formData.append("faci_tax_rate", taxs);
      formData.append("hotel_modified_date", currentDate);

      const response = await axios.post(
        "http://localhost:3001/facilities/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Facility Added",
        text: "The facility has been added successfully!",
      });
      console.log("Response from server (Facilities):", response.data);

      fetchfacilities();
      handleCloseAddModal();
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error adding new facilities:", error.response.data);
    }
  };

  const handleDeleteFacilities = async (facilityId) => {
    try {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete this facility. Are you sure you want to proceed?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmation.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:3001/facilities/facilities/${facilityId}`
        );
        console.log("Facility deleted:", response.data);

        Swal.fire({
          icon: "success",
          title: "Facility Deleted",
          text: "The facility has been deleted successfully!",
        });

        fetchfacilities();
      }
    } catch (error) {
      console.error("Error deleting facility:", error.message);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete the facility. Please try again later.",
      });
    }
  };

  return (
    <div>
      <div>
        <div id="wrapper">
          {/* Sidebar */}
          <Sidebar />
          {/* End of Sidebar */}
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
              {/* Topbar */}
              <nav
                className="navbar navbar-expand navbar-light topbar mb-4 static-top shadow"
                style={{ backgroundColor: "#363062" }}
              >
                {/* Sidebar Toggle (Topbar) */}
                <button
                  id="sidebarToggleTop"
                  className="btn btn-link d-md-none rounded-circle mr-3"
                >
                  <i className="fa fa-bars" />
                </button>
                {/* Topbar Search */}

                {/* Topbar Navbar */}
                <ul className="navbar-nav ml-auto">
                  {/* Nav Item - Search Dropdown (Visible Only XS) */}
                  <li className="nav-item dropdown no-arrow d-sm-none">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="searchDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-search fa-fw" />
                    </a>
                    {/* Dropdown - Messages */}
                    <div
                      className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                      aria-labelledby="searchDropdown"
                    >
                      <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control bg-light border-0 small"
                            placeholder="Search for..."
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                              <i className="fas fa-search fa-sm" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>
                  {/* Nav Item - Alerts */}
                  <li className="nav-item dropdown no-arrow mx-1">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="alertsDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-bell fa-fw" />
                      {/* Counter - Alerts */}

                      <span className="badge badge-danger badge-counter">
                        3+
                      </span>
                    </a>
                    {/* Dropdown - Alerts */}
                    <div
                      className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="alertsDropdown"
                    >
                      <h6 className="dropdown-header">Alerts Center</h6>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="mr-3">
                          <div className="icon-circle bg-primary">
                            <i className="fas fa-file-alt text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">
                            December 12, 2019
                          </div>
                          <span className="font-weight-bold">
                            A new monthly report is ready to download!
                          </span>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="mr-3">
                          <div className="icon-circle bg-success">
                            <i className="fas fa-donate text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">
                            December 7, 2019
                          </div>
                          $290.29 has been deposited into your account!
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="mr-3">
                          <div className="icon-circle bg-warning">
                            <i className="fas fa-exclamation-triangle text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">
                            December 2, 2019
                          </div>
                          Spending Alert: We've noticed unusually high spending
                          for your account.
                        </div>
                      </a>
                      <a
                        className="dropdown-item text-center small text-gray-500"
                        href="#"
                      >
                        Show All Alerts
                      </a>
                    </div>
                  </li>
                  {/* Nav Item - Messages */}
                  <li className="nav-item dropdown no-arrow mx-1">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="messagesDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-envelope fa-fw" />
                      {/* Counter - Messages */}
                      <span className="badge badge-danger badge-counter">
                        7
                      </span>
                    </a>
                    {/* Dropdown - Messages */}
                    <div
                      className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="messagesDropdown"
                    >
                      <h6 className="dropdown-header">Message Center</h6>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image mr-3">
                          <img
                            className="rounded-circle"
                            src="img/undraw_profile_1.svg"
                            alt="..."
                          />
                          <div className="status-indicator bg-success" />
                        </div>
                        <div className="font-weight-bold">
                          <div className="text-truncate">
                            Hi there! I am wondering if you can help me with a
                            problem I've been having.
                          </div>
                          <div className="small text-gray-500">
                            Emily Fowler · 58m
                          </div>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image mr-3">
                          <img
                            className="rounded-circle"
                            src="img/undraw_profile_2.svg"
                            alt="..."
                          />
                          <div className="status-indicator" />
                        </div>
                        <div>
                          <div className="text-truncate">
                            I have the photos that you ordered last month, how
                            would you like them sent to you?
                          </div>
                          <div className="small text-gray-500">
                            Jae Chun · 1d
                          </div>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image mr-3">
                          <img
                            className="rounded-circle"
                            src="img/undraw_profile_3.svg"
                            alt="..."
                          />
                          <div className="status-indicator bg-warning" />
                        </div>
                        <div>
                          <div className="text-truncate">
                            Last month's report looks great, I am very happy
                            with the progress so far, keep up the good work!
                          </div>
                          <div className="small text-gray-500">
                            Morgan Alvarez · 2d
                          </div>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image mr-3">
                          <img
                            className="rounded-circle"
                            src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                            alt="..."
                          />
                          <div className="status-indicator bg-success" />
                        </div>
                        <div>
                          <div className="text-truncate">
                            Am I a good boy? The reason I ask is because someone
                            told me that people say this to all dogs, even if
                            they aren't good...
                          </div>
                          <div className="small text-gray-500">
                            Chicken the Dog · 2w
                          </div>
                        </div>
                      </a>
                      <a
                        className="dropdown-item text-center small text-gray-500"
                        href="#"
                      >
                        Read More Messages
                      </a>
                    </div>
                  </li>
                  <div className="topbar-divider d-none d-sm-block" />
                  {/* Nav Item - User Information */}
                  <li className="nav-item dropdown no-arrow">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="userDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                        Douglas McGee
                      </span>
                      <img
                        className="img-profile rounded-circle"
                        src="img/undraw_profile.svg"
                      />
                    </a>
                    {/* Dropdown - User Information */}
                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="userDropdown"
                    >
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                        Profile
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                        Settings
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                        Activity Log
                      </a>
                      <div className="dropdown-divider" />
                      <a
                        className="dropdown-item"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#logoutModal"
                      >
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </nav>
              <div id="content">
                {/* ... kode yang lain ... */}
                <div class="container-fluid">
                  <Modal
                    show={showAddModal}
                    onHide={handleCloseAddModal}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Add New Facility</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Facility Name</Form.Label>
                              <Form.Control
                                type="text"
                                value={facilityNames}
                                onChange={handleaddfacilitiesname}
                                style={{ width: "150px" }}
                              />
                            </Form.Group>
                          </Col>
                          {/* <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Category</Form.Label>
                              <Form.Select onChange={handleCategoryChange}>
                                <option value="active">Room</option>
                                <option value="active">Meeting Room</option>
                                <option value="inactive">Restaurant</option>
                              </Form.Select>
                            </Form.Group>
                          </Col> */}
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Room Number</Form.Label>
                              <Form.Control
                                type="text"
                                value={roomnumbers}
                                onChange={handleaddroomnumber}
                                style={{ width: "150px" }}
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Max Vacant</Form.Label>
                              <Form.Control
                                type="text"
                                value={maxvacants}
                                onChange={handleaddmaxvacant}
                                style={{ width: "150px" }}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Low Price</Form.Label>
                              <Form.Control
                                type="text"
                                value={lowpricess}
                                onChange={handleaddlowprice}
                                style={{ width: "150px" }}
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>High Price</Form.Label>
                              <Form.Control
                                type="text"
                                value={highpricess}
                                onChange={handleaddhighprice}
                                style={{ width: "150px" }}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Disc</Form.Label>
                              <Form.Control
                                type="text"
                                value={discounts}
                                onChange={handleadddiscount}
                                style={{ width: "150px" }}
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Measure Unit</Form.Label>
                              <Form.Control
                                type="text"
                                value={measureunits}
                                onChange={handleaddmeasureunit}
                                style={{ width: "150px" }}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Start Date</Form.Label>
                              <Form.Control
                                type="date"
                                value={startdates}
                                onChange={handleaddstartdate}
                                style={{ width: "150px" }}
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>End Date</Form.Label>
                              <Form.Control
                                type="date"
                                value={enddates}
                                onChange={handleaddenddate}
                                style={{ width: "150px" }}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Description</Form.Label>
                              <Form.Control
                                as="textarea"
                                value={descriptions}
                                onChange={handleadddescription}
                                style={{ width: "150px" }}
                                rows="3"
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Tax</Form.Label>
                              <Form.Control
                                type="text"
                                value={taxs}
                                onChange={handleaddtax}
                                style={{ width: "150px" }}
                                rows="3"
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Modified Date</Form.Label>
                              <Form.Control
                                type="date"
                                value={currentDate}
                                onChange={(e) => setCurrentDate(e.target.value)}
                                style={{ width: "150px" }}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Rate Price</Form.Label>
                              <Form.Control
                                type="text"
                                value={ratepricess}
                                onChange={handleaddrateprice}
                                style={{ width: "150px" }}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseAddModal}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleaddfacilities}>
                        Save changes
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <Modal
                    show={showEditModal}
                    onHide={handleCloseEditModal}
                    centered
                    size="lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Facilities</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="facilitiesname">
                            <Form.Label>Facilities Name</Form.Label>
                            <Form.Control
                              type="text"
                              value={selectedFacilitiesData.faci_name}
                              onChange={handlefacilitiesNameChange}
                              style={{ width: "150px", height: "30px" }}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                              type="text"
                              style={{ width: "150px" }}
                              onChange={handleCategoryChange}
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="roomnumber">
                            <Form.Label>Room Number</Form.Label>
                            <Form.Control
                              type="text"
                              style={{ width: "150px" }}
                              value={selectedFacilitiesData.faci_room_number}
                              onChange={handleRoomNumberChange}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="maxvacant">
                            <Form.Label>Max Vacant</Form.Label>
                            <Form.Control
                              type="text"
                              style={{ width: "150px" }}
                              value={selectedFacilitiesData.faci_max_number}
                              onChange={handleMaxVacantChange}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="discount">
                            <Form.Label>Discount</Form.Label>
                            <Form.Control
                              type="text"
                              style={{ width: "150px" }}
                              value={selectedFacilitiesData.faci_discount}
                              onChange={handleDiscChange}
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="lowprice">
                            <Form.Label>Low Price</Form.Label>
                            <Form.Control
                              type="text"
                              style={{ width: "150px" }}
                              value={selectedFacilitiesData.faci_low_price}
                              onChange={handleLowPriceChange}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="highprice">
                            <Form.Label>High Price</Form.Label>
                            <Form.Control
                              type="text"
                              rows="3"
                              style={{ width: "150px" }}
                              value={selectedFacilitiesData.faci_high_price}
                              onChange={handleHighPriceChange}
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group as={Col} controlId="tax">
                            <Form.Label>Tax</Form.Label>
                            <Form.Control
                              type="text"
                              rows="3"
                              style={{ width: "150px" }}
                              value={selectedFacilitiesData.faci_tax_rate}
                              onChange={handleTaxChange}
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group as={Col} controlId="startdate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                              type="date"
                              rows="3"
                              style={{ width: "150px" }}
                              value={startDate}
                              onChange={handleStartDateChange}
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group as={Col} controlId="enddate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                              type="date"
                              rows="3"
                              style={{ width: "150px" }}
                              value={endDate}
                              onChange={handleEndDateChange}
                            ></Form.Control>
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group as={Col} controlId="exposeprice">
                            <Form.Label>Expose Price</Form.Label>
                            <Form.Select style={{ width: "150px" }}>
                              <option value="lowPrice">Low Price</option>
                              <option value="ratePrice">Rate Price</option>
                              <option value="highPrice">High Price</option>
                            </Form.Select>
                          </Form.Group>
                        </Row>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={handleCloseEditModal}
                      >
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleeditfacilities}>
                        Save changes
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <div
                    className={`modal fade ${showUploadModal ? "show" : ""}`}
                    style={{ display: showUploadModal ? "block" : "none" }}
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Upload Photos</h5>
                          <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={handleCloseUploadModal}
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div className="mt-3 d-flex flex-wrap">
                            {uploadedPhotos.map((photo, index) => (
                              <div
                                className="card mb-3 me-3"
                                key={index}
                                style={{ width: "200px" }}
                              >
                                <img
                                  src={photo.url}
                                  className="card-img-top"
                                  alt={`Uploaded Photo ${index + 1}`}
                                  style={{
                                    height: "150px",
                                    objectFit: "cover",
                                  }}
                                />
                                <div className="card-body">
                                  <div className="form-check">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id={`setPrimary_${index}`}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={`setPrimary_${index}`}
                                    >
                                      Set as Primary
                                    </label>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleCloseUploadModal}
                          >
                            Cancel
                          </button>
                          <form
                            onSubmit={handleUpload}
                            encType="multipart/form-data"
                          >
                            <input
                              type="file"
                              multiple
                              onChange={handleFileChange}
                            />
                            <button type="submit" className="btn btn-primary">
                              Upload
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h1 class="h3 mb-2 text-gray-800">Tables Facilities</h1>
                  <div class="card shadow mb-4">
                    <div class="card-body">
                      <div class="table-responsive">
                        <table
                          class="table table-bordered"
                          id="dataTable"
                          width="100%"
                          cellspacing="0"
                        >
                          <thead>
                            <tr>
                              <th>Id</th>
                              <th>Facilities Name</th>
                              <th>Room Number</th>
                              <th>Max Vacant</th>
                              <th>Start End Date</th>
                              <th>Range Price</th>
                              <th>Discount</th>
                              <th>Rate Price</th>
                              <th>Tax</th>
                              <th onClick={() => setShowAddModal(true)}>Add</th>
                            </tr>
                          </thead>

                          <tbody>
                            {facilitieses.map((facility, index) => (
                              <tr key={index}>
                                <td>{facility.faci_id}</td>
                                <td>{facility.faci_name}</td>
                                <td>{facility.faci_room_number}</td>
                                <td>
                                  <span>{facility.faci_max_number}</span>
                                  <span>{facility.faci_measure_unit}</span>
                                </td>
                                <td>
                                  <span>{facility.faci_startdate}</span>
                                  <br />
                                  <span>{facility.faci_enddate}</span>
                                </td>
                                <td>
                                  <span>{facility.faci_low_price}</span>
                                  <br />
                                  <span>{facility.faci_high_price}</span>
                                </td>
                                <td>{facility.faci_discount}%</td>
                                <td>{facility.faci_rate_price}</td>
                                <td>{facility.faci_tax_rate}%</td>

                                <td>
                                  <Dropdown>
                                    <Dropdown.Toggle
                                      variant="secondary"
                                      id="dropdown-basic"
                                    >
                                      <i
                                        className="fa fa-ellipsis-v"
                                        aria-hidden="true"
                                      ></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      <Dropdown.Item
                                        href=""
                                        onClick={() =>
                                          handleShowEditModal(facility.faci_id)
                                        }
                                      >
                                        <i
                                          className="fa fa-pencil"
                                          aria-hidden="true"
                                        ></i>
                                        &nbsp;Edit
                                      </Dropdown.Item>
                                      <Dropdown.Divider />
                                      <Dropdown.Item
                                        href=""
                                        onClick={() =>
                                          handleShowUploadModal(
                                            facility.faci_id
                                          )
                                        }
                                      >
                                        &nbsp;Upload Photos
                                      </Dropdown.Item>
                                      <Dropdown.Divider />
                                      <Dropdown.Item
                                        className="text-danger"
                                        href="#"
                                        onClick={() => {
                                          console.log(
                                            "Facility ID:",
                                            facility.faci_id
                                          ); // Cek nilai faci_id di sini

                                          handleDeleteFacilities(
                                            facility.faci_id
                                          );
                                        }}
                                      >
                                        <i
                                          className="fa fa-trash"
                                          aria-hidden="true"
                                        ></i>
                                        &nbsp;Delete
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <nav
                        className="table-bottom-center-pagination"
                        aria-label="Page navigation example"
                      >
                        <ul className="pagination">
                          <li className="page-item">
                            <a
                              className="page-link"
                              href="#"
                              aria-label="Previous"
                            >
                              <span aria-hidden="true">&laquo;</span>
                              <span className="sr-only">Previous</span>
                            </a>
                          </li>
                          {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} className="page-item">
                              <a
                                className="page-link"
                                href="#"
                                onClick={() => handlePageChange(index + 1)} // index + 1 karena index dimulai dari 0, halaman dimulai dari 1
                              >
                                {index + 1}
                              </a>
                            </li>
                          ))}
                          <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                              <span aria-hidden="true">&raquo;</span>
                              <span className="sr-only">Next</span>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
                {/* ... kode yang lain ... */}
              </div>
            </div>
            <footer
              className="sticky-footer"
              style={{ backgroundColor: "#363062" }}
            >
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright © Your Website 2023</span>
                </div>
              </div>
            </footer>
          </div>
        </div>
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>
      </div>
    </div>
  );
};
export default Facilities;
