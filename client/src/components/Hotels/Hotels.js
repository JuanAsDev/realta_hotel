import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { IoMdStarHalf } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";
import moment from "moment";
import Swal from "sweetalert2";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [status, setStatus] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleShowEditModal = (hotelId) => {
    setSelectedHotelId(hotelId);
    fetchSelectedHotel(hotelId);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  // page
  const fetchHotels = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/hotels/gethotels?page=${currentPage}`
      );
      console.log(response.data);

      setHotels(response.data.hotels);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data hotel:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [currentPage]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // end page

  // switch status
  const [statusModal, setStatusModal] = useState("");
  const [reason, setReason] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showSwitchStatusModal, setShowSwitchStatusModal] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(false);
  const [switchReason, setSwitchReason] = useState("");

  const handleCloseStatusModal = () => {
    setStatusModal("");
    setReason("");
    setShowStatusModal(false);
    setShowSwitchStatusModal(false);
  };
  const handleShowStatusModal = (hotelId) => {
    setSelectedHotelId(hotelId);
    fetchSelectedHotel(hotelId);
    setShowSwitchStatusModal(true);
  };

  const handleSwitchStatus = async () => {
    try {
      const formData = new FormData();
      formData.append("hotel_reason", switchReason);
      formData.append("hotel_status", switchStatus);

      const response = await axios.put(
        `http://localhost:3001/hotels/update/${selectedHotelId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);
      handleCloseStatusModal();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // end switch status

  const getStarRating = (rating) => {
    const fullStars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      fullStars.push(<IoMdStar key={i} />);
    }

    const halfStar = rating % 1 !== 0 ? <IoMdStarHalf key="half-star" /> : null;

    const emptyStars = [];
    for (let i = 0; i < Math.floor(5 - rating); i++) {
      emptyStars.push(<IoMdStarOutline key={`empty-${i}`} />);
    }

    return (
      <>
        {fullStars}
        {halfStar}
        {emptyStars}
      </>
    );
  };

  // edit hotel
  const formatDate = (date) => {
    return moment(date).format("DD-MMM-YYYY");
  };

  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [selectedHotelData, setSelectedHotelData] = useState({});

  const fetchSelectedHotel = async (hotelId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/hotels/gethotels/${hotelId}`
      );
      console.log("Selected Hotel Data:", response.data);

      setSelectedHotelData(response.data.hotel);
    } catch (error) {
      console.error("Error fetching selected hotel:", error);
    }
  };

  const handleHotelNameChange = (event) => {
    setSelectedHotelData({
      ...selectedHotelData,
      hotel_name: event.target.value,
    });
  };

  const handlePhoneNumberChange = (event) => {
    setSelectedHotelData({
      ...selectedHotelData,
      hotel_phonenumber: event.target.value,
    });
  };

  const handleStatusChange = (event) => {
    setSelectedHotelData({
      ...selectedHotelData,
      hotel_status: event.target.value,
    });
  };

  const handleDescriptionChange = (event) => {
    setSelectedHotelData({
      ...selectedHotelData,
      hotel_description: event.target.value,
    });
  };

  const handleEditHotel = async () => {
    const updatedHotelData = {
      ...selectedHotelData,
      hotel_modified_date: new Date(),
    };

    try {
      const response = await axios.put(
        `http://localhost:3001/hotels/update/${selectedHotelId}`,
        updatedHotelData
      );
      const updatedHotel = response.data.updatedHotel;

      if (updatedHotel && updatedHotel.hotel_modified_date) {
        setSelectedHotelData({
          ...selectedHotelData,
          hotel_modified_date: formatDate(updatedHotel.hotel_modified_date),
        });
      }
      Swal.fire({
        icon: "success",
        title: "Hotel updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchHotels();
      handleCloseEditModal();
    } catch (error) {
      console.error(error.message);
    }
  };

  // end edit hotel
  // search

  const [originalHotels, setOriginalHotels] = useState([]);

  const handleSearch = async () => {
    try {
      if (searchTerm.trim() !== "") {
        const response = await axios.get(
          `http://localhost:3001/hotels/search?searchTerm=${searchTerm}`
        );
        const formattedData = response.data.hotels.map((hotel) => {
          return {
            ...hotel,
            hotel_modified_date_original: hotel.hotel_modified_date,
            hotel_modified_date: formatDate(hotel.hotel_modified_date),
          };
        });
        setHotels(formattedData);
      } else {
        // Jika pencarian kosong, kembalikan data hotel ke data aslinya
        fetchHotels();
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mencari hotel:", error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  // Memuat data hotel saat komponen dimuat
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:3001/hotels");
        const formattedData = response.data.hotels.map((hotel) => {
          return {
            ...hotel,
            hotel_modified_date_original: hotel.hotel_modified_date,
            hotel_modified_date: formatDate(hotel.hotel_modified_date),
          };
        });
        setHotels(formattedData);
        setOriginalHotels(formattedData); // Simpan data hotel asli
      } catch (error) {
        console.error("Terjadi kesalahan saat memuat hotel:", error);
      }
    };

    fetchHotels();
  }, []);
  // end search
  // add hotel
  const [hotelNames, setHotelNames] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [ratingstars, setratingstars] = useState("");
  const [phonenumbers, setphonenumbers] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [statuss, setstatuss] = useState("");
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  }, []);

  const handleAddNameChange = (event) => {
    setHotelNames(event.target.value);
  };

  const handleadddescription = (event) => {
    setDescriptions(event.target.value);
  };
  const handleaddphonenumber = (event) => {
    setphonenumbers(event.target.value);
  };

  const handleaddratingstar = (event) => {
    setratingstars(event.target.value);
  };
  const handleaddstatus = (event) => {
    setstatuss(event.target.value);
  };

  const handleAddHotel = async () => {
    try {
      if (hotelNames.trim() !== "") {
        console.log("Hotel Name:", hotelNames);
        const formData = new FormData();
        formData.append("hotel_name", hotelNames);
        // formData.append("hotel_description", descriptions);
        formData.append("hotel_rating_star", ratingstars);
        formData.append("hotel_phonenumber", phonenumbers);
        formData.append("hotel_modified_date", currentDate);
        // formData.append("hotel_status", statuss);

        const response = await axios.post(
          "http://localhost:3001/hotels/create",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setHotelNames("");
        setDescriptions("");
        setratingstars("");
        setphonenumbers("");
        setCurrentDate("");

        Swal.fire({
          icon: "success",
          title: "Hotel added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        // fetchHotels();
        handleCloseAddModal();
        console.log("Response from server:", response.data);
      } else {
        console.log("Please fill in the required fields");
      }
    } catch (error) {
      console.error("Error adding new hotel:", error);
    }
  };

  // end add hotel

  // delete hotel
  const handleDeleteHotel = async (hotelId) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this hotel. Are you sure you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmation.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/hotels/delete/${hotelId}`
        );
        console.log("Response from server:", response.data);
        fetchHotels();
        Swal.fire({
          title: "Deleted!",
          text: "The hotel has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error deleting hotel:", error);
      }
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
                  <div className="row">
                    <div className="col text-center my-3">
                      <input
                        type="text"
                        placeholder="Search by hotel name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button onClick={handleSearch}>Search</button>
                    </div>
                  </div>

                  <Modal
                    show={showAddModal}
                    onHide={handleCloseAddModal}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Add Hotel</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Row className="">
                          <Form.Group as={Col} controlId="newHotelName">
                            <Form.Label>Hotel Name</Form.Label>
                            <Form.Control
                              type="text"
                              value={hotelNames}
                              onChange={handleAddNameChange}
                              style={{ maxWidth: "150px" }}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              type="text"
                              value={descriptions}
                              onChange={handleadddescription}
                              style={{ maxWidth: "150px" }}
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="ratingstar">
                            <Form.Label>Rating Star</Form.Label>
                            <Form.Control
                              type="text"
                              value={ratingstars}
                              onChange={handleaddratingstar}
                              style={{ maxWidth: "150px" }}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="newPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              type="text"
                              value={phonenumbers}
                              onChange={handleaddphonenumber}
                              style={{ maxWidth: "150px" }}
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                              value={statuss}
                              onChange={handleaddstatus}
                              style={{ maxWidth: "150px" }}
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group as={Col} controlId="modifieddate">
                            <Form.Label>Modified Date</Form.Label>
                            <Form.Control
                              type="date"
                              value={currentDate}
                              onChange={(e) => setCurrentDate(e.target.value)}
                              style={{ maxWidth: "150px" }}
                            />
                          </Form.Group>
                        </Row>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseAddModal}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleAddHotel}>
                        Add Hotel
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <Modal
                    show={showEditModal}
                    onHide={handleCloseEditModal}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Hotel</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="hotelName">
                            <Form.Label>Hotel Name</Form.Label>
                            <Form.Control
                              type="text"
                              value={selectedHotelData.hotel_name || ""}
                              onChange={handleHotelNameChange}
                              style={{ width: "150px" }}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="phoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              type="text"
                              value={selectedHotelData.hotel_phonenumber || ""}
                              onChange={handlePhoneNumberChange}
                              style={{ width: "150px" }}
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                              value={status}
                              onChange={handleStatusChange}
                              style={{ width: "150px" }}
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group as={Col} controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                              type="text"
                              style={{ width: "150px" }}
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              type="text"
                              style={{ width: "150px" }}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              value={selectedHotelData.hotel_description || ""}
                              onChange={handleDescriptionChange}
                              rows="3"
                              style={{ width: "150px" }}
                            ></Form.Control>
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
                      <Button variant="primary" onClick={handleEditHotel}>
                        Save changes
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <Modal
                    show={showSwitchStatusModal}
                    onHide={handleCloseStatusModal}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Switch Status</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group controlId="switchStatusDropdown">
                          <Form.Label>Switch Status</Form.Label>
                          <Form.Select
                            value={statusModal}
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const isStatusActive = selectedValue === "active";
                              console.log("Selected Value:", selectedValue);
                              console.log("Is Status Active:", isStatusActive);
                              setStatusModal(selectedValue);
                              setSwitchStatus(isStatusActive);
                            }}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="switchReasonTextarea">
                          <Form.Label>Reason</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            style={{ width: "400px" }}
                            value={switchReason}
                            onChange={(e) => setSwitchReason(e.target.value)}
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={handleCloseStatusModal}
                      >
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleSwitchStatus}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <h1 class="h3 mb-2 text-gray-800">Tables Hotels</h1>
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
                              <th>Hotel Name</th>
                              <th>Rating Star</th>
                              <th>Phone Number</th>
                              <th>modified Date</th>
                              <th onClick={() => setShowAddModal(true)}>Add</th>
                            </tr>
                          </thead>

                          <tbody>
                            {hotels && hotels.length > 0 ? (
                              hotels.map((hotel) => (
                                <tr key={hotel.hotel_id}>
                                  <td>{hotel.hotel_id}</td>
                                  <td>{hotel.hotel_name}</td>
                                  <td>
                                    {getStarRating(hotel.hotel_rating_star)}
                                  </td>
                                  <td>{hotel.hotel_phonenumber}</td>
                                  <td>{hotel.hotel_modified_date}</td>
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
                                            handleShowEditModal(hotel.hotel_id)
                                          }
                                        >
                                          <i
                                            className="fa fa-pencil"
                                            aria-hidden="true"
                                          ></i>
                                          &nbsp;Edit
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href="/facilities">
                                          &nbsp;Facilities
                                        </Dropdown.Item>
                                        <Dropdown.Divider />

                                        <Dropdown.Item
                                          onClick={() =>
                                            handleShowStatusModal(
                                              hotel.hotel_id
                                            )
                                          }
                                        >
                                          &nbsp;Switch Status
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item
                                          className="text-danger"
                                          href="#"
                                          onClick={() =>
                                            handleDeleteHotel(hotel.hotel_id)
                                          }
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
                              ))
                            ) : (
                              <tr>
                                <td colSpan="6">No hotels available</td>
                              </tr>
                            )}
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

export default Hotels;
