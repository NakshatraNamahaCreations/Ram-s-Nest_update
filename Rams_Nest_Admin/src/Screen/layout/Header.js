import React from "react";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

function Header() {
  const logout = () => {
    sessionStorage.removeItem("admin");
    window.location.assign("/");
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <div className="pointer">
          {/* <p>Profile</p> */}
          <p onClick={logout}>Logout</p>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="adminhead">
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "100%", padding: "10px" }}>
          <img src="/logo.png" width="80px" height="40px" />
          <b> Ram's Nest</b>
        </div>
        <div style={{ float: "right", padding: "10px", cursor: "pointer" }}>
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <img src="/user.png" width="30px" />
          </OverlayTrigger>
        </div>
      </div>
      <hr style={{ marginTop: "0px", marginBottom: "0px" }} />
    </div>
  );
}

export default Header;
