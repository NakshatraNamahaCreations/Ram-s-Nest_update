import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaTachometerAlt,
  FaGem,
  FaList,
  FaCamera,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import { VscBrowser } from "react-icons/vsc";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="v">
      <ProSidebar width="200px">
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<FaTachometerAlt />}>
              Home<Link to="/home"></Link>{" "}
            </MenuItem>
            <MenuItem icon={<FaHeart />}>
              Banner<Link to="/customerbanner"></Link>{" "}
            </MenuItem>
            <SubMenu title="Foods" icon={<FaGem />}>
              <MenuItem>
                Category<Link to="/category"></Link>
              </MenuItem>
              {/* <MenuItem>
                Subcategory<Link to="/subcategory"></Link>
              </MenuItem> */}
              <MenuItem>
                Main Dish<Link to="/food"></Link>
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<VscBrowser />}>
              Order List<Link to="/customer-order-history"></Link>
            </MenuItem>
            <SubMenu title="Rooms" icon={<FaGem />}>
              <MenuItem>
                Category<Link to="/roomcat"></Link>
              </MenuItem>
              <MenuItem>
                Rooms<Link to="/hotels"></Link>
              </MenuItem>
              <MenuItem>
                Rooms Bookings<Link to="/hotelbooking"></Link>
              </MenuItem>
            </SubMenu>
            <SubMenu title="Packages" icon={<FaGem />}>
              <MenuItem>
                Packages<Link to="/package"></Link>
              </MenuItem>
              <MenuItem>
                Package customer<Link to="/buypackages"></Link>
              </MenuItem>
            </SubMenu>

            {/* <MenuItem icon={<FaCamera />}>
              Notification<Link to="/notification"></Link>
            </MenuItem> */}

            <MenuItem icon={<FaUser />}>
              Customers<Link to="/customer"></Link>
            </MenuItem>
            <MenuItem icon={<FaList />}>
              Promocode<Link to="/promocode"></Link>
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <div style={{ height: "400px" }}></div>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
}

export default Sidebar;
