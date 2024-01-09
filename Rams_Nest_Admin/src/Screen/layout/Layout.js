import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="row me-0">
      <div>
        <Header />
      </div>
      <div className="col-3">
        <Sidebar />
      </div>
      <div className="col-9">{children}</div>
    </div>
  );
}

export default Layout;
