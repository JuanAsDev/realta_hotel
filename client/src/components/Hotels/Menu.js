import React from "react";
import { Link, Outlet } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="locations">Locations</Link>
        </li>
        <li>
          <Link to="policy">Policy</Link>
        </li>
        <li>
          <Link to="category">Category Group</Link>
        </li>
        <li>
          <Link to="priceitems">Price Items</Link>
        </li>
        <li>
          <Link to="servicetasks">Service Task</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default Menu;
