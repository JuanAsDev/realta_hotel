import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = () => {
  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Master
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
