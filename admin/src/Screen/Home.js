import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";

function Dashbord() {
  return (
    <div className="row me-0">
      <Header />
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 v1">
        <h2>Hello Admin</h2>
      </div>
    </div>
  );
}

export default Dashbord;
